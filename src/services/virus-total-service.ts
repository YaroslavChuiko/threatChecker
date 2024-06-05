/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TRPCError } from "@trpc/server";
import { env } from "~/env";
import crypto from "crypto";
import type {
  VirusTotalAnalysisResponse,
  VirusTotalScanUrlResponse,
  VirusTotalUrlInfoResponse,
} from "~/types/virusTotal";
import async from "async";
import { INTERNAL_SERVER_ERROR_MSG } from "~/constants";

export const virusTotalService = {
  getUrlAnalysis: async (url: string) => {
    const urlInfo = await fetch(
      `https://www.virustotal.com/api/v3/urls/${crypto
        .createHash("sha256")
        .update(url)
        .digest("hex")}`,
      {
        method: "GET",
        headers: {
          "x-apikey": env.VIRUS_TOTAL_API_KEY,
        },
      },
    ).catch((error) => {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message:
          "Your scan request is being processed, please try again in few seconds.",
        cause: error,
      });
    });

    const urlInfoResult: VirusTotalUrlInfoResponse = await urlInfo.json();
    console.log("virusTotalResult", urlInfoResult);

    return urlInfoResult;
  },

  analyzeUrl: async (url: string) => {
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
        message: INTERNAL_SERVER_ERROR_MSG,
        cause: error,
      });
    });

    const scanURLResult: VirusTotalScanUrlResponse = await scanURL.json();
    console.log(scanURLResult);

    const urlAnalysisResult: VirusTotalAnalysisResponse = await async.retry(
      { times: 5, interval: 4000 },
      async () => {
        const urlAnalysis = await fetch(scanURLResult.data.links.self, {
          method: "GET",
          headers: {
            "x-apikey": env.VIRUS_TOTAL_API_KEY,
          },
        }).catch((error) => {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: INTERNAL_SERVER_ERROR_MSG,
            cause: error,
          });
        });

        const urlInfoResult: VirusTotalAnalysisResponse =
          await urlAnalysis.json();

        if (urlInfoResult.data.attributes.status !== "completed") {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: INTERNAL_SERVER_ERROR_MSG,
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
        message: INTERNAL_SERVER_ERROR_MSG,
        cause: error,
      });
    });

    const urlInfoResult: VirusTotalUrlInfoResponse = await urlInfo.json();

    console.log("virusTotalResult 2222222", urlInfoResult);

    return urlInfoResult;
  },
};
