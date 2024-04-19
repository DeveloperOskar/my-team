import { RouterOutput } from "@/server/api/root";
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
  includeAuthor: boolean;
  startDate: string | null;
  endDate: string | null;
  selectedClient: RouterOutput["coachingClients"]["getClients"][0] | null;

  selectClientDialog: {
    open: boolean;
  };

  functions: {
    toggleSelectClientDialog: (
      open: boolean,
      client: RouterOutput["coachingClients"]["getClients"][0] | null,
    ) => void;
    setStartDate: (date: Date | undefined) => void;
    setEndDate: (date: Date | undefined) => void;
    setIncludeAuthor: (value: boolean) => void;
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
    endDate: null,
    startDate: null,
    includeAuthor: true,
    selectedClient: null,
    selectClientDialog: {
      open: false,
    },

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
      setIncludeAuthor: (value: boolean) =>
        set((state) => ({ ...state, includeAuthor: value })),
      setStartDate: (date: Date | undefined) =>
        set((state) => ({
          ...state,
          startDate: date?.toLocaleDateString() ?? null,
        })),
      setEndDate: (date: Date | undefined) =>
        set((state) => ({
          ...state,
          endDate: date?.toLocaleDateString() ?? null,
        })),
      toggleSelectClientDialog: (open: boolean, client) =>
        set((state) => ({
          ...state,
          selectedClient: client,
          selectClientDialog: {
            open,
          },
        })),
    },
  };
});
