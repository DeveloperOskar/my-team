import { RouterOutput } from "@/server/api/root";
import { create } from "zustand";
export interface CoachingDataFoodsState {
  addEditFoodDialog: {
    food: RouterOutput["coachingDataFoods"]["get"][0] | null;
    open: boolean;
  };

  functions: {
    toggleAddEditFoodDialog: (
      food: RouterOutput["coachingDataFoods"]["get"][0] | null,
      open: boolean,
    ) => void;
  };
}

export const useCoachingFoodsState = create<CoachingDataFoodsState>((set) => ({
  addEditFoodDialog: {
    food: null,
    open: false,
  },
  functions: {
    toggleAddEditFoodDialog: (food, open) =>
      set((state) => ({
        ...state,
        addEditFoodDialog: {
          food: food,
          open: open,
        },
      })),
  },
}));
