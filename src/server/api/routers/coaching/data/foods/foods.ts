import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { eq } from "drizzle-orm";
import { coachingFoods } from "@/server/db/schema";

export const coachingDataFoodsRouter = createTRPCRouter({
  get: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.coachingFoods.findMany({
      where: () => eq(coachingFoods.userId, ctx.session.user.id),
      orderBy: (food, { desc }) => [desc(food.liked), desc(food.name)],
    });
  }),
});
