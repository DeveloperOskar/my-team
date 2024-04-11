"use client";

import React, { useEffect } from "react";
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
import { useCoachingClientsState } from "./useCoachingClientsState";
import { createCoachingClientSchema } from "@/server/api/routers/coaching/clients/schemas";

const AddEditCoachingClientDialog = () => {
  const { toast } = useToast();
  const router = useRouter();
  const createMutation = api.coachingClients.createClient.useMutation();
  // const updateMutation = api.coachingDataFoods.update.useMutation();

  const { client, open } = useCoachingClientsState().addEditClientDialog;
  const toggleAddEditClientDialog =
    useCoachingClientsState().functions.toggleAddEditClientDialog;

  const form = useForm<z.infer<typeof createCoachingClientSchema>>({
    resolver: zodResolver(createCoachingClientSchema),
    defaultValues: {
      name: "",
      email: "",
      goal: "maintain",
      currentWeight: 0,
      height: 0,
      extraInfo: "",
      protein: 0,
      carbs: 0,
      fat: 0,
      kcal: 0,
    },
  });

  useEffect(() => {
    if (client) {
      form.setValue("name", client.name);
      form.setValue("email", client.email);
      form.setValue("goal", client.goal);
      form.setValue("currentWeight", client.currentWeight ?? undefined);
      form.setValue("height", client.height ?? undefined);
      form.setValue("extraInfo", client.extraInfo);
      form.setValue("protein", client.protein);
      form.setValue("carbs", client.carbs);
      form.setValue("fat", client.fat);
      form.setValue("kcal", client.kcal);
    } else {
      form.reset();
    }
  }, [client]);

  const handleSubmit = async (
    values: z.infer<typeof createCoachingClientSchema>,
  ) => {
    console.log(values);
    if (client) {
      // await handleUpdateFood(values, food.id);
      alert("update tbd");
    } else {
      await handleCreateNewFood(values);
    }
  };

  const handleCreateNewFood = async (
    values: z.infer<typeof createCoachingClientSchema>,
  ) => {
    try {
      toast({
        title: "Skapat",
        description: `Klienten ${values.name} har skapats.`,
      });

      await createMutation.mutateAsync(values);
      form.reset();
      toggleAddEditClientDialog(null, false);
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

  // const handleUpdateFood = async (
  //   values: z.infer<typeof createCoachingClientSchema>,
  //   foodId: number,
  // ) => {
  //   try {
  //     toast({
  //       title: "Uppdaterats!",
  //       description: `Ditt livsmedel ${values.name} har uppdaterats.`,
  //     });

  //     await updateMutation.mutateAsync({
  //       id: foodId,
  //       data: values,
  //     });
  //     form.reset();
  //     toggleAddEditFoodDialog(null, false);
  //     router.refresh();
  //   } catch (error) {
  //     toast({
  //       variant: "destructive",
  //       title: "Oh nej. Något gick fel.",
  //       description:
  //         "Det blev något fel, testa igen eller försök senare. Kvarstår problemet ber vi dig kontakta supporten",
  //     });
  //   }
  // };

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
      <AlertDialogContent className="w-[700px] max-w-none">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {client ? "Redigera klient" : "Skapa klient"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Klienter du skapar kan användas för att hålla koll på deras
            progression och använda för att skapa träningsscheman och
            kostscheman.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            <div className="grid grid-cols-2 gap-x-5">
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
            </div>

            <div className="grid grid-cols-3 gap-x-5">
              <FormField
                control={form.control}
                name="protein"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Protein</FormLabel>
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
                    <FormLabel>Kolhydrater</FormLabel>
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
                    <FormLabel>Fett</FormLabel>
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
            </div>

            <div className="grid grid-cols-2">
              <FormField
                control={form.control}
                name="kcal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kalorier</FormLabel>
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

            <AlertDialogFooter>
              <AlertDialogCancel
                disabled={createMutation.isPending}
                onClick={() => toggleAddEditClientDialog(null, false)}
                type="button"
              >
                Avbryt
              </AlertDialogCancel>

              <AlertDialogAction
                disabled={createMutation.isPending}
                type="submit"
              >
                {client ? "Uppdatera" : "Skapa"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddEditCoachingClientDialog;
