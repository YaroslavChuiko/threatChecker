/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type ThreatSignature } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import async from "async";
import * as cheerio from "cheerio";
import crypto from "crypto";
import { z } from "zod";
import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type ScanUrlResponse } from "~/types/analysis";
import {
  type VirusTotalAnalysisResponse,
  type VirusTotalScanUrlResponse,
  type VirusTotalUrlInfoResponse,
} from "~/types/virusTotal";

const INTERNAL_SERVER_ERROR_MSG =
  "An unexpected error occurred, please try again later.";

export const analysisRouter = createTRPCRouter({
  scanUrl: publicProcedure
    .input(z.object({ url: z.string().url({ message: "Invalid url" }) }))
    .mutation(async ({ ctx, input }): Promise<ScanUrlResponse> => {
      try {
        const { embeddedScripts, referencedScriptLinks, foundLinks } =
          await parseHTMLFromURL(input.url);
        const downloadedScripts = await downloadScripts(referencedScriptLinks);
        const scriptsToScan = [...embeddedScripts, ...downloadedScripts];

        console.log("scriptsToScan.length", scriptsToScan.length);

        const threatSignatures = calculateRelativeWeights(
          await ctx.db.threatSignature.findMany({
            include: { threatDetails: true },
          }),
        );

        const result = scanScript(scriptsToScan.join("\n"), threatSignatures);

        const { blacklistsAnalysis, siteDetails } = await virusTotalAnalysis(
          input.url,
        );

        console.log(`${result.length} of ${threatSignatures.length}`);
        console.log(
          "relativeWeight",
          result.reduce((acc, item) => acc + item.relativeWeight, 0),
        );
        console.log(result);

        const possibleAttacks = new Set<string>(
          result
            .map(({ threatDetails }) =>
              Array.isArray(threatDetails)
                ? threatDetails.map((td) => td.name)
                : [],
            )
            .flat(2),
        );

        console.log("possibleAttacks", possibleAttacks);

        const securityRiskCoef = result.reduce(
          (acc, item) => acc + item.relativeWeight,
          0,
        );

        await ctx.db.scanHistory.create({
          data: {
            url: input.url,
            securityRiskCoef,
            threatSignatures: {
              connect: result.map((item) => ({ id: item.id })),
            },
          },
        });

        return {
          status: "success",
          data: {
            referencedScriptLinks,
            foundLinks,
            securityRiskCoef,
            possibleAttacks: Array.from(possibleAttacks),
            blacklistsAnalysis,
            siteDetails,
          },
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          return {
            status: "error",
            error: {
              message: error.message,
              data: {
                code: error.code,
                httpStatus: getHTTPStatusCodeFromError(error),
              },
            },
          };
        }
        // throw error;
        return {
          status: "error",
          error: {
            message: "An unexpected error occurred, please try again later.",
            data: {
              code: "INTERNAL_SERVER_ERROR",
              httpStatus: 500,
            },
          },
        };
      }
    }),
});

const parseHTMLFromURL = async (url: string) => {
  const origin = new URL(url).origin;
  const siteToScan = await fetch(url).catch((error) => {
    console.error("error", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
      cause: error,
    });
  });

  const HTMLToScan = await siteToScan.text();
  const $ = cheerio.load(HTMLToScan);

  const embeddedScripts: string[] = $("script:not([src])")
    .map((i, el) => $(el).contents().toString())
    .toArray();

  const referencedScriptLinks: string[] = $("script[src]")
    .map((i, el) => {
      const url = $(el).attr("src");
      return url?.startsWith("http") ? url : `${origin}${url}`;
    })
    .toArray()
    .filter((url) => z.string().url().safeParse(url).success);

  const foundLinks: string[] = $("a[href]")
    .map((i, el) => $(el).attr("href"))
    .toArray()
    .filter((link) => !link.startsWith("#"));

  console.log("foundLinks", foundLinks);
  console.log("referencedScriptLinks", referencedScriptLinks);
  console.log("referencedScriptLinks.length", referencedScriptLinks.length);
  console.log("embeddedScripts.length", embeddedScripts.length);

  return { embeddedScripts, referencedScriptLinks, foundLinks };
};

const downloadScripts = async (scriptURLList: string[]) => {
  const downloadResult = await Promise.allSettled(
    scriptURLList.map(async (url) => {
      const data = await fetch(url);
      const text = await data.text();
      return text;
    }),
  );
  const downloadedScripts: string[] = [];

  downloadResult.forEach((item) => {
    if (item.status === "fulfilled") {
      downloadedScripts.push(item.value);
    }
  });

  console.log(
    "downloadResult",
    downloadResult.map((r) => r.status),
  );

  return downloadedScripts;
};

