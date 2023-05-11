"use client"

import { FC } from "react"
import { IProduct } from "@/types"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import ProductCard from "../product-card"
interface ProductSectionProps {
  section: string
}

const ProductSection: FC<ProductSectionProps> = ({section}) => {
  const { data, isLoading } = useQuery({
    queryKey: [`products-${section}`],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products?gender=${section}`)
        .then((res) => res.data.products)
        .catch((err) => console.log(err)),
  })

  return (
    <div className="">
      {isLoading ? (
        <span>loading</span>
      ) : (
        <div className="mx-auto grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {(data as IProduct[])?.map((product) => (
            <ProductCard product={product} isLoading={isLoading} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductSection
