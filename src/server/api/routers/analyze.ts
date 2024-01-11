import { z } from "zod";
import * as cheerio from "cheerio";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

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
          const url = $(el).attr("src")!;
          return !url.startsWith("http") ? `${origin}${url}` : url;
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

      console.log("downloadedScripts", downloadedScripts.map((r) => r.status));

      downloadedScripts.forEach((result) => {
        if (result.status === "fulfilled") {          
          scriptTagCodeArray.push(result.value);
        }
      });

      console.log('scriptTagCodeArray.length', scriptTagCodeArray.length)

      return {
        greeting: `Hello ${input.url}`,
      };
    }),
});
