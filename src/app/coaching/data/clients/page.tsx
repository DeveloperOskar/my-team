import { api } from "@/trpc/server";
import React from "react";
import { CoachingClientsTable } from "./coachingClientsTable";
import AddEditCoachingClientDialog from "./addEditCoachingClientDialog";
import DeleteCoachingClient from "./deleteCoachingClientDialog";

const CoachingDataClientsPage = async () => {
  const clients = await api.coachingClients.getClients();

  return (
    <>
      <CoachingClientsTable clients={clients} />
      <AddEditCoachingClientDialog />
      <DeleteCoachingClient />
    </>
  );
};

export default CoachingDataClientsPage;
