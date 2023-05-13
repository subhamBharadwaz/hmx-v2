"use client"

import { FC } from "react"
import Image from "next/image"
import Link from "next/link"

import { useRemoveWishlistItemMutation } from "@/store/services/wishlist"

import { Icons } from "./icons"



interface WishListCardProps {
  product: {
    productId: string
    name: string
    price: number
    photos: {
      id: string
      secure_url: string
    }[]
    size: string[]
    category: string
  }
}

const WishListCard: FC<WishListCardProps> = ({ product }) => {
  const [removeWishlistItem, { isLoading  }] = useRemoveWishlistItemMutation()


  const handleRemoveWishlistItem = async(id: string)=>{
    await removeWishlistItem(id)
  }

  return (
    <div className="my-5 flex w-full justify-between gap-x-10 border-b border-slate-200 pb-3 dark:border-slate-700 lg:w-11/12">
      <div className="flex gap-x-5 lg:w-2/3">
          <Link href={`/products/${product?.productId}`}className="relative h-20 w-1/2">
            <Image
              src={product?.photos[0]?.secure_url}
              alt={product?.name}
              fill
              sizes="(max-width: 1280px) 50%"
              className="object-cover"
            />
          </Link>
        <div className="space-y-2">
          <p className="text-sm">
            <Link href={`/products/${product?.productId}`}>
              {product?.name}
            </Link>
          </p>
          <p className="text-sm">Rs. {product?.price}</p>
        </div>
      </div>
      <Icons.trash className="cursor-pointer" onClick={()=> handleRemoveWishlistItem(product?.productId)} />
    </div>
  )
}

export default WishListCard
