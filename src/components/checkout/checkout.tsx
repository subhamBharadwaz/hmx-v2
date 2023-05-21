"use client"

import { FC } from "react"
import dynamic from "next/dynamic"
import Script from "next/script"
import { useStore } from "@/store"
import { IBag, IOrder } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { Button } from "../ui/button"
import OrderSummary from "./order-summary"

const Address = dynamic(
  () => import("@/components/address"),
  {
    ssr: false,
  }
)

interface CheckoutProps {
  accessToken: string | undefined
}

async function getRazorPayKey(token: string | undefined) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/razorpaykey`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return res?.data?.razorpayApiKey
  } catch (error) {
    console.error(error)
  }
}

//    const item

const Checkout: FC<CheckoutProps> = ({ accessToken }) => {
  const { address } = useStore()

  const { data: bag, isLoading } = useQuery<IBag>({
    queryKey: ["bag"],
    queryFn: async () => {
      if (accessToken) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/bag`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        return res?.data
      }
    },
  })

  const items = bag?.products?.map((product) => {
    return {
      name: product?.name,
      size: product?.size,
      quantity: product?.quantity,
      image: product?.photos[0]?.secure_url,
      price: product?.price,
      product: product?.productId,
    }
  })

  const orderDetails: IOrder = {
    shippingInfo: {
      firstName: address?.firstName!,
      lastName: address?.lastName!,
      houseNo: address?.houseNo!,
      streetName: address?.streetName!,
      landMark: address?.landMark!,
      postalCode: address?.postalCode!,
      city: address?.city!,
      country: address?.country!,
      state: address?.state!,
      phoneNumber: address?.phoneNumber!,
    },
    orderItems: items!!,
    paymentInfo: {
      id: "testId",
    },
    taxAmount: 0,
    shippingAmount: 0,
    totalAmount: bag?.totalPrice!!,
  }

  const queryClient = useQueryClient()

  const createOrderMutation = useMutation({
    mutationFn: async (data: IOrder) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/order/create`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      return res?.data
    },
    onSuccess: (data) => {
      queryClient.setQueriesData<IBag>(["order"], data)
    },
  })

  const emptyBagMutation = useMutation({
    mutationFn: async (id: string | undefined) => {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/bag/emptybag/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      return res?.data
    },
    onSuccess: (data) => {
      queryClient.setQueriesData<IBag>(["bag"], data)
    },
  })

  // Making the payment
  const makePayment = async () => {
    const key = await getRazorPayKey(accessToken)

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/capturerazorpaypayment`,
        { amount: bag?.totalPrice },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      )
      const convertResponse = await res.data

      const { order } = convertResponse
      const options = {
        key,
        amount: bag?.totalPrice,
        currency: "INR",
        name: "HMX",
        order_id: order?.id.toString(),
        callback_url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/payment/verification`,
        handler: function (response: any) {
          axios
            .post(
              `${process.env.NEXT_PUBLIC_API_URL}/api/v1/payment/verification`,
              response,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
              }
            )
            .then((res) => {
              createOrderMutation.mutate(orderDetails)
              emptyBagMutation.mutate(bag?._id)
            })
            .catch((error) => {
              console.error(error)
            })
        },

        theme: {
          color: "#3399cc",
        },
      }
      const razorpay = new (window as any).Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="mb-10 flex w-full flex-col items-center justify-between space-y-10 lg:flex-row-reverse">
        <OrderSummary bag={bag} />
        <div className="space-y-10 lg:min-h-screen lg:w-1/2">
          <div className="container space-y-7">
          <h3 className="text-lg font-semibold text-foreground">
        Shipping Address
      </h3>
          <Address />
          </div>
          <div className="container">
            <Button
              disabled={!address || !bag?.products}
              className="w-full"
              size="lg"
              onClick={() => makePayment()}
            >
              Continue to Payment
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
