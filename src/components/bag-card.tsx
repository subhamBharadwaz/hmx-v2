"use client"

import { FC, useState } from "react"
import Image from "next/image"

import Image1 from "../../public/images/hero1.webp"
import axios from "axios"
import { CreateBagInput } from "@/lib/validations/bag"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { IBag } from "@/types"

interface BagCardProps {
  product: {
    productId: string
    quantity: number
    name: string
    size: string
    price: number
    photos: {
      id: string
      secure_url: string
    }[]
  },
  accessToken: string | undefined
}

const BagCard: FC<BagCardProps> = ({ product,accessToken }) => {
  const [quantity, setQuantity] = useState<number>(product?.quantity)
  const queryClient = useQueryClient()


  const updateProductQuantityMutation = useMutation({
    mutationFn:  async (data: CreateBagInput) => {
    
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/bag`,data,
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




  const handleIncreaseQuantity = ()=>{
   const newQuantity = quantity + 1;
   setQuantity(newQuantity)
    updateProductQuantityMutation.mutate({productId: product?.productId, size: product?.size, quantity: newQuantity})
  }

  const handleDecreaseQuantity = ()=>{
    const newQuantity = quantity - 1;
    if(newQuantity === 0){
      deleteProductToWishlistMutation.mutate(product?.productId)
    } else {
      setQuantity(newQuantity)
      updateProductQuantityMutation.mutate({productId: product?.productId, size: product?.size, quantity: newQuantity})
    }
   
   }

 

   const deleteProductFromBagHandler = async (productId: string) => {
    if (accessToken) {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/bag/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      return res?.data
    }
  }
  const deleteProductToWishlistMutation = useMutation({
    mutationFn: deleteProductFromBagHandler,
    onSuccess: (data) => {
      queryClient.setQueriesData(["bag"], data)
    },
  })



  return (
    <div className="my-5 flex w-full justify-between gap-x-10 border-b border-slate-200 pb-3 dark:border-slate-700 lg:w-11/12">
      <div className="flex gap-x-5 lg:w-2/3">
        <div className="relative h-20 w-1/2 ">
          <Image
            src={product?.photos[0]?.secure_url}
            alt="image"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 91.666667%"
          />
        </div>
        <div className="flex flex-col justify-between gap-y-2">
          <div className="space-y-2">
            <p className="text-sm">{product?.name}</p>
            <p className="text-sm text-slate-400 dark:text-slate-300">
              SIZE: {product?.size}
            </p>
          </div>
          <div className="flex items-center gap-x-4">
            <button onClick={handleDecreaseQuantity} className="">
              -
            </button>
            <span>{quantity}</span>
            <button onClick={handleIncreaseQuantity} className="">
              +
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <p className="text-sm">Rs. {product?.price}</p>
        <p
          className="w-fit cursor-pointer border-b border-slate-400 pb-1 text-xs text-slate-400"
          onClick={() => deleteProductToWishlistMutation.mutate(product?.productId)}
        >
          Remove
        </p>
      </div>
    </div>
  )
}

export default BagCard
