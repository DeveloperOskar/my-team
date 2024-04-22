"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import React, { useEffect } from "react";
import Menu from "./menu";
import {
  CoachingMealPlanFood,
  CoachingMealPlanMeal,
  useCoachingMealPlanState,
} from "./useCoachingMealPlanState";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Textarea } from "@/app/_components/ui/textarea";
import { cn, showDecimalIfNotZero, toDisplayUnit } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Trash } from "lucide-react";
import { calculateMealTotals, getMealPlanTotals } from "./helpers";
import { Separator } from "@/app/_components/ui/separator";

const Plan = () => {
  const meals = useCoachingMealPlanState().meals;
  const [activeTab, setActiveTab] = React.useState("overview");

  useEffect(() => {
    if (meals.length === 0) setActiveTab("overview");

    if (activeTab !== "overview" && meals.length > 0)
      setActiveTab((meals.length - 1).toString());
  }, [meals]);

  return (
    <div className="flex h-full basis-[700px] flex-col gap-2 overflow-auto">
      <Menu />

      <Card className="h-full ">
        <CardHeader className="px-5 pb-3 pt-5">
          <CardTitle>Kostschemat</CardTitle>
          <CardDescription>Här redigerar du kostschemat</CardDescription>
        </CardHeader>

        <div className="px-5">
          <Tabs
            value={activeTab}
            onValueChange={(val) => setActiveTab(val)}
            defaultValue="overview"
            className="w-full "
          >
            <TabsList className="w-full ">
              <TabsTrigger className="grow" value="overview">
                Summering
              </TabsTrigger>

              {meals.map((meal, i) => (
                <TabsTrigger className="grow " key={i} value={i + ""}>
                  {meal.name ? meal.name : "Inget namn."}
                </TabsTrigger>
              ))}
            </TabsList>

            <SummaryTab />
            {meals.map((meal, i) => (
              <TabsContent key={i} value={i.toString()}>
                <MealPlanMeal meal={meal} index={i} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </Card>
    </div>
  );
};

export default Plan;

const SummaryTab = () => {
  const meals = useCoachingMealPlanState().meals;
  const name = useCoachingMealPlanState().name;
  const description = useCoachingMealPlanState().description;
  const changePlanName = useCoachingMealPlanState().functions.changePlanName;
  const changePlanDescription =
    useCoachingMealPlanState().functions.changePlanDescription;

  return (
    <TabsContent value="overview">
      <>
        <div className="flex h-full flex-col gap-2">
          <div>
            <Label htmlFor="name">Namn på kostschemat</Label>
            <Input
              id="name"
              onChange={(e) => changePlanName(e.target.value)}
              className="w-[300px]"
              value={name}
            />
          </div>

          <div>
            <Label htmlFor="description">Extra info</Label>
            <Textarea
              id="description"
              onChange={(e) => changePlanDescription(e.target.value)}
              placeholder="Ange extra information..."
              value={description}
            />
          </div>
        </div>

        <Separator className="my-10" />

        <CardTitle>Summering</CardTitle>
        <p className="mt-2 text-sm">
          <span className="font-semibold">Antal måltider:</span> {meals.length}{" "}
          st
        </p>
        <p className="text-sm">
          <span className="font-semibold">Protein:</span>{" "}
          {showDecimalIfNotZero(getMealPlanTotals(meals).protein)} g
        </p>
        <p className="text-sm">
          <span className="font-semibold">Kolhydrater:</span>{" "}
          {showDecimalIfNotZero(getMealPlanTotals(meals).carbs)} g
        </p>
        <p className="text-sm">
          <span className="font-semibold">Fett:</span>{" "}
          {showDecimalIfNotZero(getMealPlanTotals(meals).fat)} g
        </p>
        <p className="text-sm">
          <span className="font-semibold">Kalorier:</span>{" "}
          {showDecimalIfNotZero(getMealPlanTotals(meals).calories)} kcal
        </p>
      </>
    </TabsContent>
  );
};

const MealPlanMeal: React.FC<{ meal: CoachingMealPlanMeal; index: number }> = ({
  meal,
  index,
}) => {
  const { changeMealName, addFoodToMeal, removeFoodFromMeal, amountChanged } =
    useCoachingMealPlanState().functions;

  const [isDraggingOver, setIsDraggingOver] = React.useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const data = e.dataTransfer.getData("food");
    if (!data) return;
    const food = JSON.parse(data) as CoachingMealPlanFood;
    if (!food) return;
    addFoodToMeal(index, food);
  };
  const handleRemoveFood = (foodIndex: number, mealIndex: number) => {
    removeFoodFromMeal(foodIndex, mealIndex);
  };
  const handleAmountChanged = (
    foodIndex: number,
    mealIndex: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.valueAsNumber;

    amountChanged(foodIndex, mealIndex, value);
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Label htmlFor="name">Namn</Label>
        <Input
          id="name"
          value={meal.name}
          onChange={(e) =>
            changeMealName(index, e.target.value ? e.target.value : ``)
          }
          placeholder="Ange namn..."
          className="w-[300px]"
        />
      </div>

      <div>
        <Label htmlFor="description">Övrig info</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Ange extra information om måltiden..."
        />
      </div>

      {meal.foods.length === 0 && (
        <div
          className={cn(
            " mt-5  flex h-[400px] items-center justify-center rounded-lg border-2 border-dashed",
            isDraggingOver && " border-accent-foreground bg-accent",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p className=" font-light">
            Dra livsmedel hit för att lägga till dem
          </p>
        </div>
      )}

      {meal.foods.length > 0 && (
        <Card
          className={cn(
            "mt-3  pb-3",
            isDraggingOver && "rounded-lg bg-accent ",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Table>
            <TableCaption>
              Dra livsmedel hit för att lägga till dem
            </TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead>Namn</TableHead>
                <TableHead>Mängd</TableHead>
                <TableHead>Enhet</TableHead>
                <TableHead>Protein</TableHead>
                <TableHead>Kolhydrater</TableHead>
                <TableHead>Fett</TableHead>
                <TableHead>Kalorier</TableHead>
                <TableHead className="sr-only">actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {meal.foods.map((food, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium capitalize">
                    {food.name}
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      style={{
                        WebkitAppearance: "none",
                        margin: 0,
                        MozAppearance: "textfield",
                      }}
                      onChange={(e) => handleAmountChanged(i, index, e)}
                      className="h-[28px] w-[55px] p-1 text-xs"
                      value={food.calculatedAmount}
                    />
                  </TableCell>
                  <TableCell className=" capitalize">
                    {toDisplayUnit(food.unit)}
                  </TableCell>
                  <TableCell>
                    {showDecimalIfNotZero(food.calculatedProtein)} g
                  </TableCell>
                  <TableCell>
                    {showDecimalIfNotZero(food.calculatedCarbs)} g
                  </TableCell>
                  <TableCell>
                    {showDecimalIfNotZero(food.calculatedFat)} g
                  </TableCell>
                  <TableCell>
                    {showDecimalIfNotZero(food.calculatedCalories)}
                  </TableCell>

                  <TableCell
                    className=" cursor-pointer"
                    onClick={() => handleRemoveFood(i, index)}
                  >
                    <Trash size={16} className="text-destructive" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Totalt:</TableCell>
                <TableCell>
                  {showDecimalIfNotZero(calculateMealTotals(meal).totalProtein)}{" "}
                  g
                </TableCell>
                <TableCell>
                  {showDecimalIfNotZero(calculateMealTotals(meal).totalCarbs)} g
                </TableCell>
                <TableCell>
                  {showDecimalIfNotZero(calculateMealTotals(meal).totalFat)} g
                </TableCell>
                <TableCell colSpan={2}>
                  {showDecimalIfNotZero(
                    calculateMealTotals(meal).totalCalories,
                    0,
                  )}{" "}
                  kcal
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Card>
      )}
    </div>
  );
};
