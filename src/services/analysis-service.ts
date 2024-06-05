import type { Signature } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { INTERNAL_SERVER_ERROR_MSG } from "~/constants";
import { virusTotalService } from "./virus-total-service";

export const analysisService = {
  scanScript: <T extends Signature>(script: string, threatSignatures: T[]) => {
    const result = new Map<string, T>();

    threatSignatures.forEach((item) => {
      const key = item.id;
      if (result.has(key)) {
        return;
      }
      if (script.search(new RegExp(item.pattern, "g")) !== -1) {
        result.set(key, item);
      }
    });

    return Array.from(result.values());
  },
  virusTotalAnalysis: async (url: string) => {
    let urlInfo;

    urlInfo = await virusTotalService.getUrlAnalysis(url);

    if (urlInfo.error) {
      urlInfo = await virusTotalService.analyzeUrl(url);
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
        contentLength:
          urlInfo.data.attributes?.last_http_response_content_length,
        connection:
          urlInfo.data.attributes?.last_http_response_headers?.Connection,
      },
    };
  },
};
