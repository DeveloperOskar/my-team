import { type RouterOutput } from "@/server/api/root";
import { type ColumnDef } from "@tanstack/react-table";
import {
  PencilRuler,
  Scale,
  Trash2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
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
import { Avatar, AvatarFallback } from "@/app/_components/ui/avatar";
import { getInitials, hyphenIfEmpty } from "@/lib/utils";

export const coachingClientsColumns: ColumnDef<
  RouterOutput["coachingClients"]["getClients"][number]
>[] = [
  {
    id: "avatar",
    cell: ({ row }) => {
      return (
        <div className="pl-2">
          <Avatar className="h-10 w-10  font-semibold">
            <AvatarFallback
              style={{
                backgroundColor: row.original.backgroundColor,
                color: row.original.textColor,
              }}
            >
              {getInitials(row.original.name)}
            </AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Namn",
    cell: ({ row }) => {
      return <div className=" capitalize">{row.original.name}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <div className="">{hyphenIfEmpty(row.original.email)}</div>;
    },
  },
  {
    accessorKey: "extraInfo",
    header: "Information",
    cell: ({ row }) => {
      return <div className="">{hyphenIfEmpty(row.original.extraInfo)}</div>;
    },
  },
  {
    accessorKey: "height",
    header: "Längd",
    cell: ({ row }) => {
      return (
        <div className="">
          {row.original.height ? row.original.height : hyphenIfEmpty("")}
        </div>
      );
    },
  },
  {
    accessorKey: "currentWeight",
    header: "Vikt",
    cell: ({ row }) => {
      return (
        <div className="">
          {row.original.currentWeight
            ? row.original.currentWeight
            : hyphenIfEmpty("")}
        </div>
      );
    },
  },
  {
    accessorKey: "goal",
    header: "Mål",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1.5">
          <span>
            {row.original.goal === "gain"
              ? "Gå upp"
              : row.original.goal === "lose"
                ? "Gå ner"
                : "Behålla"}
          </span>

          {row.original.goal === "gain" && <TrendingUp size={16} />}
          {row.original.goal === "lose" && <TrendingDown size={16} />}
          {row.original.goal === "maintain" && <Scale size={16} />}
        </div>
      );
    },
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
        // eslint-disable-next-line
        useCoachingClientsState().functions.toggleAddEditClientDialog;

      const toggleDeleteClientDialog =
        // eslint-disable-next-line
        useCoachingClientsState().functions.toggleDeleteClientDialog;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <p>Hantera</p>
              <small>{row.original.name}</small>
            </DropdownMenuLabel>
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
              onClick={() => toggleDeleteClientDialog(row.original, true)}
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
