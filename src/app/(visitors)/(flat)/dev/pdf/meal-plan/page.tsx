"use client";
import { GetMealPlanDocument } from "@/app/coaching/tools/meal-plan/meal-plan-pdf";
import { PDFViewer } from "@react-pdf/renderer";
import React from "react";

const page = () => {
  const MealPlan = GetMealPlanDocument({
    startDate: "2021-09-01",
    endDate: "2021-09-30",
    meals: [
      {
        name: "Frukost",
        foods: [
          {
            name: "Havregryn",

            unit: "g",
            calculatedAmount: 100,
            calculatedCalories: 400,
            calculatedCarbs: 60,
            calculatedFat: 10,
            calculatedProtein: 20,
            originalCalories: 400,
            originalCarbs: 60,
            originalFat: 10,
            originalProtein: 20,
            originalAmount: 100,
          },
          {
            name: "Blåbär",

            unit: "g",
            calculatedAmount: 100,
            calculatedCalories: 400,
            calculatedCarbs: 60,
            calculatedFat: 10,
            calculatedProtein: 20,
            originalCalories: 400,
            originalCarbs: 60,
            originalFat: 10,
            originalProtein: 20,
            originalAmount: 100,
          },
        ],
        description: "Ät 07.00",
      },
      {
        name: "Lunch",
        foods: [
          {
            name: "Kycklingfile",

            unit: "g",
            calculatedAmount: 100,
            calculatedCalories: 400,
            calculatedCarbs: 60,
            calculatedFat: 10,
            calculatedProtein: 20,
            originalCalories: 400,
            originalCarbs: 60,
            originalFat: 10,
            originalProtein: 20,
            originalAmount: 100,
          },
          {
            name: "ris",

            unit: "g",
            calculatedAmount: 100,
            calculatedCalories: 400,
            calculatedCarbs: 60,
            calculatedFat: 10,
            calculatedProtein: 20,
            originalCalories: 400,
            originalCarbs: 60,
            originalFat: 10,
            originalProtein: 20,
            originalAmount: 100,
          },
        ],
        description: "",
      },
    ],
    includeAuthor: true,
    selectedClient: {
      id: 2,
      name: "Client Name",
      backgroundColor: "#000000",
      textColor: "#ffffff",
      carbs: 0,
      protein: 0,
      fat: 0,
      createdAt: "2021-09-01",
      updatedAt: "2021-09-01",
      currentWeight: 0,
      extraInfo: "",
      height: 0,
      email: "",
      goal: "gain",
      kcal: 0,
      userId: "",
    },
    authorName: "Author Name",
    name: "Kostschema",
    description: "Description",
  });
  return (
    <div>
      <PDFViewer className="h-screen w-screen">{MealPlan}</PDFViewer>
    </div>
  );
};

export default page;
