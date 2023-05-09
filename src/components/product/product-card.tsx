import React, { FC } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { IProduct } from "@/types"

interface ProductCardProps {
  product: IProduct
  isLoading: boolean
}

const ProductCard: FC<ProductCardProps> = ({ product, isLoading }) => {
  return (
    <Link href={`/products/${product._id}`}>
      <div className="mx-auto w-full md:min-w-[300px]  xl:max-w-[500px]">
        <div className="relative h-96 w-full bg-gray-200 md:h-[30rem]">
          <Image
            src={product?.photos[0]?.secure_url}
            alt={product?.name}
            className="object-cover transition duration-500 ease-in-out hover:scale-110 hover:opacity-0"
            fill
          />
           <Image
            src={product?.photos[1]?.secure_url}
            alt={product?.name}
            className="absolute left-0 top-0 h-auto w-full object-cover opacity-0 transition duration-500 ease-in-out hover:opacity-100"
            fill
          />
        </div>
        <div className="mt-3 flex w-full  justify-between">
          <div>
            <h4 className="text-lg font-semibold text-slate-700 lg:text-xl ">
              {product?.name}
            </h4>
            <h5 className="lg:text-md text-sm text-slate-500">{product?.category}</h5>
          </div>
          <h5 className="lg:text-md text-sm font-semibold text-slate-700">
            Rs. {product?.price}
          </h5>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
