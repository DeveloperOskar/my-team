"use client";

import React, { useEffect } from "react";
import { useCoachingFoodsState } from "./coachingFoodsState";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createCoachingFoodsSchema } from "@/server/api/routers/coaching/data/foods/schemas";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { api } from "@/trpc/react";
import { useToast } from "@/app/_components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Separator } from "@/app/_components/ui/separator";

const AddEditCoachingFoodsDialog = () => {
  const { toast } = useToast();
  const router = useRouter();
  const createMutation = api.coachingDataFoods.create.useMutation();
  const updateMutation = api.coachingDataFoods.update.useMutation();

  const { food, open } = useCoachingFoodsState().addEditFoodDialog;
  const toggleAddEditFoodDialog =
    useCoachingFoodsState().functions.toggleAddEditFoodDialog;

  const form = useForm<z.infer<typeof createCoachingFoodsSchema>>({
    resolver: zodResolver(createCoachingFoodsSchema),
    defaultValues: {
      name: "",
      brand: "",
      servingSize: 100,
      unit: "g",
      protein: 0,
      carbs: 0,
      fat: 0,
      kcal: 0,
    },
  });

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open]);

  useEffect(() => {
    if (food) {
      form.setValue("name", food.name);
      form.setValue("brand", food.brand);
      form.setValue("servingSize", food.servingSize);
      form.setValue("unit", food.unit);
      form.setValue("protein", food.protein);
      form.setValue("carbs", food.carbs);
      form.setValue("fat", food.fat);
      form.setValue("kcal", food.kcal);
    }
  }, [food]);

  const handleSubmit = async (
    values: z.infer<typeof createCoachingFoodsSchema>,
  ) => {
    if (food) {
      await handleUpdateFood(values, food.id);
    } else {
      await handleCreateNewFood(values);
    }
  };

  const handleCreateNewFood = async (
    values: z.infer<typeof createCoachingFoodsSchema>,
  ) => {
    try {
      await createMutation.mutateAsync(values);

      toast({
        title: "Skapat",
        description: `Ditt livsmedel ${values.name} har skapats.`,
      });

      form.reset();
      toggleAddEditFoodDialog(null, false);
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oh nej. Något gick fel.",
        description:
          "Det blev något fel, testa igen eller försök senare. Kvarstår problemet ber vi dig kontakta supporten",
      });
    }
  };

  const handleUpdateFood = async (
    values: z.infer<typeof createCoachingFoodsSchema>,
    foodId: number,
  ) => {
    try {
      await updateMutation.mutateAsync({
        id: foodId,
        data: values,
      });

      toast({
        title: "Uppdaterats!",
        description: `Ditt livsmedel ${values.name} har uppdaterats.`,
      });

      form.reset();
      toggleAddEditFoodDialog(null, false);
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oh nej. Något gick fel.",
        description:
          "Det blev något fel, testa igen eller försök senare. Kvarstår problemet ber vi dig kontakta supporten",
      });
    }
  };

  const calculateCalories = (
    value: number,
    property: "carbs" | "fat" | "protein",
  ) => {
    if (property === "protein") {
      const caloriesFromProtein = value * 4;
      const caloriesFromCarbs = form.getValues("carbs") * 4;
      const caloriesFromFat = form.getValues("fat") * 9;
      const totalCalories =
        caloriesFromProtein + caloriesFromCarbs + caloriesFromFat;
      form.setValue("kcal", totalCalories);
    } else if (property === "carbs") {
      const caloriesFromCarbs = value * 4;
      const caloriesFromProtein = form.getValues("protein") * 4;
      const caloriesFromFat = form.getValues("fat") * 9;
      const totalCalories =
        caloriesFromProtein + caloriesFromCarbs + caloriesFromFat;
      form.setValue("kcal", totalCalories);
    } else {
      const caloriesFromFat = value * 9;
      const caloriesFromProtein = form.getValues("protein") * 4;
      const caloriesFromCarbs = form.getValues("carbs") * 4;
      const totalCalories =
        caloriesFromProtein + caloriesFromCarbs + caloriesFromFat;
      form.setValue("kcal", totalCalories);
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="flex h-full w-full max-w-none flex-col items-start overflow-auto sm:rounded-none lg:h-auto lg:w-[700px] lg:rounded">
        <AlertDialogHeader className="mr-auto">
          <AlertDialogTitle className="text-start">
            {food ? "Redigera livsmedel" : "Skapa livsmedel"}
          </AlertDialogTitle>

          <AlertDialogDescription className="text-start">
            Livsmedel du skapar kan du använda i kostscheman och måltider.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex h-full w-full flex-col "
          >
            <div className="grid grid-cols-1 gap-x-5 gap-y-2 lg:grid-cols-2 lg:gap-y-0">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Namn *</FormLabel>
                    <FormControl>
                      <Input placeholder="Livsmedlets namn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Märke</FormLabel>
                    <FormControl>
                      <Input placeholder="Livsmedlets märke" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="mb-4 mt-6" />

            <div className="grid grid-cols-1 gap-x-5 gap-y-2 lg:grid-cols-2 lg:gap-y-0">
              <FormField
                control={form.control}
                name="servingSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portionsstorlek *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ange portionsstorlek"
                        {...field}
                        onChange={(val) => {
                          field.onChange(val.target.valueAsNumber);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enhet *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="g">Gram</SelectItem>
                        <SelectItem value="ml">Mililiter</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="mb-4 mt-6" />

            <div className="grid grid-cols-1 gap-x-5 gap-y-2 lg:grid-cols-2 ">
              <FormField
                control={form.control}
                name="protein"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Protein *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Livsmedlets protein"
                        {...field}
                        onChange={(val) => {
                          field.onChange(val.target.valueAsNumber);
                          calculateCalories(
                            val.target.valueAsNumber,
                            "protein",
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="carbs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kolhydrater *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Livsmedlets kolhydrater"
                        {...field}
                        onChange={(val) => {
                          field.onChange(val.target.valueAsNumber);
                          calculateCalories(val.target.valueAsNumber, "carbs");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fett *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Livsmedlets fett"
                        {...field}
                        onChange={(val) => {
                          field.onChange(val.target.valueAsNumber);
                          calculateCalories(val.target.valueAsNumber, "fat");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="kcal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kalorier *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Livsmedlets kolorier"
                        {...field}
                        onChange={(event) =>
                          field.onChange(event.target.valueAsNumber)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="mb-4 mt-6" />

            <AlertDialogFooter className="mt-auto pb-6 lg:mt-4 lg:pb-0">
              <AlertDialogCancel
                disabled={createMutation.isPending || updateMutation.isPending}
                onClick={() => toggleAddEditFoodDialog(null, false)}
                type="button"
              >
                Avbryt
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={createMutation.isPending || updateMutation.isPending}
                type="submit"
              >
                {food ? "Uppdatera" : "Skapa"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddEditCoachingFoodsDialog;
