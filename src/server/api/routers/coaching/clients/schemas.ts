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

export const createCoachingClientSchema = z.object({
  name: z
    .string()
    .max(255, {
      message: "Namnet får vara max 255 tecken.",
    })
    .min(1, {
      message: "Namnet måste vara minst 1 tecken",
    }),
  email: z
    .string()
    .max(255, {
      message: "Email får vara max 255 tecken.",
    })
    .default(""),
  goal: z.union([z.literal("gain"), z.literal("lose"), z.literal("maintain")]),

  currentWeight: z
    .number({
      invalid_type_error: "Måste ha ett värde.",
    })
    .max(1000, {
      message: "Max 1000.",
    })
    .step(0.1, {
      message: "Får max vara 1 decimal.",
    })
    .nullable(),
  height: z
    .number({
      invalid_type_error: "Måste ha ett värde.",
    })
    .step(1, {
      message: "Inga decimaler är tillåtet.",
    })
    .max(1000, {
      message: "Max 1000.",
    })
    .nullable(),
  extraInfo: z
    .string()
    .max(2000, {
      message: "Max 2000 tecken.",
    })
    .default(""),
  protein: proteinCarbsFatCaloriesSchema,
  carbs: proteinCarbsFatCaloriesSchema,
  fat: proteinCarbsFatCaloriesSchema,
  kcal: proteinCarbsFatCaloriesSchema,
  backgroundColor: z.string().max(255, {
    message: "Färgen får vara max 255 tecken.",
  }),
  textColor: z.string().max(255, {
    message: "Färgen får vara max 255 tecken.",
  }),
});
