import React from "react";
import { CoachingFoodsTable } from "./CoachingFoodsTable";
import { api } from "@/trpc/server";
import AddEditCoachingFoodsDialog from "./AddEditCoachingFoodsDialog";

const CoachingDataFoodsPage = async () => {
  const foods = await api.coachingDataFoods.get();

  console.log("got foods: ", foods);

  return (
    <>
      <CoachingFoodsTable data={foods} />;
      <AddEditCoachingFoodsDialog />
    </>
  );
};

export default CoachingDataFoodsPage;
