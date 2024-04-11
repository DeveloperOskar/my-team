import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { coachingDataFoodsRouter } from "./routers/coaching/data/foods/foods";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { coachingDataClientsRouter } from "./routers/coaching/clients/clients";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  coachingDataFoods: coachingDataFoodsRouter,
  coachingClients: coachingDataClientsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
