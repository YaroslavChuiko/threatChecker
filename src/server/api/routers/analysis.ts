/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import * as cheerio from "cheerio";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type ThreatSignature } from "@prisma/client";
import crypto from "crypto";
import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { env } from "~/env";
import async from "async";

type VirusTotalUrlInfoResponse = {
  error?: {
    code: string;
    message: string;
  };
  data: {
    id: string;
    type: string;
    attributes: {
      last_analysis_stats: {
        harmless: number;
        malicious: number;
        suspicious: number;
        timeout: number;
        undetected: number;
      };
      last_analysis_results: Record<
        string,
        {
          category: string;
          result: string;
          method: string;
          engine_name: string;
        }
      >;
      trackers: string[];
      html_meta: {
        description: string;
        title: string;
        og: {
          description: string;
          title: string;
          type: string;
          url: string;
        };
        twitter: {
          description: string;
          title: string;
          type: string;
          url: string;
        };
      };
      tags: string[];
      last_http_response_headers: Record<string, string>;
      last_http_response_content_sha256: string;
      categories: string[];
      last_http_response_code: number;
      last_http_response_content_length: number;
      last_http_response_content_hash: string;
      last_http_response_date: string;
      title: string;
      url: string;
    };
  };
};

type VirusTotalScanUrlResponse = {
  data: {
    type: string;
    id: string;
    links: {
      self: string;
    };
  };
};

type VirusTotalAnalysisResponse = {
  data: {
    type: string;
    id: string;
    links: {
      self: string;
      item: string;
    };
    attributes: {
      date: number;
      status: string;
      results: VirusTotalUrlInfoResponse["data"]["attributes"]["last_analysis_results"];
      stats: VirusTotalUrlInfoResponse["data"]["attributes"]["last_analysis_stats"];
    };
    meta: {
      url_info: {
        id: string;
        url: string;
      };
    };
  };
};

type ScanUrlResponse =
  | {
      status: "success";
      data: {
        referencedScriptLinks: string[];
        foundLinks: string[];
        securityRiskCoef: number;
        possibleAttacks: string[];
        blacklistsAnalysis: {
          stats: VirusTotalUrlInfoResponse["data"]["attributes"]["last_analysis_stats"];
          results: [
            string,
            {
              category: string;
              result: string;
              method: string;
              engine_name: string;
            },
          ][];
        };
        siteDetails: {
          title: string;
          url: string;
          server: string | undefined;
          contentType: string | undefined;
          contentLength: number;
          connection: string | undefined;
        };
      };
    }
  | {
      status: "error";
      error: {
        message: string;
        data: {
          code: string;
          httpStatus: number;
        };
      };
    };

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
          await ctx.db.threatSignature.findMany(),
        );

        const result = scanScript(scriptsToScan.join("\n"), threatSignatures);

        // const virusTotalScanURL = await fetch(
        //   `https://www.virustotal.com/api/v3/urls`,
        //   {
        //     method: "POST",
        //     headers: {
        //       Accept: "application/json",
        //       "Content-Type": "application/x-www-form-urlencoded",
        //       "x-apikey": env.VIRUS_TOTAL_API_KEY,
        //     },
        //     body: new URLSearchParams({ url: input.url }),
        //   },
        // ).catch((error) => {
        //   throw new TRPCError({
        //     code: "INTERNAL_SERVER_ERROR",
        //     message: "An unexpected error occurred, please try again later.",
        //     cause: error,
        //   });
        // });
        // console.log(await virusTotalScanURL.json());

        // const virusTotalURL = await fetch(
        //   `https://www.virustotal.com/api/v3/urls/${crypto
        //     .createHash("sha256")
        //     .update(input.url)
        //     .digest("hex")}`,
        //   {
        //     method: "GET",
        //     headers: {
        //       "x-apikey": env.VIRUS_TOTAL_API_KEY,
        //     },
        //   },
        // ).catch((error) => {
        //   throw new TRPCError({
        //     code: "INTERNAL_SERVER_ERROR",
        //     message: "An unexpected error occurred, please try again later.",
        //     cause: error,
        //   });
        // });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        // const virusTotalResult: VirusTotalResponse = await virusTotalURL.json();

        const { blacklistsAnalysis, siteDetails } = await virusTotalAnalysis(
          input.url,
        );

        console.log(`${result.size} of ${threatSignatures.length}`);
        console.log(
          "relativeWeight",
          Array.from(result.values()).reduce(
            (acc, item) => acc + item.relativeWeight,
            0,
          ),
        );
        console.log(result);

        const possibleAttacks = new Set<string>(
          Array.from(result.values()).map((item) => item.description),
        );

        console.log("possibleAttacks", possibleAttacks);

        return {
          status: "success",
          data: {
            referencedScriptLinks,
            foundLinks,
            securityRiskCoef: Array.from(result.values()).reduce(
              (acc, item) => acc + item.relativeWeight,
              0,
            ),
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

const calculateRelativeWeights = (signatures: ThreatSignature[]) => {
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

  return result;
};

const virusTotalAnalysis = async (url: string) => {
  const errorMessage = "An unexpected error occurred, please try again later.";

  //!! now every on request virusTotal scan url, to do it faster we can coll this code first and in it failed(no previous analyses) then call the second one
  // const urlInfo = await fetch(
  //   `https://www.virustotal.com/api/v3/urls/${crypto
  //     .createHash("sha256")
  //     .update(url)
  //     .digest("hex")}`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "x-apikey": env.VIRUS_TOTAL_API_KEY,
  //     },
  //   },
  // ).catch((error) => {
  //   throw new TRPCError({
  //     code: "BAD_REQUEST",
  //     message: "Your scan request is being processed, please try again in few seconds.",
  //     cause: error,
  //   });
  // });

  //   const urlInfoResult: VirusTotalUrlInfoResponse = await urlInfo.json();

  // console.log("virusTotalResult", urlInfoResult);

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
      message: errorMessage,
      cause: error,
    });
  });

  const scanURLResult: VirusTotalScanUrlResponse = await scanURL.json();

  console.log(scanURLResult);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const urlAnalysisResult: VirusTotalAnalysisResponse = await async.retry(
    { times: 10, interval: 2000 },
    async () => {
      const urlAnalysis = await fetch(scanURLResult.data.links.self, {
        method: "GET",
        headers: {
          "x-apikey": env.VIRUS_TOTAL_API_KEY,
        },
      }).catch((error) => {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: errorMessage,
          cause: error,
        });
      });

      const urlInfoResult: VirusTotalAnalysisResponse =
        await urlAnalysis.json();

      if (urlInfoResult.data.attributes.status !== "completed") {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: errorMessage,
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
      message: errorMessage,
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

  return {
    blacklistsAnalysis: {
      stats: urlInfoResult.data.attributes?.last_analysis_stats,
      results: Object.entries(
        urlInfoResult.data.attributes?.last_analysis_results,
      ),
    },
    siteDetails: {
      title: urlInfoResult.data.attributes?.title,
      url: urlInfoResult.data.attributes?.url,
      server: urlInfoResult.data.attributes?.last_http_response_headers?.server,
      contentType:
        urlInfoResult.data.attributes?.last_http_response_headers?.[
          "content-type"
        ],
      contentLength:
        urlInfoResult.data.attributes?.last_http_response_content_length,
      connection:
        urlInfoResult.data.attributes?.last_http_response_headers?.Connection,
    },
  };
};
