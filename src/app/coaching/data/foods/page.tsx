import React from "react";
import { CoachingFoodsTable } from "./CoachingFoodsTable";
import { api } from "@/trpc/server";
import AddEditCoachingFoodsDialog from "./AddEditCoachingFoodsDialog";

const CoachingDataFoodsPage = async () => {
  const coachingFoods = await api.coachingDataFoods.get();
  const systemFoods = await api.coachingDataFoods.getSystemFoods();

  console.log("got system foods: ", systemFoods);

  return (
    <>
      <CoachingFoodsTable
        coachingFoods={coachingFoods}
        systemFoods={systemFoods}
      />
      ;
      <AddEditCoachingFoodsDialog />
    </>
  );
};

export default CoachingDataFoodsPage;
