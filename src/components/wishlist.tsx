"use client"

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
import { AppDispatch } from "@/store"
import { selectCurrentToken } from "@/store/features/auth/auth-slice"
import { useGetWishlistQuery } from "@/store/services/wishlist"
import { IWishlist } from "@/types"
import { useDispatch, useSelector } from "react-redux"

import WishListCard from "./wishlist-card"
import { useEffect } from "react"
import { getWishlist } from "@/store/features/wishlist/wishlist-slice"

export function WishList() {
  const dispatch = useDispatch<AppDispatch>()

  const token = useSelector(selectCurrentToken)

  const { data, isSuccess,isLoading } = useGetWishlistQuery({})
  const wishlist: IWishlist = data
  
  useEffect(()=>{
    if(data){
      dispatch(getWishlist(data))
    }
  },[data, dispatch])


  const router = useRouter()

  const wishlistTriggerHandler = () => {
    if (!token) {
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
      <SheetContent
        position="right"
        size="content"
        className="scrollbar-hide w-full max-w-[650px] overflow-scroll"
      >
        <SheetHeader className="mb-10">
          <SheetTitle>WishList</SheetTitle>
        </SheetHeader>
        {isSuccess &&
          wishlist?.products?.map((product) => (
            <WishListCard key={product?.productId} product={product} />
          ))}
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

                  <p className="text-xs text-slate-800">200+ Client Reviews</p>
                </div>
              </div>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
