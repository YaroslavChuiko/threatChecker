import { z } from "zod";
import * as cheerio from "cheerio";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type ThreatSignature } from "@prisma/client";
import crypto from 'crypto';

export const analyzeRouter = createTRPCRouter({
  scan: publicProcedure
    .input(z.object({ url: z.string().url({ message: "Invalid url" }) }))
    .mutation(async ({ ctx, input }) => {
      const { embeddedScripts, referencedScriptLinks, foundLinks } =
        await parseHTMLFromURL(input.url);
      const downloadedScripts = await downloadScripts(referencedScriptLinks);
      const scriptsToScan = [...embeddedScripts, ...downloadedScripts];

      console.log("scriptsToScan.length", scriptsToScan.length);

      const threatSignatures = calculateRelativeWeights(
        await ctx.db.threatSignature.findMany(),
      );

      const result = scanScript(scriptsToScan.join("\n"), threatSignatures);

      const virusTotalURL = await fetch(
        `https://www.virustotal.com/api/v3/urls/${crypto.createHash('sha256').update(input.url).digest('hex')}`,
        {
          method: "GET",
          headers: {
            "x-apikey":
              "970a3a713f378a5ca017766f4d9841fe3abd8c9cd9b1e176d257818855dbe9a7",
          },
        },
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const virusTotalResult = await virusTotalURL.json();
      console.log("virusTotalResult !!!!!!!!!!", virusTotalResult);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log("last_analysis_stats:", virusTotalResult?.data?.attributes?.last_analysis_stats);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log("last_analysis_results::", virusTotalResult?.data?.attributes?.last_analysis_results);

      // const virusTotalURL = await fetch(
      //   "https://www.virustotal.com/api/v3/urls",
      //   {
      //     method: "POST",
      //     headers: {
      //       // "Content-Type": "application/x-www-form-urlencoded",
      //       accept: "application/json",
      //       "Content-Type": "application/json",
      //       "x-apikey":
      //         "970a3a713f378a5ca017766f4d9841fe3abd8c9cd9b1e176d257818855dbe9a7",
      //     },
      //     body: JSON.stringify({
      //       data: {
      //         type: "url",
      //         attributes: {
      //           url: input.url,
      //         },
      //       },
      //     }),
      //   },
      // );
      // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      // const virusTotalResult = await virusTotalURL.json();
      // console.log("virusTotalResult !!!!!!!!!!", virusTotalResult);

      // const virusTotalAnalyses = await fetch(
      //   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      //   `https://www.virustotal.com/api/v3/analyses/${virusTotalResult?.data?.id}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "x-apikey":
      //         "970a3a713f378a5ca017766f4d9841fe3abd8c9cd9b1e176d257818855dbe9a7",
      //     },
      //   },
      // );

      // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      // const virusTotalRes = await virusTotalAnalyses.json();
      // console.log("virusTotalAnalysesResult", virusTotalRes);

      console.log(`${result.size} of ${threatSignatures.length}`);
      console.log(
        "relativeWeight",
        Array.from(result.values()).reduce(
          (acc, item) => acc + item.relativeWeight,
          0,
        ),
      );
      console.log(result);

      const possibleAttacks = new Set<string>(Array.from(result.values()).map(
        (item) => item.description,
      ));

      console.log("possibleAttacks", possibleAttacks);

      return {
        referencedScriptLinks,
        foundLinks,
        securityRiskCoef: Array.from(result.values()).reduce(
          (acc, item) => acc + item.relativeWeight,
          0,
        ),
        possibleAttacks: Array.from(possibleAttacks),
      };
    }),
});

const parseHTMLFromURL = async (url: string) => {
  const origin = new URL(url).origin;
  const siteToScan = await fetch(url);
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

  // for (const item of threatSignatures) {
  //   const key = item.id;
  //   if (result.has(key)) {
  //     continue;
  //   }

  //   for (const script of scriptsToScan) {
  //     if (script.search(item.regExp) != -1) {
  //       result.set(key, item);
  //     }
  //   }
  // }

  return result;
};
