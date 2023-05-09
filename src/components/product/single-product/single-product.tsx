"use client"

import { FC, useState } from "react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { IProduct } from "@/types"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import SingleProductImageSwiper from "./swiper"

interface SingleProductProps {
  id: string
}

const allSizes = ["S", "M", "L", "XL", "XXL"]

const SingleProduct: FC<SingleProductProps> = ({ id }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: [`products/${id}`],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/${id}`)
        .then((res) => res.data.products)
        .catch((err) => console.log(err)),
  })

  const {
    name,
    photos,
    size,
    price,
    description,
    detail,
    gender,
    category,
    stock,
    ratings,
    reviews,
  } = data as IProduct
  return (
    <div className="">
      {isLoading ? (
        <span>loading</span>
      ) : (
        <div className="">
          <div className="md:hidden">
            <SingleProductImageSwiper
              photos={photos && photos}
              productName={name && name}
            />
          </div>
          <div className="container w-full space-y-5">
            <div className="flex items-center gap-x-5">
              <h3 className="text-xl font-semibold text-foreground">
                {name && name}
              </h3>
              <p className="text-slate-600">{category && category}</p>
            </div>

            <div className="spacing-y-3 ">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-700 lg:text-lg">Select Size</p>
                <button className={cn(buttonVariants({ variant: "link" }))}>
                  Size Chart
                </button>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-slate-500">Waist</p>
                <div className="flex flex-wrap items-center space-x-4">
                  {allSizes?.map((value) => (
                    <span
                      key={value}
                      className={cn(
                        "inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-700 text-sm font-bold",
                        size?.some((s) => s === value)
                          ? ""
                          : "cursor-not-allowed opacity-30",
                        selectedSize === value && "bg-slate-900 text-slate-100"
                      )}
                      onClick={() => setSelectedSize(value)}
                      style={
                        !size?.some((s) => s === value)
                          ? { pointerEvents: "none", cursor: "not-allowed" }
                          : {}
                      }
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="#"
              className={cn(buttonVariants({ size: "lg" }), "w-full")}
            >
              Add to Bag
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default SingleProduct
