"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { sv } from "date-fns/locale";

import { cn, getInitials, showDecimalIfNotZero } from "@/lib/utils";
import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";

import React from "react";
import { Label } from "@/app/_components/ui/label";
import { Switch } from "@/app/_components/ui/switch";
import { Separator } from "@/app/_components/ui/separator";
import { useCoachingMealPlanState } from "./useCoachingMealPlanState";
import { Avatar, AvatarFallback } from "@/app/_components/ui/avatar";
import { getMealPlanTotals } from "./helpers";

const Settings = () => {
  const { endDate, startDate, includeAuthor, selectedClient, meals } =
    useCoachingMealPlanState();
  const {
    setIncludeAuthor,
    setEndDate,
    setStartDate,
    toggleSelectClientDialog,
  } = useCoachingMealPlanState().functions;

  return (
    <Card className="block h-full basis-[275px] ">
      <CardHeader className=" px-5 py-5 ">
        <CardTitle>Inställningar</CardTitle>

        <CardDescription>
          Här kan du ändra inställningar för kostschemat
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col px-5">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1.5">
            <Label className="flex flex-col gap-1.5">
              <span>Inkludera mig som författare</span>
              <Switch
                checked={includeAuthor}
                onCheckedChange={() => setIncludeAuthor(!includeAuthor)}
              />
            </Label>
          </div>

          <DateSelector
            label="Startdatum"
            date={startDate ? new Date(startDate) : null}
            onDateChange={(d) => setStartDate(d)}
          />

          <DateSelector
            label="Slutdatum"
            date={endDate ? new Date(endDate) : null}
            onDateChange={(d) => setEndDate(d)}
          />
        </div>

        <Separator className="my-6" />

        {!selectedClient && (
          <Button
            size="sm"
            onClick={() => toggleSelectClientDialog(true, selectedClient)}
          >
            Välj klient
          </Button>
        )}
        {selectedClient && (
          <div className="flex flex-col items-center justify-center gap-2">
            <Avatar className="h-14 w-14">
              <AvatarFallback
                className=" font-semibold"
                style={{
                  backgroundColor: selectedClient.backgroundColor,
                  color: selectedClient.textColor,
                }}
              >
                {getInitials(selectedClient.name)}
              </AvatarFallback>
            </Avatar>

            <div className="text-center">
              <p className="font-semibold">{selectedClient.name}</p>
              {selectedClient.email && (
                <p className=" text-sm text-muted-foreground">
                  {selectedClient.email}
                </p>
              )}
            </div>

            <Button
              onClick={() => toggleSelectClientDialog(true, selectedClient)}
              variant={"outline"}
              className="w-full"
            >
              Byt klient
            </Button>
            <Button
              onClick={() => toggleSelectClientDialog(false, null)}
              className="w-full"
            >
              Ta bort{" "}
            </Button>
          </div>
        )}

        <Separator className="my-6" />

        <CardTitle>Totalt</CardTitle>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm font-semibold">Protein:</p>
          <span className="text-sm">
            {showDecimalIfNotZero(getMealPlanTotals(meals).protein)}{" "}
            {selectedClient && <span>/ {selectedClient?.protein}</span>} g
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-sm font-semibold">Kolhydrater:</p>
          <span className="text-sm">
            {showDecimalIfNotZero(getMealPlanTotals(meals).carbs)}{" "}
            {selectedClient && <span>/ {selectedClient?.carbs}</span>} g
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-sm font-semibold">Fett:</p>
          <span className="text-sm">
            {showDecimalIfNotZero(getMealPlanTotals(meals).fat)}{" "}
            {selectedClient && <span>/ {selectedClient?.fat}</span>} g
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-sm font-semibold">Kalorier:</p>
          <span className="text-sm">
            {showDecimalIfNotZero(getMealPlanTotals(meals).calories, 0)}{" "}
            {selectedClient && <span>/ {selectedClient?.kcal}</span>} kcal
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Settings;

export const DateSelector: React.FC<{
  label: string;
  date: Date | null;
  onDateChange: (date: Date | undefined) => void;
}> = ({ date, label, onDateChange }) => {
  return (
    <Popover>
      <Label className="flex flex-col gap-1.5">
        <span>{label}</span>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "font-semibold",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, "PPP", {
                locale: sv,
              })
            ) : (
              <span>Välj ett datum</span>
            )}
          </Button>
        </PopoverTrigger>
      </Label>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date ?? undefined}
          onSelect={(date) => onDateChange(date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
