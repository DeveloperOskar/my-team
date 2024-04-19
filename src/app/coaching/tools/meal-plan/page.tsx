import { Card } from "@/app/_components/ui/card";
import { api } from "@/trpc/server";
import React from "react";
import FoodsSelector from "./foodsSelector";
import Plan from "./plan";
import Settings from "./settings";

const MealPlanPage = async () => {
  const coachingFoodsP = api.coachingDataFoods.getCoachingFoods();
  const systemFoodsP = api.coachingDataFoods.getSystemFoods();
  const clientsP = api.coachingClients.getClients();

  const [coachingFoods, systemFoods, clients] = await Promise.all([
    coachingFoodsP,
    systemFoodsP,
    clientsP,
  ]);

  return (
    <div className="flex h-full justify-between">
      <FoodsSelector coachingFoods={coachingFoods} systemFoods={systemFoods} />

      <Plan />

      <Settings />
    </div>
  );
};

export default MealPlanPage;
