import { type VirusTotalUrlInfoResponse } from "./virusTotal";

export type ScanUrlResponse =
  | {
      status: "success";
      data: {
        referencedScriptLinks: string[];
        foundLinks: string[];
        securityRiskCoef: number;
        possibleAttacks: string[];
        blacklistsAnalysis: {
          stats: VirusTotalUrlInfoResponse["data"]["attributes"]["last_analysis_stats"];
          results: [
            string,
            {
              category: string;
              result: string;
              method: string;
              engine_name: string;
            },
          ][];
        };
        siteDetails: {
          title: string;
          url: string;
          server: string | undefined;
          contentType: string | undefined;
          contentLength: number;
          connection: string | undefined;
        };
      };
    }
  | {
      status: "error";
      error: {
        message: string;
        data: {
          code: string;
          httpStatus: number;
        };
      };
    };
