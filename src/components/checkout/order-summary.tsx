"use client"

import { FC, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { IBag } from "@/types"
import autoAnimate from "@formkit/auto-animate"
import { ChevronDown, ChevronUp, ShoppingBag } from "lucide-react"

import { Button } from "../ui/button"

interface OrderSummaryProps {
  bag: IBag | undefined
}

const OrderSummary: FC<OrderSummaryProps> = ({ bag }) => {
  const [show, setShow] = useState<boolean>(false)
  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  const reveal = () => setShow(!show)

  return (
    <div className="w-full lg:min-h-screen lg:w-1/2">
      {!bag ? (
        <div className="container space-y-2 lg:space-y-5">
          <p className="text-xl text-foreground md:text-2xl">
            You don&apos;t have any items in bag!
          </p>
          <Button>Continue Shopping</Button>
        </div>
      ) : (
        <div
          className="cursor-pointer  bg-slate-50 text-foreground  dark:bg-slate-800"
          ref={parent}
          onClick={reveal}
        >
          <p className="container flex w-full items-center justify-between py-5 ">
            <span className="flex items-center gap-x-2">
              {" "}
              <ShoppingBag className="h-5 w-5 text-foreground" />{" "}
              <span>{!show ? "Show" : "Hide"} order summary</span>{" "}
              {show ? (
                <ChevronUp className="h-5 w-5 text-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-foreground" />
              )}{" "}
            </span>
            <span className="font-semibold">Rs. {bag?.totalPrice}</span>
          </p>
          {show && (
            <div className="space-y-10 bg-slate-100 py-5 dark:bg-slate-700">
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
          )}
        </div>
      )}
    </div>
  )
}

export default OrderSummary
