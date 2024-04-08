import { format, sub } from "date-fns";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const statisticsRouter = createTRPCRouter({
  getLatestStatistics: protectedProcedure.query(async ({ ctx }) => {
    const scanHistory = await ctx.db.scanHistory.findMany({
      where: { scanDate: { gte: sub(new Date(), { days: 20 }) } },
      include: {
        threatSignatures: {
          include: {
            threatDetails: true,
          },
        },
      },
    });

    const scannedSitesChartData = Array.from({ length: 20 }, (_, i) => {
      const day = sub(new Date(), { days: i + 1 }).getDate();
      const dayScanHistory = scanHistory.filter(
        (item) => item.scanDate.getDate() === day,
      );

      return {
        label: format(sub(new Date(), { days: i + 1 }), "dd/MM"),
        scanned: dayScanHistory.length,
        highRisk: dayScanHistory.filter((item) => item.securityRiskCoef > 0.7)
          .length,
      };
    }).reverse();

    const riskLevelChartData = [
      {
        label: "Low",
        value: scanHistory.filter((item) => item.securityRiskCoef < 0.4).length,
      },
      {
        label: "Medium",
        value: scanHistory.filter(
          (item) => item.securityRiskCoef > 0.4 && item.securityRiskCoef < 0.7,
        ).length,
      },
      {
        label: "High",
        value: scanHistory.filter((item) => item.securityRiskCoef > 0.7).length,
      },
    ];

    const mostCommonThreats = scanHistory.reduce(
      (acc, item) => {
        item.threatSignatures.forEach((signature) => {
          signature.threatDetails.forEach((threat) => {
            if (acc[threat.name]) {
              acc[threat.name]++;
              return;
            }

            acc[threat.name] = 1;
          });
        });
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      scannedSitesChartData,
      riskLevelChartData,
      mostCommonThreats: Object.entries(mostCommonThreats)
        .sort((a, b) => b[1] - a[1])
        .map((item) => item[0]),
    };
  }),
});
