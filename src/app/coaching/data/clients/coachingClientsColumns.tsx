import { RouterOutput } from "@/server/api/root";
import { ColumnDef } from "@tanstack/react-table";
import { PencilRuler, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Button } from "@/app/_components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useCoachingClientsState } from "./useCoachingClientsState";

export const coachingClientsColumns: ColumnDef<
  RouterOutput["coachingClients"]["getClients"][number]
>[] = [
  {
    accessorKey: "name",
    header: "Namn",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "extraInfo",
    header: "Information",
  },
  {
    accessorKey: "height",
    header: "Längd",
  },
  {
    accessorKey: "currentWeight",
    header: "Vikt",
  },
  {
    accessorKey: "goal",
    header: "Mål",
  },
  {
    accessorKey: "protein",
    header: "Protein",
    cell: ({ row }) => {
      const protein = row.original.protein;
      return <div>{protein} g</div>;
    },
  },
  {
    accessorKey: "carbs",
    header: "Kolhydrater",
    cell: ({ row }) => {
      const carbs = row.original.carbs;
      return <div>{carbs} g</div>;
    },
  },
  {
    accessorKey: "fat",
    header: "Fett",
    cell: ({ row }) => {
      const fat = row.original.fat;
      return <div>{fat} g</div>;
    },
  },
  {
    accessorKey: "kcal",
    header: "Kalorier",
    cell: ({ row }) => {
      const kcal = row.original.kcal;
      return <div>{kcal} kcal</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const toggleAddEditClientDialog =
        useCoachingClientsState().functions.toggleAddEditClientDialog;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hantera</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => toggleAddEditClientDialog(row.original, true)}
            >
              <PencilRuler size={14} />
              Redigera
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 text-destructive focus:text-destructive"
              onClick={() => toggleAddEditClientDialog(row.original, true)}
            >
              <Trash2 size={14} />
              Ta bort
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
