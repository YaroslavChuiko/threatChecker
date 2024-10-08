import { createTRPCRouter } from "~/server/api/trpc";
import { analysisRouter } from "./routers/analysis";
import { statisticsRouter } from "./routers/statistics";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  analysis: analysisRouter,
  statistics: statisticsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
