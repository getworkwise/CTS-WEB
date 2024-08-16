// columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { LostItem } from "./types"

export const columns: ColumnDef<LostItem>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "date_lost",
    header: "Date Lost",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]