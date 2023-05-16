"use client"

import { FC } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
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

const orders = [
  {
    date: format(new Date(), "dd.MM.yyyy"),
    productName: "Rigo Jogger",
    orderNo: "15696312$dsddsd",
    price: "$324",
    orderStatus: "Delivered",
  },
  {
    date: format(new Date(), "dd.MM.yyyy"),
    productName: "Rigo Jogger",
    orderNo: "15696312$dsddsd",
    price: "$324",
    orderStatus: "Processing",
  },
  {
    date: format(new Date(), "dd.MM.yyyy"),
    productName: "Rigo Jogger",
    orderNo: "15696312$dsddsd",
    price: "$324",
    orderStatus: "Shipped",
  },
  {
    date: format(new Date(), "dd.MM.yyyy"),
    productName: "Rigo Jogger",
    orderNo: "15696312$dsddsd",
    price: "$324",
    orderStatus: "Delivered",
  },
  {
    date: format(new Date(), "dd.MM.yyyy"),
    productName: "Rigo Jogger",
    orderNo: "15696312$dsddsd",
    price: "$324",
    orderStatus: "Processing",
  },
]

interface RecentOrdersProps {}

const RecentOrders: FC<RecentOrdersProps> = ({}) => {
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
              {orders.map((order) => (
                <TableRow key={order.orderNo}>
                  <TableCell className="text-slate-500 dark:text-slate-400">
                    {order.date}
                  </TableCell>
                  <TableCell>{order.productName}</TableCell>
                  <TableCell>{order.orderNo}</TableCell>
                  <TableCell>{order.price}</TableCell>
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
                      {order.orderStatus}
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
