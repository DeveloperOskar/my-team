import { create } from "zustand";

export interface CoachingMealPlanFood {
  name: string;

  unit: "g" | "ml";
  calculatedProtein: number;
  calculatedCarbs: number;
  calculatedFat: number;
  calculatedCalories: number;
  calculatedAmount: number;
  originalProtein: number;
  originalCarbs: number;
  originalFat: number;
  originalCalories: number;
  originalAmount: number;
}

export interface CoachingMealPlanMeal {
  name: string;
  foods: CoachingMealPlanFood[];
}

export interface CoachingMealPlanState {
  meals: CoachingMealPlanMeal[];

  functions: {
    addMeal: () => void;
    deleteMeal: (index: number) => void;
    changeMealName: (index: number, name: string) => void;
    addFoodToMeal: (index: number, food: CoachingMealPlanFood) => void;
    removeFoodFromMeal: (foodIndex: number, mealIndex: number) => void;
    amountChanged: (
      foodIndex: number,
      mealIndex: number,
      amount: number,
    ) => void;
  };
}

export const useCoachingMealPlanState = create<CoachingMealPlanState>((set) => {
  return {
    meals: [
      {
        foods: [],
        name: "Måltid: 1",
      },
    ],
    functions: {
      addMeal: () =>
        set((state) => ({
          ...state,
          meals: [
            ...state.meals,
            {
              foods: [],
              name: `Måltid: ${state.meals.length + 1}`,
            },
          ],
        })),
      deleteMeal: (index: number) =>
        set((state) => ({
          ...state,
          meals: state.meals.filter((_, i) => i !== index),
        })),
      changeMealName: (index: number, name: string) =>
        set((state) => ({
          ...state,
          meals: state.meals.map((meal, i) =>
            i === index ? { ...meal, name } : meal,
          ),
        })),
      addFoodToMeal: (index: number, food: CoachingMealPlanFood) =>
        set((state) => ({
          ...state,
          meals: state.meals.map((meal, i) =>
            i === index ? { ...meal, foods: [...meal.foods, food] } : meal,
          ),
        })),
      removeFoodFromMeal: (foodIndex: number, mealIndex: number) =>
        set((state) => ({
          ...state,
          meals: state.meals.map((meal, i) =>
            i === mealIndex
              ? {
                  ...meal,
                  foods: meal.foods.filter((_, i) => i !== foodIndex),
                }
              : meal,
          ),
        })),
      amountChanged: (foodIndex: number, mealIndex: number, amount: number) =>
        set((state) => {
          const meal = state.meals[mealIndex]!;
          const food = meal.foods[foodIndex]!;

          const newFood = {
            ...food,
            calculatedAmount: amount,
            calculatedCalories: (food.originalCalories / 100) * amount,
            calculatedCarbs: (food.originalCarbs / 100) * amount,
            calculatedFat: (food.originalFat / 100) * amount,
            calculatedProtein: (food.originalProtein / 100) * amount,
          };
          return {
            ...state,
            meals: state.meals.map((meal, i) =>
              i === mealIndex
                ? {
                    ...meal,
                    foods: meal.foods.map((f, i) =>
                      i === foodIndex ? newFood : f,
                    ),
                  }
                : meal,
            ),
          };
        }),
    },
  };
});
