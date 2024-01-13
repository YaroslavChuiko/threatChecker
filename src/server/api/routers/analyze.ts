import { z } from "zod";
import * as cheerio from "cheerio";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type DangerousFunction = {
  id?: string;
  name: string;
  regExp: RegExp;
  description?: string;
};

const dangerousFunctions: DangerousFunction[] = [
  // {
  //   name: "indexOf", // String.prototype.indexOf()
  //   regExp: /\.indexOf\(.*\)/g,
  // },
  // {
  //   name: "charAt", // String.prototype.charAt()
  //   regExp: /\.charAt\(.*\)/g,
  // },
  // {
  //   name: "split", // String.prototype.split()
  //   regExp: /\.split\(.*\)/g,
  // },
  // {
  //   name: "String.fromCharCode", // String.fromCharCode()
  //   regExp: /String\.fromCharCode\(.*\)/g,
  // },
  // {
  //   name: "String.charCodeAt", // String.charCodeAt()
  //   regExp: /String\.charCodeAt\(.*\)/g,
  // },
  {
    name: "eval", // eval()
    regExp: /eval\(.*\)/g,
  },
  {
    name: "setTimeout", // setTimeout()
    regExp: /setTimeout\(.*\)/g,
  },
  {
    name: "setInterval", // setInterval()
    regExp: /setInterval\(.*\)/g,
  },
  {
    name: "document.write", // document.write()
    regExp: /document\.write\(.*\)/g,
  },
  {
    name: "document.writeln", // document.writeln()
    regExp: /document\.writeln\(.*\)/g,
  },
  // {
  //   name: "appendChild", // element.appendChild()
  //   regExp: /\.appendChild\(.*\)/g,
  // },
  {
    name: "innerHTML", // element.innerHTML
    regExp: /\.innerHTML\s*=/g,
  },
  {
    name: "location.assign", // location.assign()
    regExp: /location\.assign\(.*\)/g,
  },
  {
    name: "location.replace", // location.replace()
    regExp: /location\.replace\(.*\)/g,
  },
  {
    name: "unescape", // unescape()
    regExp: /unescape\(.*\)/g,
  },
  {
    name: "XMLHttpRequest", // XMLHttpRequest
    regExp: /XMLHttpRequest\(/g,
  },
];

export const analyzeRouter = createTRPCRouter({
  scan: publicProcedure
    .input(z.object({ url: z.string().url({ message: "Invalid url" }) }))
    .mutation(async ({ ctx, input }) => {
      const origin = new URL(input.url).origin;
      const data = await fetch(input.url);
      const text = await data.text();
      const $ = cheerio.load(text);

      const scriptTagCodeArray: string[] = $("script:not([src])")
        .map((i, el) => {
          // console.log("script", $(el).toString());
          // // console.log(i, $(el).contents().toString());
          // console.log(i, $(el).text());
          // console.log("\n");

          return $(el).contents().toString();
        })
        .toArray();

      const fileDownloadUrls: string[] = $("script[src]")
        .map((i, el) => {
          const url = $(el).attr("src");
          return url?.startsWith("http") ? url : `${origin}${url}`;
        })
        .toArray()
        .filter((url) => z.string().url().safeParse(url).success);

      console.log("scriptSources", fileDownloadUrls);

      const downloadedScripts = await Promise.allSettled(
        fileDownloadUrls.map(async (url) => {
          const data = await fetch(url);
          const text = await data.text();
          return text;
        }),
      );

      console.log(
        "downloadedScripts",
        downloadedScripts.map((r) => r.status),
      );

      downloadedScripts.forEach((result) => {
        if (result.status === "fulfilled") {
          scriptTagCodeArray.push(result.value);
        }
      });

      console.log("scriptTagCodeArray.length", scriptTagCodeArray.length);

      const result = new Map<string, DangerousFunction>();

      for (const item of dangerousFunctions) {
        const key = JSON.stringify(item); //* mb use id from db
        if (result.has(key)) {
          continue;
        }

        for (const script of scriptTagCodeArray) {
          if (script.search(item.regExp) != -1) {
            result.set(key, item);
          }
        }
      }

      console.log(`${result.size} of ${dangerousFunctions.length}`);
      console.log(result);

      return {
        greeting: `Hello ${input.url}`,
      };
    }),
});
