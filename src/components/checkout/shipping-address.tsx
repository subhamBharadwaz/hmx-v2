"use client"

import { FC, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useStore } from "@/store"
import autoAnimate from "@formkit/auto-animate"

import ShippingAddressForm from "./shipping-address-form"

interface ShippingAddressProps {}

const ShippingAddress: FC<ShippingAddressProps> = ({}) => {
  const { address, setAddress, removeAddress } = useStore()
  

  const [show, setShow] = useState(false)
  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  useEffect(()=> {
    setAddress(address)
  },[address, setAddress])

  const reveal = () => setShow(!show)

  const { toast } = useToast()

  return (
    <div className="container space-y-7" ref={parent}>
      <h3 className="text-lg font-semibold text-foreground">
        Shipping Address
      </h3>

      {address ? (
        <Card>
          <CardHeader>
            <CardTitle>{`${address?.firstName} ${address?.lastName}`}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{address?.houseNo}</p>
            <p>
              {address?.streetName}, {address?.landMark}
            </p>
            <p>
              {address?.city} {address?.postalCode}
            </p>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <p className="text-xs text-slate-400 dark:text-slate-600">
              default address
            </p>

            <div className="flex gap-x-5">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setAddress(null);
                  removeAddress()
                }}
              >
                Remove
              </Button>
              <Button size="sm" onClick={reveal}>
                Edit
              </Button>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <ShippingAddressForm />
      )}

      {show && <ShippingAddressForm />}
    </div>
  )
}

export default ShippingAddress
