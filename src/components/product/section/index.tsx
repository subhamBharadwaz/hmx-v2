"use client"

import { FC, useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import getQueryClient from "@/lib/getQueryClient"
import { IProducts } from "@/types"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useInView } from "react-intersection-observer"

import { FilterProducts } from "../filter"
import ProductCard from "../product-card"

interface ProductSectionProps {
  section: string
}

const ProductSection: FC<ProductSectionProps> = ({ section }) => {
  const { ref, inView } = useInView()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSections, setSelectedSections] = useState<string[]>([section])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])

  const queryClient = getQueryClient()

  const fetchProducts = async (section: string, page: number) => {
    const params = new URLSearchParams()
    params.append("page", page.toString())
    params.append("category", selectedCategories.join(","))
    params.append("gender", selectedSections.join(","))
    params.append("size", selectedSizes.join(","))
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products?${params.toString()}`
    )
    return await res?.data
  }

  const { data, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery<IProducts>({
      queryKey: [
        `products-${section}`,
        selectedCategories,
        selectedSections,
        selectedSizes,
      ],
      queryFn: async ({ pageParam = 1 }) => fetchProducts(section, pageParam),
      getNextPageParam: (lastPage) => {
        const { currentPage, pageCount } = lastPage
        if (currentPage < pageCount) {
          return currentPage + 1
        }
        return undefined
      },
      enabled:
        selectedCategories.length > 0 ||
        selectedSections.length > 0 ||
        selectedSizes.length > 0,
    })

  useEffect(() => {
    if (inView) fetchNextPage()
  }, [inView])

  useEffect(() => {
    if (
      selectedCategories.length === 0 &&
      selectedSections.length === 0 &&
      selectedSizes.length === 0
    ) {
      queryClient.refetchQueries([
        `products-${section}`,
        selectedCategories,
        selectedSections,
        selectedSizes,
      ])
    }
  }, [
    queryClient,
    section,
    selectedCategories,
    selectedSections,
    selectedSizes,
  ])

  const products = data?.pages?.flatMap((page) => page?.products)

  const handleCategory = (checked: boolean, value: string) => {
    setSelectedCategories(
      checked
        ? [...selectedCategories, value]
        : selectedCategories.filter((item) => item !== value)
    )
  }

  const handleSections = (checked: boolean, value: string) => {
    setSelectedSections(
      checked
        ? [...selectedSections, value]
        : selectedSections.filter((item) => item !== value)
    )
  }

  const handleSizes = (checked: boolean, value: string) => {
    setSelectedSizes(
      checked
        ? [...selectedSizes, value]
        : selectedSizes.filter((item) => item !== value)
    )
  }

  const handleClearFilters = () => {
    setSelectedCategories([]), setSelectedSections([]), setSelectedSizes([])
    queryClient.refetchQueries(["products"])
  }

  return (
    <>
      <div className="mb-5">
        <FilterProducts
          onCategoryChange={handleCategory}
          onSectionChange={handleSections}
          onSizeChange={handleSizes}
          handleClearFilters={handleClearFilters}
          selectedCategories={selectedCategories}
          selectedSections={selectedSections}
          selectedSizes={selectedSizes}
        />
      </div>
      <div className="mx-auto grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {products &&
          products?.map((product, i) => (
            <ProductCard product={product} key={product?._id} />
          ))}
      </div>
      <div
        ref={ref}
        className="mx-auto mt-5 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
      >
        {isFetchingNextPage &&
          Array.from({ length: 6 }, (_, i) => i + 1).map((id) => (
            <div
              key={id}
              className="mx-auto w-full space-y-3  md:min-w-[300px] xl:max-w-[40rem]"
            >
              <div className="h-96 w-full md:h-[30rem] md:min-w-[300px] xl:h-[35rem] xl:max-w-[40rem] 2xl:h-[40rem]">
                <Skeleton className="h-full w-full bg-slate-400" />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-28 bg-slate-400 xl:w-32" />
                <Skeleton className="h-10 w-28 bg-slate-400 xl:w-32" />
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

export default ProductSection
