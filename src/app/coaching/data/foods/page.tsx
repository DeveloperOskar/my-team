import React from "react";
import CoachingFoodsTable from "@/app/coaching/data/foods/coachingFoodsTable";
import { api } from "@/trpc/server";
import AddEditCoachingFoodsDialog from "@/app/coaching/data/foods/addEditCoachingFoodsDialog";
import DeleteCoachingFoodDialog from "./deleteCoachingFoodDialog";

const CoachingDataFoodsPage = async () => {
  const coachingFoods = await api.coachingDataFoods.getCoachingFoods();
  const systemFoods = await api.coachingDataFoods.getSystemFoods();

  return (
    <>
      <CoachingFoodsTable
        coachingFoods={coachingFoods}
        systemFoods={systemFoods}
      />
      <AddEditCoachingFoodsDialog />
      <DeleteCoachingFoodDialog />
    </>
  );
};

export default CoachingDataFoodsPage;
