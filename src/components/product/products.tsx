"use client"

import { FC, useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { IProducts } from "@/types"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { useInView } from "react-intersection-observer"

import { FilterProducts } from "./filter"
import ProductCard from "./product-card"

const Products: FC = () => {
  const { ref, inView } = useInView()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSections, setSelectedSections] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])

  const fetchProducts = async (page: number) => {
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
      queryKey: ["products"],
      queryFn: async ({ pageParam = 1 }) => fetchProducts(pageParam),
      getNextPageParam: (lastPage) => {
        const { currentPage, pageCount } = lastPage
        if (currentPage < pageCount) {
          return currentPage + 1
        }
        return undefined
      },
    })

  useEffect(() => {
    if (inView) fetchNextPage()
  }, [inView])

  const products = data?.pages?.flatMap((page) => page?.products)

  const handleCategory = (checked: boolean, value: string) => {
    if (checked) {
      setSelectedCategories((prevSelectedCategories) => [
        ...prevSelectedCategories,
        value,
      ])
    } else {
      setSelectedCategories((prevSelectedCategories) =>
        prevSelectedCategories.filter((category) => category !== value)
      )
    }
  }

  const handleSections = (checked: boolean, value: string) => {
    if (checked) {
      setSelectedSections((prevSelectedSections) => [
        ...prevSelectedSections,
        value,
      ])
    } else {
      setSelectedSections((prevSelectedSections) =>
        prevSelectedSections.filter((section) => section !== value)
      )
    }
  }

  const handleSizes = (checked: boolean, value: string) => {
    if (checked) {
      setSelectedSizes((prevSelectedSizes) => [...prevSelectedSizes, value])
    } else {
      setSelectedSizes((prevSelectedSizes) =>
        prevSelectedSizes.filter((size) => size !== value)
      )
    }
  }

  const handleApplyFilters = (
    selectedCategories: string[],
    selectedSections: string[],
    selectedSizes: string[]
  ) => {
    setSelectedCategories(selectedCategories)
    setSelectedSections(selectedSections)
    setSelectedSizes(selectedSizes)
    fetchNextPage({ pageParam: 1 })
  }

  return (
    <>
      <div className="mb-5">
        <FilterProducts
          onApplyFilters={handleApplyFilters}
          onCategoryChange={handleCategory}
          onSectionChange={handleSections}
          onSizeChange={handleSizes}
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

export default Products
