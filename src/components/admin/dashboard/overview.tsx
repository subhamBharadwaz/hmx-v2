"use client"

import { FC } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { CheckCircle, DollarSign, PackageSearch, Truck } from "lucide-react"

interface OverviewProps {
  accessToken: string | undefined
}

const Overview: FC<OverviewProps> = ({ accessToken }) => {
  const { data: totalRevenue } = useQuery<number>({
    queryKey: ["admin-total-revenue"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/sales/total`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      return await res?.data.totalRevenue
    },
  })

  const { data: totalProducts } = useQuery<number>({
    queryKey: ["admin-total-products"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/products/total`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      return await res?.data.total
    },
  })

  const { data: totalOrders } = useQuery<number>({
    queryKey: ["admin-total-orders"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/orders/total`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      return await res?.data.orders
    },
  })

  const { data: totalDeliveredOrders } = useQuery<number>({
    queryKey: ["admin-total-delivered-orders"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/orders/total-delivered-orders`,
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-slate-100  shadow-lg shadow-slate-100 dark:border-slate-800 dark:shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Total Revenue</CardTitle>

          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            Rs. {totalRevenue ? totalRevenue : 0}
          </p>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>

      <Card className="border-slate-100  shadow-lg shadow-slate-100 dark:border-slate-800 dark:shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <PackageSearch className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="">
          <p className="text-2xl font-bold">
            {totalProducts ? totalProducts : 0}
          </p>
          <p className="text-xs text-muted-foreground">+3 from last month</p>
        </CardContent>
      </Card>

      <Card className="border-slate-100  shadow-lg shadow-slate-100 dark:border-slate-800 dark:shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>

          <Truck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="">
          <p className="text-2xl font-bold">{totalOrders ? totalOrders : 0}</p>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>

      <Card className="border-slate-100  shadow-lg shadow-slate-100 dark:border-slate-800 dark:shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Delivered Orders
          </CardTitle>

          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {totalDeliveredOrders ? totalDeliveredOrders : 0}
          </p>
          <p className="text-xs text-muted-foreground">+19% from last month</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Overview
