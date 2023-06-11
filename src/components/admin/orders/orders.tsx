"use client"

import { FC } from "react"
import { columns } from "@/components/admin/orders/columns"
import { DataTable } from "@/components/admin/orders/data-table"
import { IOrder } from "@/types"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface OrdersProps {
  accessKey: string | undefined
}

const Orders: FC<OrdersProps> = ({ accessKey }) => {
  const { data, isLoading } = useQuery<IOrder[]>({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/orders`,
        {
          headers: {
            Authorization: `Bearer ${accessKey}`,
          },
        }
      )
      return await res?.data.orders
    },
  })



  return (
    <div className="w-full">
      {data && <DataTable columns={columns} data={data} />}
    </div>
  )
}

export default Orders
