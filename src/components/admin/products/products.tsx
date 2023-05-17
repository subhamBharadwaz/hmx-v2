"use client"

import { FC } from "react"
import { columns } from "@/components/admin/products/columns"
import { DataTable } from "@/components/admin/products/data-table"
import { IAdminProducts, IProduct } from "@/types"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface ProductsProps {
  accessKey: string | undefined
}

const Products: FC<ProductsProps> = ({ accessKey }) => {
  const { data, isLoading } = useQuery<IAdminProducts>({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/products`,
        {
          headers: {
            Authorization: `Bearer ${accessKey}`,
          },
        }
      )
      return await res?.data
    },
  })

  console.log({ data })

  return (
    <div className="w-full">
      {data && <DataTable columns={columns} data={data?.products} />}
    </div>
  )
}

export default Products
