"use client"

import { FC, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Alert from "@/components/alert"
import Container from "@/components/container"
import { Icons } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { CreateBagInput } from "@/lib/validations/bag"
import { useStore } from "@/store"
import { IProduct, IWishlist } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import ProductInfoAccordion from "./product-info-accordion"
import Reviews from "./reviews"
import SingleProductImageSwiper from "./swiper"

interface SingleProductProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  accessToken: string | undefined
}

const allSizes = ["S", "M", "L", "XL", "XXL"]

const SingleProduct: FC<SingleProductProps> = ({ id, accessToken }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const { isAlreadyAddedToWishlist, setIsAlreadyAddedToWishlist } = useStore()
  const [isSizeEmpty, setIsSizeEmpty] = useState<boolean | null>(null)
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data: wishlist } = useQuery<IWishlist[]>({
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
        return res?.data.products
      }
    },
  })

  useEffect(() => {
    if (wishlist?.find((product) => product.productId === id)) {
      setIsAlreadyAddedToWishlist(true)
    }
  }, [id, isAlreadyAddedToWishlist, setIsAlreadyAddedToWishlist, wishlist])

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/${id}`
      )
      return res.data.product
    },
  })

  const addProductToWishlistHandler = async (productId: string) => {
    if (accessToken) {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/wishlist`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      return res?.data.products
    }
  }

  const addProductToWishlistMutation = useMutation({
    mutationFn: addProductToWishlistHandler,
    onSuccess: (data) => {
      queryClient.setQueryData(["wishlist"], data)
      setIsAlreadyAddedToWishlist(true)
    },
  })

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
      return res?.data.products
    }
  }

  const deleteProductToWishlistMutation = useMutation({
    mutationFn: deleteProductFromWishlistHandler,
    onSuccess: (data) => {
      queryClient.setQueryData(["wishlist"], data)
      setIsAlreadyAddedToWishlist(false)
    },
  })

  const addProductToBagHandler = async (data: CreateBagInput) => {
    if (accessToken) {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/bag`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      return res?.data
    }
  }

  const addProductToBagMutation = useMutation({
    mutationFn: addProductToBagHandler,
    onSuccess: (data) => {
      queryClient.setQueriesData(["bag"], data)
      toast({
        description: "Successfully added to bag!",
      })
    },
  })
  const handleSizeSelection = (value: string) => {
    setSelectedSize(value)
    setIsSizeEmpty(false)
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
      <div className="lg:hidden">
        <SingleProductImageSwiper
          photos={photos && photos}
          productName={name && name}
        />
      </div>
      <Container className="gap-x-5 lg:flex">
        <div className="hidden w-1/2 grid-cols-2 gap-1 lg:grid lg:w-3/5 xl:w-3/4">
          {photos?.map((photo) => (
            <Image
              key={photo?.id}
              src={photo?.secure_url}
              alt={name && name}
              width={400}
              height={500}
              className="border border-slate-100 object-cover shadow-lg shadow-slate-100/50  dark:border-slate-800 dark:shadow-none xl:h-[40rem] xl:w-[45rem] 2xl:h-[45rem] 2xl:w-[50rem]"
              onLoadingComplete={(image) => image.classList.remove("opacity-0")}
            />
          ))}
        </div>
        <div className="space-y-5 lg:w-2/5 ">
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
                accessToken
                  ? isAlreadyAddedToWishlist
                    ? deleteProductToWishlistMutation.mutate(id)
                    : addProductToWishlistMutation.mutate(id)
                  : router.push("/login")
              }
              className={cn(
                "cursor-pointer transition duration-300 ease-in-out",
                isAlreadyAddedToWishlist && "fill-current"
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
                    onClick={() => handleSizeSelection(value)}
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
          {isSizeEmpty && (
            <Alert
              variant="destructive"
              title="Please select a size!"
              description="You cannot add an item to bag without selecting the size."
            />
          )}
          <Button
            size="lg"
            className="w-full"
            onClick={() =>
              accessToken
                ? isSizeEmpty || selectedSize === null
                  ? setIsSizeEmpty(true)
                  : addProductToBagMutation.mutate({
                      productId: id,
                      size: selectedSize,
                      quantity: 1,
                    })
                : router.push("/login")
            }
          >
            Add to Bag
          </Button>

          <ProductInfoAccordion
            details={detail && detail}
            description={description && description}
          />
        </div>
      </Container>

      <Container className="my-10">
        <div className="space-y-3">
          <h2 className="text-center text-xl font-bold text-foreground lg:text-3xl">
            ”Very comfortable. These are one of a kind, great mix of formal and
            casual.”
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
      </Container>
    </div>
  )
}

export default SingleProduct
