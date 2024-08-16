"use client"

import { ColumnDef } from "@tanstack/react-table"
import { LostItem } from "@/services"
import { Checkbox } from "@/components/ui/checkbox"
import { CellAction } from "./cell-action" // Adjust this import path as needed

export const columns: ColumnDef<LostItem>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "date_lost",
        header: "Date Lost",
        cell: ({ row }) => {
            const date = new Date(row.getValue("date_lost"));
            return date.toLocaleDateString();
        },
    },
    {
        accessorKey: "location",
        header: "Location",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "is_official_document",
        header: "Official Document",
        cell: ({ row }) => row.getValue("is_official_document") ? "Yes" : "No",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    }
]