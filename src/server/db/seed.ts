import "dotenv/config";
import { coachingFoods } from "./schema";
import { db } from ".";
import { eq } from "drizzle-orm";

type InsertNewFood = typeof coachingFoods.$inferInsert;
const userId = "749e6bf0-1227-4fb3-ae0e-d72a4c14f2c9";

const main = async () => {
  console.log("Seed start");
  const foods = addCoachingFoods();

  console.log(`Added ${foods.length} coachingFoods`);
  await db.delete(coachingFoods).where(eq(coachingFoods.userId, userId));
  await db.insert(coachingFoods).values(foods);
  console.log("Seed done");
};

main();

function addCoachingFoods(): InsertNewFood[] {
  return [
    {
      name: "Kycklingbröstfilé",
      carbs: "0",
      protein: "31",
      fat: "3.6",
      kcal: "164",
      servingSize: 100,
      unit: "g",
      userId,
      liked: true,
      brand: "Ica basic",
    },
    {
      name: "Havregryn",
      carbs: "60",
      protein: "12",
      fat: "7",
      kcal: "365",
      servingSize: 100,
      unit: "g",
      userId,
      liked: false,
      brand: "AXA",
    },
    {
      name: "Blåbär",
      carbs: "7.6",
      protein: "0.5",
      fat: "0.5",
      kcal: "43",
      servingSize: 100,
      unit: "g",
      userId,
      liked: false,
      brand: "",
    },
    {
      name: "Whey-100",
      carbs: "3.9",
      protein: "84",
      fat: "0.9",
      kcal: "362",
      servingSize: 100,
      unit: "g",
      userId,
      liked: true,
      brand: "Star nutrition",
    },
    {
      name: "Mjölk 0.5%",
      carbs: "4.9",
      protein: "3.5",
      fat: "0.5",
      kcal: "40",
      servingSize: 100,
      unit: "g",
      userId,
      liked: false,
      brand: "Star nutrition",
    },
  ];
}
