"use client"

import { FC } from "react"
import { useRouter } from "next/navigation"
import { Icons } from "@/components/icons"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { IWishlist } from "@/types"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSession } from "next-auth/react"

import WishListCard from "./wishlist-card"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/button"

interface WishListProps {
  accessToken: string | undefined
}

export const WishList: FC<WishListProps> = ({ accessToken }) => {
  const { data: session } = useSession()
  const router = useRouter()

  const { data: wishlist, isLoading } = useQuery<IWishlist[]>({
    queryKey: ["wishlist"],
    queryFn: async () => {
      if (accessToken) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/wishlist`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        return await res?.data.products
      }
    },
  })

  const wishlistTriggerHandler = () => {
    if (!session?.user) {
      router.push("/login")
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button onClick={wishlistTriggerHandler}>
          <Icons.favorite />
        </button>
      </SheetTrigger>
      {session?.user && (
        <SheetContent
          position="right"
          size="content"
          className="scrollbar-hide relative w-full max-w-[650px] overflow-scroll"
        >
          <SheetHeader className="mb-10">
            <SheetTitle>WishList</SheetTitle>
          </SheetHeader>
          {wishlist &&  wishlist?.length !== 0 ? (
            wishlist?.map((product) => (
              <WishListCard
                key={product?.productId}
                product={product}
                accessToken={accessToken}
              />
            ))
           ) : (
            <div className="flex h-[20rem] w-full flex-col items-center justify-center gap-y-10 ">
              <p className="text-xl text-slate-500 md:text-2xl">Your wishlist is empty!</p>
              <p className="text-xl text-slate-400 md:text-2xl">Explore more and shortlist some items</p>
              <Link href='/products' className={cn(buttonVariants({size: 'lg'}), 'mx-auto')}>continue shopping</Link>
            </div>
           )
          }

          <SheetFooter className="my-10 align-bottom">
            <div className="w-full space-y-5">
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
