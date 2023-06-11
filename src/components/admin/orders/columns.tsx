"use client"


import { IOrder } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./data-table-column-header"
import {format} from 'date-fns'
import { Badge } from "@/components/ui/badge"
import { DataTableRowActions } from "./data-table-row-actions"


type ShippingInfoType = IOrder['shippingInfo']; 
type OrderItemsType = IOrder['orderItems']; 


export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: "_id",
    header: "Order Number",
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({row})=> {
      const date: Date = row.getValue("createdAt")
      return <p>{format(new Date(date), 'dd.MM.yyyy')}</p>
    }
  },
  {
    accessorKey: "shippingInfo",
    header: 'Customer',
    cell: ({ row }) => {
      const shippingInfo: ShippingInfoType = row.getValue("shippingInfo")
      return (
       <p>{`${shippingInfo?.firstName} ${shippingInfo?.lastName}`}</p>
      )
    },
  },
  {
    accessorKey: "orderItems",
    header: 'Product(s)',
    cell: ({ row }) => {
      const orderItems: OrderItemsType = row.getValue("orderItems")
      return (
      <p>{orderItems?.map(item=> item?.name).join(", ")}</p>
      )
    },
  },
  {
    header: 'Destination',
    cell: ({ row }) => {
      const shippingInfo: ShippingInfoType = row.getValue("shippingInfo")
      return (
      <p>{`${shippingInfo?.streetName}, ${shippingInfo?.city}`}</p>
      )
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Price"
      />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"))
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "orderStatus",
    header: 'Status',
    cell: ({ row }) => {
      const status: string = row.getValue("orderStatus")
      return (
        <Badge
        className="justify-end"
        variant={
          status === "Delivered"
            ? "success"
            : status === "Processing"
            ? "warning"
            : "secondary"
        }
      >
        {status}
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
        const order = row.original
        return <DataTableRowActions order={order} />
      },
  },
]
