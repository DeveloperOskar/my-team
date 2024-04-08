import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { eq, sql } from "drizzle-orm";
import { coachingFoods } from "@/server/db/schema";
import { createCoachingFoodsSchema } from "./schemas";
import { systemFoods, profileSystemFoodsLikes } from "@/server/db/schema";

export const coachingDataFoodsRouter = createTRPCRouter({
  getSystemFoods: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .select({
        systemFoodId: systemFoods.id,
        name: systemFoods.name,
        protein: systemFoods.protein,
        carbs: systemFoods.carbs,
        fat: systemFoods.fat,
        kcal: systemFoods.kcal,
        servingSize: systemFoods.servingSize,
        unit: systemFoods.unit,
        liked: profileSystemFoodsLikes.liked,
        likeId: profileSystemFoodsLikes.id,
      })
      .from(systemFoods)
      .leftJoin(
        profileSystemFoodsLikes,
        sql`${profileSystemFoodsLikes.systemFoodId} = ${systemFoods.id} AND ${profileSystemFoodsLikes.userId} = ${ctx.session.user.id}`,
      )
      .orderBy(
        sql`${profileSystemFoodsLikes.liked} DESC,  ${systemFoods.name} ASC`,
      );

    return result.map((food) => ({
      ...food,
      protein: parseFloat(food.protein),
      carbs: parseFloat(food.carbs),
      fat: parseFloat(food.fat),
      kcal: parseFloat(food.kcal),
    }));
  }),

  get: protectedProcedure.query(async ({ ctx }) => {
    const foods = await ctx.db.query.coachingFoods.findMany({
      where: () => eq(coachingFoods.userId, ctx.session.user.id),
      orderBy: (food, { desc }) => [desc(food.liked), desc(food.name)],
    });

    return foods.map((food) => ({
      ...food,
      protein: parseFloat(food.protein),
      carbs: parseFloat(food.carbs),
      fat: parseFloat(food.fat),
      kcal: parseFloat(food.kcal),
    }));
  }),
  create: protectedProcedure
    .input(createCoachingFoodsSchema)
    .mutation(async ({ ctx, input }) => {
      const [inserted] = await ctx.db
        .insert(coachingFoods)
        .values({
          ...input,
          carbs: input.carbs.toFixed(1),
          fat: input.fat.toFixed(1),
          kcal: input.kcal.toFixed(1),
          protein: input.protein.toFixed(1),
          userId: ctx.session.user.id,
          liked: false,
        })
        .returning({ id: coachingFoods.id });

      return inserted?.id;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        data: createCoachingFoodsSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [updated] = await ctx.db
        .update(coachingFoods)
        .set({
          name: input.data.name,
          unit: input.data.unit,
          servingSize: input.data.servingSize,
          carbs: input.data.carbs.toFixed(1),
          fat: input.data.fat.toFixed(1),
          kcal: input.data.kcal.toFixed(1),
          protein: input.data.protein.toFixed(1),
          brand: input.data.brand,
          userId: ctx.session.user.id,
        })
        .where(eq(coachingFoods.id, input.id))
        .returning({ id: coachingFoods.id });

      return updated?.id;
    }),

  updateLikeStatus: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        liked: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [updated] = await ctx.db
        .update(coachingFoods)
        .set({
          liked: input.liked,
        })
        .where(eq(coachingFoods.id, input.id))
        .returning({ id: coachingFoods.id });

      return updated?.id;
    }),
});
