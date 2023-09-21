import React, { FC } from "react"
import Image from "next/image"
import Link from "next/link"
import { IProduct } from "@/types"

interface ProductCardProps {
  product: IProduct

}
const ProductCard= React.forwardRef<HTMLElement, ProductCardProps>(
  ({ product , ...props}) => {
    return (
       <Link href={`/products/${product._id}`} {...props}>
        <div className="mx-auto w-full md:min-w-[300px]  xl:max-w-[40rem]">
          <div className="relative h-96 w-full overflow-hidden border  border-slate-100 shadow-lg shadow-slate-100/50 dark:border-slate-800 dark:shadow-none md:h-[30rem] xl:h-[35rem] 2xl:h-[40rem]">
            <Image
              src={product?.photos[0]?.secure_url}
              alt={product?.name}
              className="object-cover transition duration-500 ease-in-out hover:scale-110 hover:opacity-0"
              sizes="(max-width: 1280px) 40rem"
              fill
            />
            <Image
              src={product?.photos[1]?.secure_url}
              alt={product?.name}
              className="absolute left-0 top-0 h-auto w-full object-cover opacity-0 transition duration-500 ease-in-out hover:scale-105 hover:opacity-100"
              sizes="(max-width: 1280px) 40rem"
              fill
            />
          </div>
          <div className="mt-3 flex w-full  justify-between">
            <div>
              <h4 className="text-lg font-semibold text-foreground lg:text-xl ">
                {product?.name}
              </h4>
              <h5 className="lg:text-md text-sm text-slate-500 dark:text-slate-300">
                {product?.category}
              </h5>
            </div>
            <h5 className="lg:text-md text-sm font-semibold text-foreground">
              Rs. {product?.price}
            </h5>
          </div>
        </div>
      </Link>
    )
  }
)

ProductCard.displayName = 'ProductCard'

export default ProductCard
