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

import AddressForm from "./address-form"

interface AddressProps {}

const Address: FC<AddressProps> = ({}) => {
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
    <div className="space-y-7 lg:max-w-2xl" ref={parent}>
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
        <div className="space-y-3">
            <p className="text-slate-300 dark:text-slate-500 lg:text-lg">You have&apos;t added any address yet! Please add an address.</p>
            <AddressForm />
        </div>
      )}

      {show && <AddressForm />}
    </div>
  )
}

export default Address
