"use client"

import { FC } from "react"
import Image from "next/image"
import Link from "next/link"
import { IProduct } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { Icons } from "./icons"
import { useStore } from "@/store"

interface Product {
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
interface WishListCardProps {
  product: Product
  accessToken: string | undefined
}

const WishListCard: FC<WishListCardProps> = ({ product, accessToken }) => {
  const queryClient = useQueryClient()
  const {setIsAlreadyAddedToWishlist} = useStore()

  const deleteProductFromWishlistHandler = async (productId: string) => {
    if (accessToken) {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/wishlist/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      return await res?.data.products
    }
  }
  const deleteProductToWishlistMutation = useMutation({
    mutationFn: deleteProductFromWishlistHandler,
    onSuccess: (data) => {
      queryClient.setQueriesData(["wishlist"],data)
      setIsAlreadyAddedToWishlist(false)
    },
  })

  return (
    <div className="my-5 flex w-full justify-between gap-x-10 border-b border-slate-200 pb-3 dark:border-slate-700 lg:w-11/12">
      <div className="flex gap-x-5 lg:w-2/3">
        <Link
          href={`/products/${product?.productId}`}
          className="relative h-20 w-1/2"
        >
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
      <Icons.trash
        className="cursor-pointer"
        onClick={() =>
          deleteProductToWishlistMutation.mutate(product?.productId)
        }
      />
    </div>
  )
}

export default WishListCard
