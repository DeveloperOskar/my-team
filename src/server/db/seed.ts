import "dotenv/config";
import { coachingFoods } from "./schema";
import { db } from ".";

const userId = "749e6bf0-1227-4fb3-ae0e-d72a4c14f2c9";

const main = async () => {
  const data: (typeof coachingFoods.$inferInsert)[] = [];

  for (let i = 0; i < 1; i++) {
    data.push({
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
    });
  }

  console.log("Seed start");
  await db.insert(coachingFoods).values(data);
  console.log("Seed done");
};

main();
