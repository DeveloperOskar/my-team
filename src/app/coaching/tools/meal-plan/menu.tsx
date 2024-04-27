"use client";

import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/app/_components/ui/menubar";
import { File, Plus, Undo2 } from "lucide-react";
import { useCoachingMealPlanState } from "./useCoachingMealPlanState";
import { cn } from "@/lib/utils";
import { pdf } from "@react-pdf/renderer";
import download from "downloadjs";
import { GetMealPlanDocument } from "./meal-plan-pdf";
import { type Session } from "next-auth";

const Menu: React.FC<{ session: Session | null }> = ({ session }) => {
  const { addMeal, deleteMeal, resetALl } =
    useCoachingMealPlanState().functions;
  const {
    meals,
    endDate,
    includeAuthor,
    startDate,
    selectedClient,
    name,
    description,
  } = useCoachingMealPlanState();

  const handleAddMeal = () => {
    addMeal();
  };
  const handleDeleteMeal = (index: number) => {
    deleteMeal(index);
  };
  const handleResetAll = () => {
    resetALl();
  };
  const exportMealPlanPdf = async () => {
    if (!session?.user) return;

    const document = GetMealPlanDocument({
      meals,
      endDate,
      startDate,
      includeAuthor,
      selectedClient,
      name,
      description,
      authorName: session.user.name ?? "",
    });
    const blob = await pdf(document).toBlob();
    const mealPlanPdfName = `${name}-${new Date().toLocaleDateString()}.pdf`;

    download(blob, mealPlanPdfName, "pdf");
  };

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Schema</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={handleAddMeal}>
            Lägg till måltid
            <MenubarShortcut>
              <Plus size={18} />
            </MenubarShortcut>
          </MenubarItem>

          <MenubarSub>
            <MenubarSubTrigger
              className={cn("", meals.length === 0 && " opacity-75")}
              disabled={meals.length === 0}
            >
              Ta bort
            </MenubarSubTrigger>
            <MenubarSubContent>
              {meals.map((meal, i) => (
                <MenubarItem onClick={() => handleDeleteMeal(i)} key={i}>
                  {meal.name}
                </MenubarItem>
              ))}
            </MenubarSubContent>
          </MenubarSub>

          <MenubarSeparator />

          <MenubarItem onClick={handleResetAll}>
            Återställ allt
            <MenubarShortcut>
              <Undo2 size={18} />
            </MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Exportera</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={exportMealPlanPdf}>
            Pdf
            <MenubarShortcut>
              <File size={18} />
            </MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Menu;
