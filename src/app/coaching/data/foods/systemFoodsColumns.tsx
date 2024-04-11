import { RouterOutput } from "@/server/api/root";
import { ColumnDef } from "@tanstack/react-table";
import { Star } from "lucide-react";

import { cn, toDisplayUnit } from "@/lib/utils";
import { Button } from "@/app/_components/ui/button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/_components/ui/use-toast";

export const systemFoodColumns: ColumnDef<
  RouterOutput["coachingDataFoods"]["getSystemFoods"][number]
>[] = [
  {
    id: "favorite",
    cell: ({ row }) => {
      const { toast } = useToast();
      const router = useRouter();
      const liked = row.original.liked;
      const { mutateAsync, isPending } =
        api.coachingDataFoods.updateSystemFoodLikeStatus.useMutation();

      const handleClick = async () => {
        try {
          await mutateAsync({
            systemFoodId: row.original.systemFoodId,
            liked: !liked,
            action: row.original.likeId ? "update" : "insert",
            likeId: row.original.likeId ?? undefined,
          });
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
];
