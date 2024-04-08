import { z } from "zod";

const proteinCarbsFatCaloriesSchema = z
  .number({
    invalid_type_error: "Måste ha ett värde.",
  })
  .min(0, {
    message: "Får inte vara mindre än 0.",
  })
  .max(100000, {
    message: "Får max vara 100000.",
  })
  .step(0.1, {
    message: "Får max vara 1 decimal.",
  })

  .default(0);

export const createCoachingFoodsSchema = z.object({
  name: z
    .string()
    .max(255, {
      message: "Namnet får vara max 255 tecken.",
    })
    .min(1, {
      message: "Namnet måste vara minst 1 tecken.",
    }),
  brand: z
    .string()
    .max(255, {
      message: "Märket får vara max 255 tecken.",
    })
    .default(""),
  servingSize: z
    .number({
      invalid_type_error: "Måste ha ett värde.",
    })
    .max(10000, {
      message: "Max 10000.",
    })
    .min(1, {
      message: "Måste vara minst 1.",
    })
    .step(1, {
      message: "Decimaler är inte tillåtet.",
    })
    .default(100),
  unit: z.union([z.literal("g"), z.literal("ml")]),
  protein: proteinCarbsFatCaloriesSchema,
  carbs: proteinCarbsFatCaloriesSchema,
  fat: proteinCarbsFatCaloriesSchema,
  kcal: proteinCarbsFatCaloriesSchema,
  liked: z.boolean().default(false).optional(),
});
