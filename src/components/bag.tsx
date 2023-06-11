"use client"

import { FC } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Icons } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"
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
import Link from "next/link"
import { cn } from "@/lib/utils"

interface BagProps {
  accessToken: string | undefined
  navTransparent? : boolean
}

export const Bag: FC<BagProps> = ({ accessToken, navTransparent }) => {
  const { data: session } = useSession()
  const router = useRouter()

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

  const bagTriggerHandler = () => {
    if (!session?.user) {
      router.push("/login")
    }
  }

  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button onClick={bagTriggerHandler} variant='link' size='sm'>
          <Icons.bag className={cn(pathname === '/' && navTransparent ? 'text-white' : 'text-foreground')} />
        </Button>
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

          {bag ? (
            
            bag?.products?.map((product) => (
              <BagCard
                key={product?.productId}
                product={product}
                accessToken={accessToken}
              />
            ))
          ) : (
            <div className="flex h-[20rem] w-full flex-col items-center justify-center gap-y-10 ">
            <p className="text-xl text-slate-500 md:text-2xl">Your bag is empty!</p>
            <p className="text-xl text-slate-400 md:text-2xl">Explore more and shortlist some items</p>
            <Link href='/products' className={cn(buttonVariants({size: 'lg'}), 'mx-auto')}>continue shopping</Link>
          </div>
          )}

          <SheetFooter className="my-10 align-bottom">
            <div className="w-full space-y-5">
             {bag && (
              <>
               <div className="flex w-full justify-between border-b border-foreground pb-1">
               <p className="font-semibold text-foreground">Subtotal</p>
               <p className="font-semibold text-foreground">
                 Rs. {bag?.totalPrice}
               </p>
             </div>
             <Link href='/checkout' className={cn(buttonVariants({size:'lg'}), 'w-full')}>
               Checkout
             </Link>
             </>
             )}
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
