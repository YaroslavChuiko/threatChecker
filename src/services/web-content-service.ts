import { TRPCError } from "@trpc/server";
import { cheerioService } from "./cheerio-service";

export const webContentService = {
  parseHTMLFromURL: async (url: string) => {
    try {
      const $document = await cheerioService.getPageContent(url);
      const inlineScripts: string[] =
        cheerioService.getInlineScripts($document);
      const externalScriptUrls: string[] = cheerioService.getExternalScriptUrls(
        $document,
        new URL(url).origin,
      );
      const outgoingUrls: string[] =
        cheerioService.getAllOutgoingUrls($document);

      console.log("outgoingUrls", outgoingUrls);
      console.log("externalScriptUrls", externalScriptUrls);
      console.log("externalScriptUrls.length", externalScriptUrls.length);
      console.log("inlineScripts.length", inlineScripts.length);

      return {
        embeddedScripts: inlineScripts,
        referencedScriptLinks: externalScriptUrls,
        foundLinks: outgoingUrls,
      };
    } catch (error) {
      console.error("error", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred, please try again later.",
        cause: error,
      });
    }
  },
  getScriptContents: async (scriptURLList: string[]) => {
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
      downloadResult.map((result) => result.status),
    );

    return downloadedScripts;
  },
};
