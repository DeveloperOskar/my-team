"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { columns } from "./coachingFoodsColumns";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { RouterOutput } from "@/server/api/root";
import { Card } from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { PlusCircle } from "lucide-react";
import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useCoachingFoodsState } from "./coachingFoodsState";
import { cn } from "@/lib/utils";

export const CoachingFoodsTable: React.FC<{
  coachingFoods: RouterOutput["coachingDataFoods"]["get"];
  systemFoods: RouterOutput["coachingDataFoods"]["getSystemFoods"];
}> = ({ coachingFoods, systemFoods }) => {
  const toggleAddEditFoodDialog =
    useCoachingFoodsState().functions.toggleAddEditFoodDialog;

  const coachingFoodsTable = useReactTable({
    data: coachingFoods,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex h-full w-full flex-col">
      <div className="mb-4 flex shrink items-center justify-between">
        <div className="flex items-center gap-3">
          <Input
            className="w-[300px] bg-white"
            placeholder="Sök efter livsmedel..."
          />

          <Select defaultValue="coaching-foods">
            <SelectTrigger className="w-[220px] bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="coaching-foods">Dina livsmedel</SelectItem>
              <SelectItem value="system-foods">Systemets livsmedel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button size="sm" onClick={() => toggleAddEditFoodDialog(null, true)}>
          <PlusCircle size={16} />
          Nytt livsmedel
        </Button>
      </div>

      <Card className="grow overflow-auto shadow-none ">
        <Table>
          <TableHeader>
            {coachingFoodsTable.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {coachingFoodsTable.getRowModel().rows?.length ? (
              coachingFoodsTable.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "",
                        cell.column.id === "favorite" && " w-[70px]",
                        cell.column.id === "actions" && " w-[70px]",
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
