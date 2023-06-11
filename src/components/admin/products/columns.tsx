"use client"



import { IProduct } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./data-table-column-header"
import Image from "next/image"
import { DataTableRowActions } from "./data-table-row-actions"

interface Photo {
  secure_url: string,
  id: string
}

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: "photos",
    header: "Product",
    cell: ({ row }) => {
      const photos: Photo[] = row.getValue("photos")
      return (
        <Image src={photos[0].secure_url} alt='Product' width={50} height={50} className="object-cover"/>
      )
    },
  },
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "category",
    header: "Category",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "gender",
    header: "Section",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="justify-end"
        title="Price"
      />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original
      return <DataTableRowActions product={product} />
    },
  },
]
