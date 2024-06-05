import * as cheerio from "cheerio";
import { z } from "zod";

export const cheerioService = {
  getPageContent: async (url: string) => {
    const siteToScan = await fetch(url);
    const HTMLToScan = await siteToScan.text();
    return cheerio.load(HTMLToScan);
  },

  getInlineScripts: ($cheerio: cheerio.CheerioAPI) => {
    return $cheerio("script:not([src])")
      .map((_i, element) => $cheerio(element).contents().toString())
      .toArray();
  },

  getExternalScriptUrls: ($cheerio: cheerio.CheerioAPI, URLOrigin: string) => {
    return $cheerio("script[src]")
      .map((_i, element) => {
        const scriptURL = $cheerio(element).attr("src");
        return scriptURL?.startsWith("http")
          ? scriptURL
          : `${URLOrigin}${scriptURL}`;
      })
      .toArray()
      .filter((url) => z.string().url().safeParse(url).success);
  },

  getAllOutgoingUrls: ($cheerio: cheerio.CheerioAPI) => {
    return $cheerio("a[href]")
      .map((_i, element) => $cheerio(element).attr("href"))
      .toArray()
      .filter((link) => !link.startsWith("#"));
  },
};
