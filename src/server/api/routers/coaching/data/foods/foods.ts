import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { asc, eq, sql } from "drizzle-orm";
import { coachingFoods, users } from "@/server/db/schema";
import { createCoachingFoodsSchema } from "./schemas";
import { systemFoods, userSystemFoodsLikes } from "@/server/db/schema";

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
        liked: userSystemFoodsLikes.liked,
        likeId: userSystemFoodsLikes.id,
      })
      .from(systemFoods)
      .leftJoin(
        userSystemFoodsLikes,
        sql`${userSystemFoodsLikes.systemFoodId} = ${systemFoods.id} AND ${userSystemFoodsLikes.userId} = ${ctx.session.user.id}`,
      )
      .orderBy(
        sql`
        CASE 
          WHEN ${userSystemFoodsLikes.liked} IS TRUE THEN 1
          WHEN  ${userSystemFoodsLikes.liked} IS FALSE THEN 2 
          ELSE 2
        END, 
            ${systemFoods.name} ASC`,
      );

    return result.map((food) => ({
      ...food,
      protein: parseFloat(food.protein),
      carbs: parseFloat(food.carbs),
      fat: parseFloat(food.fat),
      kcal: parseFloat(food.kcal),
    }));
  }),

  getCoachingFoods: protectedProcedure.query(async ({ ctx }) => {
    const foods = await ctx.db.query.coachingFoods.findMany({
      where: () => eq(coachingFoods.userId, ctx.session.user.id),
      orderBy: (food, { desc }) => [desc(food.liked), asc(food.name)],
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

  updateCoachingFoodLikeStatus: protectedProcedure
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

  updateSystemFoodLikeStatus: protectedProcedure
    .input(
      z.object({
        action: z.union([z.literal("update"), z.literal("insert")]),
        systemFoodId: z.number(),
        liked: z.boolean(),
        likeId: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.action === "insert") {
        await ctx.db.insert(userSystemFoodsLikes).values({
          liked: input.liked,
          userId: ctx.session.user.id,
          systemFoodId: input.systemFoodId,
        });
      } else {
        if (!input.likeId) throw new Error("likeId is required");

        await ctx.db
          .update(userSystemFoodsLikes)
          .set({
            liked: input.liked,
          })
          .where(eq(userSystemFoodsLikes.id, input.likeId));
      }
    }),
});
