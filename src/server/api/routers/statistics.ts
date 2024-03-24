import { sub } from "date-fns";

import {
  createTRPCRouter,
  protectedProcedure
} from "~/server/api/trpc";

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

    return 'Hello World!'
  }),
});
