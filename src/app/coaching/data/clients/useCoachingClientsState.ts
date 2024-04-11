import { RouterOutput } from "@/server/api/root";
import { create } from "zustand";

export interface CoachingDataClientsState {
  addEditClientDialog: {
    client: RouterOutput["coachingClients"]["getClients"][0] | null;
    open: boolean;
  };

  functions: {
    toggleAddEditClientDialog: (
      client: RouterOutput["coachingClients"]["getClients"][0] | null,
      open: boolean,
    ) => void;
  };
}

export const useCoachingClientsState = create<CoachingDataClientsState>(
  (set) => ({
    addEditClientDialog: {
      client: null,
      open: false,
    },
    functions: {
      toggleAddEditClientDialog: (client, open) =>
        set((state) => ({
          ...state,
          addEditClientDialog: {
            client,
            open,
          },
        })),
    },
  }),
);
