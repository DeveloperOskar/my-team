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

const Menu = () => {
  const { addMeal, deleteMeal, resetALl } =
    useCoachingMealPlanState().functions;
  const { meals, endDate, includeAuthor, startDate, selectedClient } =
    useCoachingMealPlanState();

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
    const document = GetMealPlanDocument({
      meals,
      endDate,
      startDate,
      includeAuthor,
      selectedClient,
    });
    const blob = await pdf(document).toBlob();
    download(blob, "test.pdf", "pdf");
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
