import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { analysisService } from "~/services/analysis-service";
import { signatureService } from "~/services/signature-service";
import { webContentService } from "~/services/web-content-service";
import { type ScanUrlResponse } from "~/types/analysis";

export const analysisRouter = createTRPCRouter({
  scanUrl: publicProcedure
    .input(z.object({ url: z.string().url({ message: "Invalid url" }) }))
    .mutation(async ({ ctx, input }): Promise<ScanUrlResponse> => {
      try {
        const { embeddedScripts, referencedScriptLinks, foundLinks } =
          await webContentService.parseHTMLFromURL(input.url);
        const downloadedScripts = await webContentService.getScriptContents(
          referencedScriptLinks,
        );
        const scriptsToScan = [...embeddedScripts, ...downloadedScripts];

        console.log("scriptsToScan.length", scriptsToScan.length);

        const threatSignatures =
          await signatureService.getSignaturesWithRelativeWeights(
            ctx.db.signature,
          );

        const result = analysisService.scanScript(
          scriptsToScan.join("\n"),
          threatSignatures,
        );

        const { blacklistsAnalysis, siteDetails } =
          await analysisService.virusTotalAnalysis(input.url);

        console.log(`${result.length} of ${threatSignatures.length}`);
        console.log(
          "relativeWeight",
          result.reduce((acc, item) => acc + item.relativeWeight, 0),
        );
        console.log(result);

        const possibleAttacks = new Set<string>(
          result
            .map(({ threats }) =>
              Array.isArray(threats) ? threats.map((td) => td.name) : [],
            )
            .flat(2),
        );

        console.log("possibleAttacks", possibleAttacks);

        const securityRiskCoef = result.reduce(
          (acc, item) => acc + item.relativeWeight,
          0,
        );

        await ctx.db.scanHistory.create({
          data: {
            url: input.url,
            securityRiskCoef,
            signatures: {
              connect: result.map((item) => ({ id: item.id })),
            },
          },
        });

        return {
          status: "success",
          data: {
            referencedScriptLinks,
            foundLinks,
            securityRiskCoef,
            possibleAttacks: Array.from(possibleAttacks),
            blacklistsAnalysis,
            siteDetails,
          },
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          return {
            status: "error",
            error: {
              message: error.message,
              data: {
                code: error.code,
                httpStatus: getHTTPStatusCodeFromError(error),
              },
            },
          };
        }
        // throw error;
        return {
          status: "error",
          error: {
            message: "An unexpected error occurred, please try again later.",
            data: {
              code: "INTERNAL_SERVER_ERROR",
              httpStatus: 500,
            },
          },
        };
      }
    }),
});
