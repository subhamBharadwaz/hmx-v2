'use client'

import { FC } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { IProduct } from "@/types"
import axios from "axios"

interface TopSellingProductsProps {

}

const TopSellingProducts: FC<TopSellingProductsProps> = () => {
  
  const { data: products } = useQuery<IProduct[]>({
    queryKey: ["top-selling-products"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/top-selling`,
      )
      return await res?.data.products
    },
  })
  return (
    <Card className="w-full grow rounded-lg border border-slate-100 p-5 shadow-lg shadow-slate-100 dark:border-slate-800 dark:shadow-none  md:w-5/12">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Top Selling Products</CardTitle>
        <Link href="#" className={cn(buttonVariants({ variant: "link" }))}>
          See all
        </Link>
      </CardHeader>
      <CardContent className="space-y-5">
       {products && (
        products?.slice(0,5).map(product=>(
          <div key={product?._id} className="flex items-center justify-between gap-y-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={product?.photos[0]?.secure_url} />
              <AvatarFallback>{product?.name}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">
                {product?.name}
              </p>
              <p className="text-sm text-muted-foreground">{product?.category}</p>
            </div>
          </div>
          <p>Rs. {product?.price}</p>
        </div>
        ))
       )}
      </CardContent>
    </Card>
  )
}

export default TopSellingProducts
