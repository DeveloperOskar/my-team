import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { sql } from "drizzle-orm";

import { coachingClients } from "@/server/db/schema";
import { createCoachingClientSchema } from "./schemas";

export const coachingDataClientsRouter = createTRPCRouter({
  getClients: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.query.coachingClients.findMany({
      where: () => sql`${coachingClients.userId} = ${ctx.session.user.id}`,
    });

    return result.map((client) => ({
      ...client,
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
          currentWeight: input.currentWeight?.toString() ?? "",
          height: input.height?.toString() ?? "",
          protein: input.protein.toString(),
          carbs: input.carbs.toString(),
          fat: input.fat.toString(),
          kcal: input.kcal.toString(),
          userId: ctx.session.user.id,
        })
        .returning({ id: coachingClients.id });

      return inserted;
    }),
});
