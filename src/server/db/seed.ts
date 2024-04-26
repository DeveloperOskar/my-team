import "dotenv/config";
import { coachingClients, coachingFoods } from "./schema";
import { db } from ".";
import { eq } from "drizzle-orm";

type InsertNewFood = typeof coachingFoods.$inferInsert;
type InsertNewClient = typeof coachingClients.$inferInsert;
const userId = "749e6bf0-1227-4fb3-ae0e-d72a4c14f2c9";

const main = async () => {
  console.log("Seed start");
  const foods = addCoachingFoods();
  const clients = addCoachingClients();

  console.log(`Starting adding coachingFoods`);
  await db.delete(coachingFoods).where(eq(coachingFoods.userId, userId));
  await db.insert(coachingFoods).values(foods);
  console.log(`Added ${foods.length} coachingFoods`);

  console.log(`Starting adding coachingClients`);
  await db.delete(coachingClients).where(eq(coachingClients.userId, userId));
  await db.insert(coachingClients).values(clients);
  console.log(`Added ${clients.length} coachingClients`);

  console.log("Seed done");
};

main();

function addCoachingClients(): InsertNewClient[] {
  return [
    {
      userId,
      name: "John Doe",
      email: "",
      backgroundColor: "#f0f0f0",
      textColor: "#000000",
      carbs: "40",
      protein: "30",
      fat: "30",
      goal: "gain",
      kcal: "3000",
      currentWeight: "96.7",
    },
  ];
}

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
