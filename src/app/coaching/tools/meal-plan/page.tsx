import { api } from "@/trpc/server";
import React from "react";
import FoodsSelector from "./foodsSelector";
import Plan from "./plan";
import Settings from "./settings";
import SelectClientDialog from "./select-client-dialog";
import { auth } from "@/server/auth";

const MealPlanPage = async () => {
  const coachingFoodsP = api.coachingDataFoods.getCoachingFoods();
  const systemFoodsP = api.coachingDataFoods.getSystemFoods();
  const clientsP = api.coachingClients.getClients();
  const session = await auth();

  const [coachingFoods, systemFoods, clients] = await Promise.all([
    coachingFoodsP,
    systemFoodsP,
    clientsP,
  ]);

  return (
    <>
      <div className="flex h-full justify-between">
        <FoodsSelector
          coachingFoods={coachingFoods}
          systemFoods={systemFoods}
        />

        <Plan session={session} />

        <Settings />
      </div>

      <SelectClientDialog clients={clients} />
    </>
  );
};

export default MealPlanPage;
