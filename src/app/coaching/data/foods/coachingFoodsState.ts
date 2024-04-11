import { RouterOutput } from "@/server/api/root";
import { create } from "zustand";
export interface CoachingDataFoodsState {
  addEditFoodDialog: {
    food: RouterOutput["coachingDataFoods"]["getCoachingFoods"][0] | null;
    open: boolean;
  };
  deleteFoodDialog: {
    open: boolean;
    food: RouterOutput["coachingDataFoods"]["getCoachingFoods"][0] | null;
  };

  functions: {
    toggleDeleteFoodDialog: (
      food: RouterOutput["coachingDataFoods"]["getCoachingFoods"][0] | null,
      open: boolean,
    ) => void;
    toggleAddEditFoodDialog: (
      food: RouterOutput["coachingDataFoods"]["getCoachingFoods"][0] | null,
      open: boolean,
    ) => void;
  };
}

export const useCoachingFoodsState = create<CoachingDataFoodsState>((set) => ({
  addEditFoodDialog: {
    food: null,
    open: false,
  },
  deleteFoodDialog: {
    open: false,
    food: null,
  },
  functions: {
    toggleDeleteFoodDialog: (food, open) =>
      set((state) => ({
        ...state,
        deleteFoodDialog: {
          food,
          open,
        },
      })),
    toggleAddEditFoodDialog: (food, open) =>
      set((state) => ({
        ...state,
        addEditFoodDialog: {
          food,
          open,
        },
      })),
  },
}));
