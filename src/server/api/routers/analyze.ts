import { z } from "zod";
import * as cheerio from "cheerio";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type DangerousFunction = {
  id?: string;
  name: string;
  regExp: RegExp;
  description?: string;
  weight: 1 | 2 | 3 | 4 | 5;
};

const dangerousFunctions: DangerousFunction[] = [
  {
    name: "indexOf", // String.prototype.indexOf()
    regExp: /\.indexOf\(.*\)/g,
    weight: 1,
  },
  {
    name: "charAt", // String.prototype.charAt()
    regExp: /\.charAt\(.*\)/g,
    weight: 1,
  },
  {
    name: "split", // String.prototype.split()
    regExp: /\.split\(.*\)/g,
    weight: 1,
  },
  {
    name: "String.fromCharCode", // String.fromCharCode()
    regExp: /String\.fromCharCode\(.*\)/g,
    weight: 1,
  },
  {
    name: "String.charCodeAt", // String.charCodeAt()
    regExp: /String\.charCodeAt\(.*\)/g,
    weight: 1,
  },
  {
    name: "eval", // eval()
    regExp: /eval\(.*\)/g,
    weight: 5,
  },
  {
    name: "setTimeout", // setTimeout()
    regExp: /setTimeout\(.*\)/g,
    weight: 2,
  },
  {
    name: "setInterval", // setInterval()
    regExp: /setInterval\(.*\)/g,
    weight: 2,
  },
  {
    name: "document.write", // document.write()
    regExp: /document\.write\(.*\)/g,
    weight: 4,
  },
  {
    name: "document.writeln", // document.writeln()
    regExp: /document\.writeln\(.*\)/g,
    weight: 4,
  },
  {
    name: "appendChild", // element.appendChild()
    regExp: /\.appendChild\(.*\)/g,
    weight: 2,
  },
  {
    name: "innerHTML", // element.innerHTML
    regExp: /\.innerHTML\s*=/g,
    weight: 4,
  },
  {
    name: "location.assign", // location.assign()
    regExp: /location\.assign\(.*\)/g,
    weight: 4,
  },
  {
    name: "location.replace", // location.replace()
    regExp: /location\.replace\(.*\)/g,
    weight: 4,
  },
  {
    name: "unescape", // unescape()
    regExp: /unescape\(.*\)/g,
    weight: 5,
  },
  {
    name: "XMLHttpRequest", // XMLHttpRequest
    regExp: /XMLHttpRequest\(/g,
    weight: 3,
  },
];

export const analyzeRouter = createTRPCRouter({
  scan: publicProcedure
    .input(z.object({ url: z.string().url({ message: "Invalid url" }) }))
    .mutation(async ({ ctx, input }) => {
      const { scriptURLList, scriptsToScan } = await extractScripts(input.url);
      const downloadedScripts = await downloadScripts(scriptURLList);

      downloadedScripts.forEach((result) => {
        if (result.status === "fulfilled") {
          scriptsToScan.push(result.value);
        }
      });

      //* start refactoring here after this db update
      const dangerousFunctionsWithRelativeWeight =
        calculateRelativeWeights(dangerousFunctions);

      const result = new Map<
        string,
        (typeof dangerousFunctionsWithRelativeWeight)[number]
      >();

      for (const item of dangerousFunctionsWithRelativeWeight) {
        const key = JSON.stringify(item); //* mb use id from db
        if (result.has(key)) {
          continue;
        }

        for (const script of scriptsToScan) {
          if (script.search(item.regExp) != -1) {
            result.set(key, item);
          }
        }
      }

      console.log(`${result.size} of ${dangerousFunctions.length}`);
      console.log(
        "relativeWeight",
        Array.from(result.values()).reduce(
          (acc, item) => acc + item.relativeWeight,
          0,
        ),
      );
      console.log(result);

      return {
        greeting: `Hello ${input.url}`,
        vulnerabilityCoef: Array.from(result.values()).reduce(
          (acc, item) => acc + item.relativeWeight,
          0,
        ),
      };
    }),
});

const extractScripts = async (url: string) => {
  const origin = new URL(url).origin;
  const siteToScan = await fetch(url);
  const HTMLToScan = await siteToScan.text();
  const $ = cheerio.load(HTMLToScan);

  const scriptsToScan: string[] = $("script:not([src])")
    .map((i, el) => $(el).contents().toString())
    .toArray();

  const scriptURLList: string[] = $("script[src]")
    .map((i, el) => {
      const url = $(el).attr("src");
      return url?.startsWith("http") ? url : `${origin}${url}`;
    })
    .toArray()
    .filter((url) => z.string().url().safeParse(url).success);

  console.log("scriptURLList", scriptURLList);
  console.log("scriptsToScan.length", scriptsToScan.length);

  return { scriptsToScan, scriptURLList };
};

const downloadScripts = async (scriptURLList: string[]) => {
  const downloadedScripts = await Promise.allSettled(
    scriptURLList.map(async (url) => {
      const data = await fetch(url);
      const text = await data.text();
      return text;
    }),
  );

  console.log(
    "downloadedScripts",
    downloadedScripts.map((r) => r.status),
  );

  return downloadedScripts;
};

const calculateRelativeWeights = (functionsArr: DangerousFunction[]) => {
  const weightSum = functionsArr.reduce((acc, item) => acc + item.weight, 0);

  return functionsArr.map((item) => ({
    ...item,
    relativeWeight: item.weight / weightSum,
  }));
};
