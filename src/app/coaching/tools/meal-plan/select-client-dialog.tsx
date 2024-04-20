"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { useCoachingMealPlanState } from "./useCoachingMealPlanState";
import { RouterOutput } from "@/server/api/root";
import { Avatar, AvatarFallback } from "@/app/_components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { CardTitle } from "@/app/_components/ui/card";
import { ChevronRight } from "lucide-react";

const SelectClientDialog: React.FC<{
  clients: RouterOutput["coachingClients"]["getClients"];
}> = ({ clients }) => {
  const toggleSelectClientDialog =
    useCoachingMealPlanState().functions.toggleSelectClientDialog;
  const {
    selectClientDialog: { open },
    selectedClient,
  } = useCoachingMealPlanState();

  const handleClientSelected = (
    client: RouterOutput["coachingClients"]["getClients"][0],
  ) => {
    toggleSelectClientDialog(false, client);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) =>
        toggleSelectClientDialog(open ?? false, selectedClient)
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Välj klient</DialogTitle>
          <DialogDescription>
            Välj den klienten du vill skapa ett kostschema för.
          </DialogDescription>
        </DialogHeader>

        {clients.map((client) => (
          <div
            key={client.id}
            className="flex cursor-pointer items-center justify-between gap-4  rounded border p-3 hover:bg-accent"
            onClick={() => handleClientSelected(client)}
          >
            <div className="flex gap-4">
              <Avatar>
                <AvatarFallback
                  className=" font-semibold"
                  style={{
                    backgroundColor: client.backgroundColor,
                    color: client.textColor,
                  }}
                >
                  {getInitials(client.name)}
                </AvatarFallback>
              </Avatar>

              <div>
                <CardTitle>{client.name}</CardTitle>
              </div>
            </div>

            <ChevronRight />
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default SelectClientDialog;
