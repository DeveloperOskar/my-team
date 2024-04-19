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

import { cn } from "@/lib/utils";
import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";

import React, { useState } from "react";
import { Label } from "@/app/_components/ui/label";
import { Switch } from "@/app/_components/ui/switch";
import { Separator } from "@/app/_components/ui/separator";

const Settings = () => {
  return (
    <Card className="block h-full basis-[300px] ">
      <CardHeader className=" px-5 py-5 ">
        <CardTitle>Inställningar</CardTitle>

        <CardDescription>
          Här kan du ändra inställningar för kostschemat
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col px-5">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1.5">
            <Label>Inkludera mig som författare</Label>
            <Switch s />
          </div>

          <div>
            <Label>Startdatum</Label>
            <StartDate />
          </div>

          <div>
            <Label>Slutdatum</Label>
            <EndDate />
          </div>
        </div>

        <Separator className="my-6" />
      </CardContent>
    </Card>
  );
};

export default Settings;

export const StartDate = () => {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
export const EndDate = () => {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
