"use client"

import { FC } from "react"
import { useRouter } from "next/navigation"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { IBag } from "@/types"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSession } from "next-auth/react"

import BagCard from "./bag-card"

interface BagProps {
  accessToken: string | undefined
}

export const Bag: FC<BagProps> = ({ accessToken }) => {
  const { data: session } = useSession()
  const router = useRouter()

  const { data, isLoading } = useQuery<IBag>({
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

  const bagTriggerHandler = () => {
    if (!session?.user) {
      router.push("/login")
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button onClick={bagTriggerHandler}>
          <Icons.bag />
        </button>
      </SheetTrigger>
      {session?.user && (
        <SheetContent
          position="right"
          size="content"
          className="scrollbar-hide w-full max-w-[650px] overflow-scroll"
        >
          <SheetHeader className="mb-10">
            <SheetTitle>Bag</SheetTitle>
          </SheetHeader>

          {isLoading ? (
            <p>loading...</p>
          ) : (
            data?.products?.map((product) => (
              <BagCard key={product?.productId} product={product} accessToken={accessToken} />
            ))
          )}

          <SheetFooter className="my-10 align-bottom">
            <div className="w-full space-y-5">
              <div className="flex w-full justify-between border-b border-foreground pb-1">
                <p className="font-semibold text-foreground">Subtotal</p>
                {/* //TODO */}
                {/* <p className="font-semibold text-foreground">Rs. {bag?.totalPrice}</p> */}
              </div>
              <Button type="submit" className="w-full">
                Checkout
              </Button>
              <div className="w-full space-y-10 rounded-md bg-orange-50 p-5">
                <div className="flex items-center justify-between gap-x-5">
                  <p className="font-serif text-lg text-slate-900">VOGUE</p>
                  <p className="text-lg font-bold text-slate-900">Esquire</p>
                  <p className="text-lg font-bold leading-tight text-slate-900">
                    WWD
                  </p>
                </div>
                <div className="flex items-center gap-x-10">
                  <div className="flex items-center gap-x-2">
                    <Icons.shipping className="w-5 text-slate-800" />
                    <p className="text-xs text-slate-800">
                      Free Shipping, Exchanges & Returns
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-x-1">
                      <Icons.solidStar className="h-2 w-2 text-slate-800" />
                      <Icons.solidStar className="h-2 w-2 text-slate-800" />
                      <Icons.solidStar className="h-2 w-2 text-slate-800" />
                      <Icons.solidStar className="h-2 w-2 text-slate-800" />
                      <Icons.solidStar className="h-2 w-2 text-slate-800" />
                    </div>

                    <p className="text-xs text-slate-800">
                      200+ Client Reviews
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SheetFooter>
        </SheetContent>
      )}
    </Sheet>
  )
}