const calculateRelativeWeights = (
  signatures: (ThreatSignature & {
    threatDetails: {
      id: string;
      name: string;
    }[];
  })[],
) => {
  const weightSum = signatures.reduce((acc, item) => acc + item.weight, 0);

  return signatures.map((item) => ({
    ...item,
    relativeWeight: item.weight / weightSum,
  }));
};

const scanScript = <T extends ThreatSignature>(
  script: string,
  threatSignatures: T[],
) => {
  const result = new Map<string, T>();

  threatSignatures.forEach((item) => {
    const key = item.id;
    if (result.has(key)) {
      return;
    }
    if (script.search(new RegExp(item.pattern, "g")) != -1) {
      result.set(key, item);
    }
  });

  return Array.from(result.values());
};

const virusTotalAnalysis = async (url: string) => {
  let urlInfo;

  urlInfo = await getUrlAnalysis(url);

  if (urlInfo.error) {
    urlInfo = await analyzeUrl(url);
  }

  if (urlInfo.error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: INTERNAL_SERVER_ERROR_MSG,
    });
  }

  return {
    blacklistsAnalysis: {
      stats: urlInfo.data.attributes?.last_analysis_stats,
      results: Object.entries(urlInfo.data.attributes?.last_analysis_results),
    },
    siteDetails: {
      title: urlInfo.data.attributes?.title,
      url: urlInfo.data.attributes?.url,
      server: urlInfo.data.attributes?.last_http_response_headers?.server,
      contentType:
        urlInfo.data.attributes?.last_http_response_headers?.["content-type"],
      contentLength: urlInfo.data.attributes?.last_http_response_content_length,
      connection:
        urlInfo.data.attributes?.last_http_response_headers?.Connection,
    },
  };
};

const getUrlAnalysis = async (url: string) => {
  const urlInfo = await fetch(
    `https://www.virustotal.com/api/v3/urls/${crypto
      .createHash("sha256")
      .update(url)
      .digest("hex")}`,
    {
      method: "GET",
      headers: {
        "x-apikey": env.VIRUS_TOTAL_API_KEY,
      },
    },
  ).catch((error) => {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message:
        "Your scan request is being processed, please try again in few seconds.",
      cause: error,
    });
  });

  const urlInfoResult: VirusTotalUrlInfoResponse = await urlInfo.json();
  console.log("virusTotalResult", urlInfoResult);

  return urlInfoResult;
};

const analyzeUrl = async (url: string) => {
  const scanURL = await fetch(`https://www.virustotal.com/api/v3/urls`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "x-apikey": env.VIRUS_TOTAL_API_KEY,
    },
    body: new URLSearchParams({ url }),
  }).catch((error) => {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: INTERNAL_SERVER_ERROR_MSG,
      cause: error,
    });
  });

  const scanURLResult: VirusTotalScanUrlResponse = await scanURL.json();
  console.log(scanURLResult);

  const urlAnalysisResult: VirusTotalAnalysisResponse = await async.retry(
    { times: 5, interval: 4000 },
    async () => {
      const urlAnalysis = await fetch(scanURLResult.data.links.self, {
        method: "GET",
        headers: {
          "x-apikey": env.VIRUS_TOTAL_API_KEY,
        },
      }).catch((error) => {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: INTERNAL_SERVER_ERROR_MSG,
          cause: error,
        });
      });

      const urlInfoResult: VirusTotalAnalysisResponse =
        await urlAnalysis.json();

      if (urlInfoResult.data.attributes.status !== "completed") {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: INTERNAL_SERVER_ERROR_MSG,
        });
      }

      return urlInfoResult;
    },
  );

  console.log("first urlInfo", urlAnalysisResult);

  const urlInfo = await fetch(urlAnalysisResult.data.links.item, {
    method: "GET",
    headers: {
      "x-apikey": env.VIRUS_TOTAL_API_KEY,
    },
  }).catch((error) => {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: INTERNAL_SERVER_ERROR_MSG,
      cause: error,
    });
  });

  const urlInfoResult: VirusTotalUrlInfoResponse = await urlInfo.json();

  console.log("virusTotalResult 2222222", urlInfoResult);

  // console.log(
  //   "last_analysis_stats:",
  //   urlAnalysisResult.data.attributes.last_analysis_stats,
  // );
  // console.log(
  //   "last_analysis_results:",
  //   urlAnalysisResult.data.attributes.last_analysis_results,
  // );
  // console.log("trackers:", urlAnalysisResult.data.attributes.trackers);
  // console.log("html_meta:", urlAnalysisResult.data.attributes.html_meta);
  // console.log("tags:", urlAnalysisResult.data.attributes.tags);
  // console.log(
  //   "last_http_response_headers:",
  //   urlAnalysisResult.data.attributes.last_http_response_headers,
  // );
  // console.log("categories:", urlAnalysisResult.data.attributes.categories);

  return urlInfoResult;
};
