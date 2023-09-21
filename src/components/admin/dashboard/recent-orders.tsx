"use client"

import { FC } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { IOrder } from "@/types"

interface RecentOrdersProps {
  accessToken: string | undefined
}

const RecentOrders: FC<RecentOrdersProps> = ({accessToken}) => {
  const { data: orders } = useQuery<IOrder[]>({
    queryKey: ["admin-recent-orders"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/orders/recent`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      return await res?.data.orders
    },
  })
  
  return (
    <Card className="w-full overflow-hidden rounded-lg border border-slate-100 p-5 shadow-lg shadow-slate-100 dark:border-slate-800 dark:shadow-none ">
      <CardHeader className="md:flex-row md:items-center md:justify-between">
        <CardTitle>Recent Orders</CardTitle>
        <Link href="#" className={cn()}>
          See all
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
            <TableCaption>A list recent 5 orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders && orders?.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="text-slate-500 dark:text-slate-400">
                  {format(new Date(order?.createdAt as Date), 'dd.mm.yyyy')}
                  </TableCell>
                  <TableCell className="truncate">{order?.orderItems?.map(item=> item?.name).join(", ")}</TableCell>
                  <TableCell>{order?._id}</TableCell>
                  <TableCell>{order?.totalAmount}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={
                        order.orderStatus === "Delivered"
                          ? "success"
                          : order?.orderStatus === "Processing"
                          ? "warning"
                          : "secondary"
                      }
                    >
                      {order?.orderStatus}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default RecentOrders
