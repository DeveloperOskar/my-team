"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { coachingFoodColumns } from "./coachingFoodsColumns";
import {
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { type RouterOutput } from "@/server/api/root";
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
import { systemFoodColumns } from "./systemFoodsColumns";

export const CoachingFoodsTable: React.FC<{
  coachingFoods: RouterOutput["coachingDataFoods"]["getCoachingFoods"];
  systemFoods: RouterOutput["coachingDataFoods"]["getSystemFoods"];
}> = ({ coachingFoods, systemFoods }) => {
  const toggleAddEditFoodDialog =
    useCoachingFoodsState().functions.toggleAddEditFoodDialog;

  const [coachingColumnsFilters, setCoachingColumnsFilters] =
    React.useState<ColumnFiltersState>([]);

  const [systemColumnsFilters, setSystemColumnsFilters] =
    React.useState<ColumnFiltersState>([]);

  const coachingFoodsTable = useReactTable({
    data: coachingFoods,
    columns: coachingFoodColumns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setCoachingColumnsFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters: coachingColumnsFilters,
    },
  });
  const systemFoodsTable = useReactTable({
    data: systemFoods,
    columns: systemFoodColumns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setSystemColumnsFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters: systemColumnsFilters,
    },
  });

  const [selectedTable, setSelectedTable] = React.useState<
    "system-foods" | "coaching-foods"
  >("coaching-foods");

  return (
    <>
      <div className="mb-4 flex h-auto flex-col items-center justify-between lg:h-[45px] lg:flex-row">
        <div className="flex w-full flex-col items-center gap-3 lg:h-auto lg:flex-row">
          {selectedTable === "coaching-foods" && (
            <Input
              value={
                (coachingFoodsTable
                  .getColumn("name")
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                coachingFoodsTable
                  .getColumn("name")
                  ?.setFilterValue(event.target.value)
              }
              className="w-full bg-white lg:w-[300px]"
              placeholder="Sök efter livsmedel..."
            />
          )}

          {selectedTable === "system-foods" && (
            <Input
              value={
                (systemFoodsTable
                  .getColumn("name")
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                systemFoodsTable
                  .getColumn("name")
                  ?.setFilterValue(event.target.value)
              }
              className="w-full bg-white lg:w-[300px]"
              placeholder="Sök efter livsmedel..."
            />
          )}

          <Select
            value={selectedTable}
            onValueChange={(val: "coaching-foods" | "system-foods") =>
              setSelectedTable(val)
            }
          >
            <SelectTrigger className="w-full bg-white lg:w-[220px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="coaching-foods">Dina livsmedel</SelectItem>
              <SelectItem value="system-foods">Systemets livsmedel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          className="mt-4 w-full lg:mt-0 lg:w-auto"
          size="sm"
          onClick={() => toggleAddEditFoodDialog(null, true)}
        >
          <PlusCircle size={16} />
          Nytt livsmedel
        </Button>
      </div>

      {selectedTable === "coaching-foods" && (
        <Table className="block h-[calc(100%-155px)]  rounded border bg-white lg:h-[calc(100%-55px)]">
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
                        "h-[50px] pr-4",
                        cell.column.id === "favorite" &&
                          " w-[60px] min-w-[60px]",
                        cell.column.id === "actions" &&
                          "w-[60px] min-w-[60px]  pr-2.5",
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
                  colSpan={coachingFoodColumns.length}
                  className="h-24 text-center"
                >
                  Inga resultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {selectedTable === "system-foods" && (
        <Table className="block h-[calc(100%-155px)]  rounded border bg-white lg:h-[calc(100%-55px)]">
          <TableHeader>
            {systemFoodsTable.getHeaderGroups().map((headerGroup) => (
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
            {systemFoodsTable.getRowModel().rows?.length ? (
              systemFoodsTable.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "h-[50px] pr-4",
                        cell.column.id === "favorite" &&
                          " w-[60px] min-w-[60px]",
                        cell.column.id === "actions" &&
                          "w-[60px] min-w-[60px]  pr-2.5",
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
                  colSpan={systemFoodColumns.length}
                  className="h-24 text-center"
                >
                  Inga resultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
};
