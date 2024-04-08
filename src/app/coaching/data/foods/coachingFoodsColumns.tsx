import { RouterOutput } from "@/server/api/root";
import { ColumnDef } from "@tanstack/react-table";
import { PencilRuler, Star, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { cn, toDisplayUnit } from "@/lib/utils";
import { Button } from "@/app/_components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useCoachingFoodsState } from "./coachingFoodsState";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/_components/ui/use-toast";

export const columns: ColumnDef<
  RouterOutput["coachingDataFoods"]["get"][number]
>[] = [
  {
    id: "favorite",
    cell: ({ row }) => {
      const { toast } = useToast();
      const router = useRouter();
      const liked = row.original.liked;
      const { mutateAsync, isPending } =
        api.coachingDataFoods.updateLikeStatus.useMutation();
      const handleClick = async () => {
        try {
          await mutateAsync({ id: row.original.id, liked: !liked });
          toast({
            title: !liked ? "Tillagd i favoriter" : "Borttagen från favoriter",
            description: `${row.original.name} har nu ${
              !liked ? "lagts till i" : "tagits bort från"
            } favoriter.`,
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Oh nej. Något gick fel.",
            description:
              "Det blev något fel, testa igen eller försök senare. Kvarstår problemet ber vi dig kontakta supporten",
          });
        }

        router.refresh();
      };

      return (
        <Button
          disabled={isPending}
          onClick={handleClick}
          variant={"ghost"}
          size="icon"
          className="baseline ml-2 inline h-auto w-auto align-bottom"
        >
          <Star
            size={22}
            className={cn("text-yellow-400", liked && "fill-yellow-400")}
          />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Namn",
  },
  {
    accessorKey: "servingSize",
    header: "Portionsstorlek",
    cell: ({ row }) => {
      const unit = row.original.unit;
      const servingSize = row.original.servingSize;

      return (
        <div>
          per {servingSize}{" "}
          <span className="capitalize">{toDisplayUnit(unit)}</span>
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
      const toggleAddEditFoodDialog =
        useCoachingFoodsState().functions.toggleAddEditFoodDialog;
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
              onClick={() => toggleAddEditFoodDialog(row.original, true)}
            >
              <PencilRuler size={14} />
              Redigera
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 text-destructive focus:text-destructive"
              onClick={() => toggleAddEditFoodDialog(row.original, true)}
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
