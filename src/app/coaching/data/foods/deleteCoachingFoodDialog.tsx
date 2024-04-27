"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { useCoachingFoodsState } from "./coachingFoodsState";
import { api } from "@/trpc/react";
import { Button } from "@/app/_components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/_components/ui/use-toast";

const DeleteCoachingFoodDialog = () => {
  const router = useRouter();
  const { toast } = useToast();

  const { mutateAsync, isPending } =
    api.coachingDataFoods.deleteCoachingFood.useMutation();

  const handleDeleteFood = async () => {
    if (!food?.id) return;

    try {
      await mutateAsync({ id: food.id });
      router.refresh();
      toggleDeleteFoodDialog(null, false);
      toast({
        title: "Borttaget.",
        description: `${food.name} har tagits bort.`,
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Oh nej. Något gick fel.",
        description:
          "Det blev något fel, testa igen eller försök senare. Kvarstår problemet ber vi dig kontakta supporten",
      });
    }
  };

  const { food, open } = useCoachingFoodsState().deleteFoodDialog;
  const toggleDeleteFoodDialog =
    useCoachingFoodsState().functions.toggleDeleteFoodDialog;

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Är du säker på att du vill ta bort{" "}
            <span className=" italic">{food?.name}</span>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Det här kommer ta bort livsmedlet från systemet och kan inte ångras.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            onClick={() => toggleDeleteFoodDialog(null, false)}
            variant={"outline"}
            disabled={isPending}
          >
            Avbryt
          </Button>

          <Button
            variant={"destructive"}
            onClick={handleDeleteFood}
            disabled={isPending}
          >
            Ta bort
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCoachingFoodDialog;
