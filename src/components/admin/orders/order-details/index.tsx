"use client"

import { FC, useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { IOrder } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import PaymentSummary from "./payment-summary"
import ProductsCard from "./products-card"
import ShippingDetails from "./shipping-details"
import { UpdateOrderStatus } from "./update-order-status"

interface OrderProps {
  accessToken: string | undefined
  orderId: string
}

const OrderDetails: FC<OrderProps> = ({ accessToken, orderId }) => {
  const { data: order, isLoading } = useQuery<IOrder>({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      return res?.data?.order
    },
  })

  return (
    <>
      {order && (
        <div className="justify-between gap-x-10  space-y-10 lg:flex lg:space-y-0">
          <div className="w-full space-y-10 lg:w-2/3">
            <ProductsCard
              orderId={order?._id}
              products={order?.orderItems}
              orderStatus={order?.orderStatus}
              createdDate={order?.createdAt}
            />
            <div className="space-y-3">
              <p className="font-semibold md:text-lg lg:text-xl">
                Update Order Status
              </p>
              <UpdateOrderStatus
                accessToken={accessToken}
                orderId={orderId}
                orderStatus={order?.orderStatus}
              />
            </div>
          </div>

          <div className="w-full space-y-10 lg:w-1/3">
            <ShippingDetails shippingInfo={order?.shippingInfo} />
            <PaymentSummary
              shippingAmount={order?.shippingAmount}
              taxAmount={order?.taxAmount}
              totalAmount={order?.totalAmount}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default OrderDetails
