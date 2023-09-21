"use client"

import { FC } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Script from "next/script"
import { useStore } from "@/store"
import { IBag, IOrder } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { ChevronDown, ChevronUp, ShoppingBag } from "lucide-react"

import { Button } from "../ui/button"
import OrderSummary from "./order-summary"

const Address = dynamic(() => import("@/components/address"), {
  ssr: false,
})

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
      <div className="flex w-full flex-col items-center justify-between space-y-10 lg:flex-row-reverse">
        <OrderSummary className="lg:hidden" bag={bag} />
        <div className="hidden min-h-screen w-1/2 lg:block">
          {!bag ? (
            <div className="container space-y-2 lg:space-y-5">
              <p className="text-xl text-foreground md:text-2xl">
                You don&apos;t have any items in bag!
              </p>
              <Button>Continue Shopping</Button>
            </div>
          ) : (
            <div className="bg-slate-50 text-foreground  dark:bg-slate-800">
              <p className="container flex w-full items-center justify-between py-5 ">
                <span className="flex items-center gap-x-2">
                  <ShoppingBag className="h-5 w-5 text-foreground" />
                  <span>order summary</span>
                </span>
                <span className="font-semibold">Rs. {bag?.totalPrice}</span>
              </p>
              <div className="space-y-10 py-5 dark:bg-slate-700">
                <div className="container space-y-5">
                  {bag &&
                    bag?.products?.map((product) => (
                      <div
                        key={product?.productId}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-x-3">
                          <Image
                            src={product?.photos[0]?.secure_url}
                            alt={product?.name}
                            height={750}
                            width={75}
                            className="rounded-lg border border-slate-300"
                          />
                          <div>
                            <p className="text-lg font-semibold text-foreground">
                              {product?.name}
                            </p>
                            <p className="text-sm  text-foreground">
                              Size: {product?.size}
                            </p>
                            <p className="text-sm  text-foreground">
                              Quantity: {product?.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-foreground">
                          Rs. {product?.price}
                        </p>
                      </div>
                    ))}
                </div>

                <div className="container  space-y-3">
                  <p className="flex items-center justify-between text-sm text-foreground">
                    <span>Subtotal</span>{" "}
                    <span className="font-semibold">Rs. {bag?.totalPrice}</span>
                  </p>
                  <p className="flex items-center justify-between text-sm text-foreground">
                    <span>Shipping</span> <span>Rs. 0</span>
                  </p>
                  <p className="flex items-center justify-between text-lg font-bold text-foreground">
                    <span>Total</span> <span>Rs. {bag?.totalPrice}</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
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
              className="w-full max-w-2xl"
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
