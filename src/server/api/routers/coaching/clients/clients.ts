import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { sql } from "drizzle-orm";

import { coachingClients } from "@/server/db/schema";

export const coachingDataClientsRouter = createTRPCRouter({
  getClients: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.query.coachingClients.findMany({
      where: () => sql`${coachingClients.userId} = ${ctx.session.user.id}`,
    });

    return result.map((client) => ({
      ...client,
      protein: parseFloat(client.protein),
      carbs: parseFloat(client.carbs),
      fat: parseFloat(client.fat),
      kcal: parseFloat(client.kcal),
    }));
  }),
});
