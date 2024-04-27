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
import { api } from "@/trpc/react";
import { Button } from "@/app/_components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/_components/ui/use-toast";
import { useCoachingClientsState } from "./useCoachingClientsState";

const DeleteCoachingClient = () => {
  const router = useRouter();
  const { toast } = useToast();

  const { mutateAsync, isPending } =
    api.coachingClients.deleteClient.useMutation();

  const handleDeleteClient = async () => {
    if (!client?.id) return;

    try {
      await mutateAsync({ id: client.id });
      router.refresh();
      toggleDeleteClientDialog(null, false);
      toast({
        title: "Borttaget.",
        description: `${client.name} har tagits bort.`,
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

  const { client, open } = useCoachingClientsState().deleteClientDialog;
  const toggleDeleteClientDialog =
    useCoachingClientsState().functions.toggleDeleteClientDialog;

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Är du säker på att du vill ta bort {client?.name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Det här kommer ta bort klienten från systemet och kan inte ångras.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            onClick={() => toggleDeleteClientDialog(null, false)}
            variant={"outline"}
            disabled={isPending}
          >
            Avbryt
          </Button>

          <Button
            variant={"destructive"}
            onClick={handleDeleteClient}
            disabled={isPending}
          >
            Ta bort
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCoachingClient;
