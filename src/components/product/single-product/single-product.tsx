"use client"

import { FC, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { RootState } from "@/store"
import {
  useCreateWishlistItemMutation,
  useRemoveWishlistItemMutation,
} from "@/store/services/wishlist"
import { IProduct } from "@/types"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSelector } from "react-redux"

import ProductInfoAccordion from "./product-info-accordion"
import Reviews from "./reviews"
import SingleProductImageSwiper from "./swiper"

interface SingleProductProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
}

const allSizes = ["S", "M", "L", "XL", "XXL"]

const SingleProduct: FC<SingleProductProps> = ({ id }) => {
  const { wishlist } = useSelector((state: RootState) => state.wishlist)
  const { user } = useSelector((state: RootState) => state.auth)

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [isAlreadyAddedToWishlist, setIsAlreadyAddedToWishlist] =
    useState<boolean>(false)

  useEffect(() => {
    if (wishlist) {
      if (wishlist?.products?.find((product) => product.productId === id)) {
        setIsAlreadyAddedToWishlist(true)
        console.log("there")
      }
      console.log("there outside")
    }
  }, [id, wishlist])

  const [createWishlistItem, { isLoading: RTKCreateLoading }] =
    useCreateWishlistItemMutation()

  const [removeWishlistItem,{ isLoading: RTKDeleteLoading }] = useRemoveWishlistItemMutation()

  const { data, isLoading } = useQuery({
    queryKey: [`products/${id}`],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/${id}`)
        .then((res) => res.data.products)
        .catch((err) => console.log(err)),
  })

  const router = useRouter()

  const handleCreateWishlistItem = async (id: string) => {
    await createWishlistItem({ productId: id })
  }

  const handleRemoveWishlistItem = async (id: string) => {
    await removeWishlistItem(id)
    setIsAlreadyAddedToWishlist(false)
  }

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
    numberOfReviews,
  } = data as IProduct
  return (
    <div className="">
      {isLoading ? (
        <span>loading</span>
      ) : (
        <>
            <div className="md:hidden">
              <SingleProductImageSwiper
                photos={photos && photos}
                productName={name && name}
              />
            </div>
          <div className="container-lg gap-x-5  md:flex">
            <div className="hidden w-1/2 grid-cols-2 gap-1 md:grid lg:w-3/5">
              {photos?.map((photo) => (
                <Image
                  key={photo?.id}
                  src={photo?.secure_url}
                  alt={name && name}
                  width={400}
                  height={500}
                  className="object-cover xl:h-[600px] xl:w-[600px]"
                />
              ))}
            </div>
            <div className="space-y-5 md:w-2/5 lg:w-2/5 ">
              <div className="flex justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-foreground">
                    {name && name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {category && category}
                  </p>
                </div>

                <Icons.favorite
                  onClick={() =>
                    user
                      ? isAlreadyAddedToWishlist
                        ? handleRemoveWishlistItem(id)
                        : handleCreateWishlistItem(id)
                      : router.push("/login")
                  }
                  className={cn(
                    "cursor-pointer transition duration-300 ease-in-out",
                    isAlreadyAddedToWishlist && "fill-current",
                    (RTKCreateLoading || RTKDeleteLoading) && 'opacity-50'
                  )}
                />
              </div>

              <div className="spacing-y-3 ">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-700 dark:text-slate-300 lg:text-lg">
                    Select Size
                  </p>
                  <button className={cn(buttonVariants({ variant: "link" }))}>
                    Size Chart
                  </button>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Waist
                  </p>
                  <div className="flex flex-wrap items-center space-x-4">
                    {allSizes?.map((value) => (
                      <span
                        key={value}
                        className={cn(
                          "inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-700 text-sm font-bold",
                          size?.some((s) => s === value)
                            ? ""
                            : "cursor-not-allowed opacity-30",
                          selectedSize === value &&
                            "bg-slate-900 text-slate-100 ring ring-slate-700 ring-offset-2 dark:bg-slate-100 dark:text-slate-900 dark:ring-slate-700"
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

              <ProductInfoAccordion
                details={detail && detail}
                description={description && description}
              />
            </div>
          </div>

          <div className="container-lg my-10">
            <div className="space-y-3">
              <h2 className="text-center text-xl font-bold text-foreground lg:text-3xl">
                ”Very comfortable. These are one of a kind, great mix of formal
                and casual.”
              </h2>
              <p className="text-center text-sm font-semibold text-slate-400 lg:text-lg">
                {" "}
                - by Larry S.
              </p>
            </div>
            <Reviews
              reviews={reviews && reviews}
              ratings={ratings && ratings}
              numberOfReviews={numberOfReviews && numberOfReviews}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default SingleProduct
