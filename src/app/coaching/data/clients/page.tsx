import { api } from "@/trpc/server";
import React from "react";
import { CoachingClientsTable } from "./coachingClientsTable";

const CoachingDataClientsPage = async () => {
  const clients = await api.coachingClients.getClients();
  console.log("clients: ", clients);
  return <CoachingClientsTable clients={clients} />;
};

export default CoachingDataClientsPage;
