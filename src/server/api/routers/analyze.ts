import { z } from "zod";
import * as cheerio from "cheerio";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const analyzeRouter = createTRPCRouter({
  scan: publicProcedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const data = await fetch(input.url);
      const text = await data.text();
      // console.log("data", text);

      const $ = cheerio.load(text);

      //  const $scripts = $('script')
      const $scripts = $("script:not([src])");
      const $scriptsWithSrc = $("script[src]");

      // console.log("url", input.url);
      // console.log("scripts", $scripts.length);
      // console.log("scriptsWithSrc", $scriptsWithSrc.length);

      $scripts.each((i, el) => {
        console.log("script", $(el).toString());
        // console.log(i, $(el).contents().toString());
        console.log(i, $(el).text());
        console.log('\n')
      });

      // console.log($scripts.contents().toString().length);
      const scriptSources = $scriptsWithSrc.map((i, el) => {
        // console.log("scriptsWithSrc", $(el).toString());
        // console.log(i, $(el).attr('src'));
        // console.log('\n')

        return $(el).attr('src');
      }).toArray();
      console.log("scriptSources", scriptSources);

      const s1 = await fetch(scriptSources[0]!);
      const t1 = await s1.text();
      // console.log("-------------------");
      // console.log("t1", t1);
      // console.log("-------------------");
      
      // * for scr value without domain name we need to add domain name from site url
      const s2 = await fetch(`https://cheerio.js.org${scriptSources[1]}`);
      const t2 = await s2.text();
      console.log("-------------------");
      console.log("t2", t2);
      console.log("-------------------");
      return {
        greeting: `Hello ${input.url}`,
      };
    }),
});
