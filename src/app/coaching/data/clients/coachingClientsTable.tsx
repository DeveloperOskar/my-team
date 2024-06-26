"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { type RouterOutput } from "@/server/api/root";
import { Button } from "@/app/_components/ui/button";
import { PlusCircle } from "lucide-react";
import { Input } from "@/app/_components/ui/input";
import { cn } from "@/lib/utils";
import { useCoachingClientsState } from "./useCoachingClientsState";
import { coachingClientsColumns } from "./coachingClientsColumns";

export const CoachingClientsTable: React.FC<{
  clients: RouterOutput["coachingClients"]["getClients"];
}> = ({ clients }) => {
  const toggleAddEditClientDialog =
    useCoachingClientsState().functions.toggleAddEditClientDialog;

  const clientsTable = useReactTable({
    data: clients,
    columns: coachingClientsColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="mb-4 flex h-[45px] items-center justify-between">
        <div className="flex items-center gap-3">
          <Input
            className="w-[300px] bg-white"
            placeholder="Sök efter en klient..."
          />
        </div>

        <Button size="sm" onClick={() => toggleAddEditClientDialog(null, true)}>
          <PlusCircle size={16} />
          Ny klient
        </Button>
      </div>

      <Table className="h-[calc(100%-55px)]  rounded border bg-white">
        <TableHeader>
          {clientsTable.getHeaderGroups().map((headerGroup) => (
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
          {clientsTable.getRowModel().rows?.length ? (
            clientsTable.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      "h-[50px]",
                      cell.column.id === "avatar" && " w-[85px]",

                      cell.column.id === "actions" &&
                        "w-[60px] min-w-[60px]  pr-2.5",
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={coachingClientsColumns.length}
                className="h-24 text-center"
              >
                Inga resultat.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
