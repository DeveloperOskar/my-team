"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { RouterOutput } from "@/server/api/root";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Star } from "lucide-react";
import { cn, hyphenIfEmpty } from "@/lib/utils";
import { CoachingMealPlanFood } from "./useCoachingMealPlanState";

const FoodsSelector: React.FC<{
  coachingFoods: RouterOutput["coachingDataFoods"]["getCoachingFoods"];
  systemFoods: RouterOutput["coachingDataFoods"]["getSystemFoods"];
}> = ({ coachingFoods, systemFoods }) => {
  const [selectedType, setSelectedType] = React.useState<
    "coaching-foods" | "system-foods"
  >("coaching-foods");
  return (
    <Card className="block h-full basis-[330px] ">
      <CardHeader className=" px-5 py-5 ">
        <CardTitle>Livsmedel</CardTitle>

        <CardDescription>Bygg kostschemat med dina livsmedel</CardDescription>
      </CardHeader>

      <div className="mb-3 px-5">
        <Select
          onValueChange={(val) =>
            setSelectedType(val as "coaching-foods" | "system-foods")
          }
          defaultValue={"coaching-foods"}
          value={selectedType}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a verified email to display" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="coaching-foods">Dina livsmedel</SelectItem>
            <SelectItem value="system-foods">Systemets livsmedel</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex h-[calc(100%-150px)]  flex-col gap-3 overflow-scroll pb-5 pl-5 pr-3">
        {selectedType === "coaching-foods" &&
          coachingFoods.map((food) => (
            <FoodCard
              key={food.id}
              name={food.name}
              brand={food.brand}
              carbs={food.carbs}
              liked={food.liked}
              protein={food.protein}
              kcal={food.kcal}
              fat={food.fat}
              amount={food.servingSize}
              unit={food.unit}
            />
          ))}
        {selectedType === "system-foods" &&
          systemFoods.map((food) => (
            <FoodCard
              key={food.systemFoodId}
              name={food.name}
              brand={null}
              carbs={food.carbs}
              liked={food.liked ?? false}
              protein={food.protein}
              kcal={food.kcal}
              fat={food.fat}
              amount={food.servingSize}
              unit={food.unit}
            />
          ))}
      </div>
    </Card>
  );
};

export default FoodsSelector;

const FoodCard: React.FC<{
  name: string;
  liked: boolean;
  brand: string | null;
  protein: number;
  carbs: number;
  fat: number;
  kcal: number;
  amount: number;
  unit: "g" | "ml";
}> = ({ name, liked, brand, protein, carbs, fat, kcal, amount, unit }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const food: CoachingMealPlanFood = {
      name,
      unit,
      calculatedCalories: kcal,
      calculatedCarbs: carbs,
      calculatedFat: fat,
      calculatedAmount: amount,
      originalAmount: amount,
      originalProtein: protein,
      originalCarbs: carbs,
      originalFat: fat,
      originalCalories: kcal,
      calculatedProtein: protein,
    };

    e.dataTransfer?.setData("food", JSON.stringify(food));
  };
  return (
    <Card
      className="relative cursor-grab px-3 py-3 hover:bg-accent"
      draggable
      onDragStart={handleDragStart}
    >
      <Star
        size={20}
        className={cn(
          "absolute right-2 top-2 text-yellow-400",
          liked && "fill-yellow-400",
        )}
      />

      <div>
        <CardTitle>{name}</CardTitle>
        {brand && <CardDescription>{hyphenIfEmpty(brand)}</CardDescription>}
      </div>

      <div className="mt-3">
        <p className="text-xs text-muted-foreground">Kalorier: {kcal}</p>
      </div>

      <div className="flex items-center gap-1">
        <p className="text-xs text-muted-foreground">Protein: {protein}g</p>
        <span className="text-xs text-muted-foreground">|</span>
        <p className="text-xs text-muted-foreground">Kolyhdrater: {carbs}g</p>
        <span className="text-xs text-muted-foreground">|</span>
        <p className="text-xs text-muted-foreground">Fett: {fat}g</p>
      </div>
    </Card>
  );
};
