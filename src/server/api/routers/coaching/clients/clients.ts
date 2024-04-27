import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { eq, sql } from "drizzle-orm";

import { coachingClients } from "@/server/db/schema";
import { createCoachingClientSchema } from "./schemas";

export const coachingDataClientsRouter = createTRPCRouter({
  getClients: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.query.coachingClients.findMany({
      where: () => sql`${coachingClients.userId} = ${ctx.session.user.id}`,
      with: {
        weightIns: true,
      },
    });

    return result.map((client) => ({
      ...client,
      id: +client.id,
      currentWeight: client.currentWeight
        ? parseFloat(client.currentWeight)
        : null,
      height: client.height ? parseFloat(client.height) : null,
      protein: parseFloat(client.protein),
      carbs: parseFloat(client.carbs),
      fat: parseFloat(client.fat),
      kcal: parseFloat(client.kcal),
    }));
  }),

  createClient: protectedProcedure
    .input(createCoachingClientSchema)
    .mutation(async ({ ctx, input }) => {
      const [inserted] = await ctx.db
        .insert(coachingClients)
        .values({
          ...input,
          currentWeight: input.currentWeight?.toString() ?? null,
          height: input.height?.toString() ?? null,
          protein: input.protein.toString(),
          carbs: input.carbs.toString(),
          fat: input.fat.toString(),
          kcal: input.kcal.toString(),
          userId: ctx.session.user.id,
        })
        .returning({ id: coachingClients.id });

      return inserted;
    }),

  deleteClient: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(coachingClients)
        .where(
          sql`${coachingClients.id} = ${input.id} AND ${coachingClients.userId} = ${ctx.session.user.id}`,
        );
    }),

  updateClient: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        client: createCoachingClientSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(coachingClients)
        .set({
          ...input.client,
          currentWeight: input.client.currentWeight?.toString() ?? null,
          height: input.client.height?.toString() ?? null,
          protein: input.client.protein.toString(),
          carbs: input.client.carbs.toString(),
          fat: input.client.fat.toString(),
          kcal: input.client.kcal.toString(),
        })
        .where(
          sql`${coachingClients.id} = ${input.id} AND ${coachingClients.userId} = ${ctx.session.user.id}`,
        );
    }),
});
