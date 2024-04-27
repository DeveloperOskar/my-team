import React from "react";
import dynamic from "next/dynamic";

const MealPlanPreview = dynamic(() => import("./MealPlanPreview"), {
  ssr: false,
});

const page = () => {
  return (
    <div>
      <MealPlanPreview />
    </div>
  );
};

export default page;
