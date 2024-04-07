import { RouterOutput } from "@/server/api/root";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<
  RouterOutput["coachingDataFoods"]["get"][number]
>[] = [
  {
    accessorKey: "name",
    header: "Namn",
  },
  {
    accessorKey: "servingSize",
    header: "Portion",
  },
  {
    accessorKey: "unit",
    header: "Enhet",
  },
];
