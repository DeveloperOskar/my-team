import React from "react";
import { api } from "@/trpc/server";
import DeleteCoachingFoodDialog from "./deleteCoachingFoodDialog";
import CoachingFoodsTable from "./CoachingFoodsTable";
import AddEditCoachingFoodsDialog from "./AddEditCoachingFoodsDialog";

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
