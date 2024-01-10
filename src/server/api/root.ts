import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { analyzeRouter } from "./routers/analyze";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  analyze: analyzeRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
