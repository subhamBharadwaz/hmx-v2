"use client"

import { Badge } from "@/components/ui/badge"
import { IUser } from "@/types"
import { ColumnDef } from "@tanstack/react-table"

import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role: "admin" | "user" = row.getValue("role")
      return (
        <Badge
          variant={role === "admin" ? "destructive" : "default"}
          className="justify-end"
        >
          {role}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
      return <DataTableRowActions user={user} />
    },
  },
]
