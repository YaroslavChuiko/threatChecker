import { z } from "zod";
import * as cheerio from "cheerio";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type ThreatSignature } from "@prisma/client";

export const analyzeRouter = createTRPCRouter({
  scan: publicProcedure
    .input(z.object({ url: z.string().url({ message: "Invalid url" }) }))
    .mutation(async ({ ctx, input }) => {
      const { embeddedScripts, referencedScriptLinks, externalLinks } =
        await parseHTMLFromURL(input.url);
      const downloadedScripts = await downloadScripts(referencedScriptLinks);
      const scriptsToScan = [...embeddedScripts, ...downloadedScripts];

      console.log("scriptsToScan.length", scriptsToScan.length);

      const threatSignatures = calculateRelativeWeights(
        await ctx.db.threatSignature.findMany(),
      );

      const result = scanScript(scriptsToScan.join("\n"), threatSignatures);

      console.log(`${result.size} of ${threatSignatures.length}`);
      console.log(
        "relativeWeight",
        Array.from(result.values()).reduce(
          (acc, item) => acc + item.relativeWeight,
          0,
        ),
      );
      console.log(result);

      return {
        referencedScriptLinks,
        externalLinks,
        vulnerabilityCoef: Array.from(result.values()).reduce(
          (acc, item) => acc + item.relativeWeight,
          0,
        ),
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

  const externalLinks: string[] = $("a[href]")
    .map((i, el) => $(el).attr("href"))
    .toArray()
    .filter((link) => !link.startsWith("#"));

    console.log("externalLinks", externalLinks);
    console.log("referencedScriptLinks", referencedScriptLinks);
    console.log("referencedScriptLinks.length", referencedScriptLinks.length);
    console.log("embeddedScripts.length", embeddedScripts.length);

  return { embeddedScripts, referencedScriptLinks, externalLinks };
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
