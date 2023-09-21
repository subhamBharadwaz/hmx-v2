import { FC } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { format } from "date-fns"

interface ProductsCardProps {
  orderId: string | undefined
  createdDate: Date | undefined
  products: {
    _id?: string
    name: string
    size: string
    quantity: number
    image: string
    price: number
    product: string
  }[]
  orderStatus: string | undefined
}

const ProductsCard: FC<ProductsCardProps> = ({
  products,
  orderId,
  orderStatus,
  createdDate,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md items-center justify-between space-y-3 lg:flex lg:space-y-0 lg:text-lg">
          <p>
            Order ID:{" "}
            <span className="font-normal text-slate-500 dark:text-slate-300">
              #{orderId}
            </span>{" "}
          </p>
          <p>
            Date:{" "}
            <span className="font-normal text-slate-500 dark:text-slate-300">
              {format(new Date(createdDate as Date), "dd MMM, yyyy")}
            </span>
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {products?.map((product) => (
          <div
            key={product?._id}
            className="flex items-center gap-x-3 lg:gap-x-5"
          >
            <div className="relative h-36 w-28 overflow-hidden rounded-md border border-slate-200 dark:border-slate-700 md:h-40 md:w-36 lg:h-52 lg:w-48">
              <Image
                src={product?.image}
                alt={product?.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold md:text-lg lg:text-xl">
                {product?.name}
              </h3>
              <p className="md:text-md text-sm lg:text-lg">
                Size: {product?.size}
              </p>
              <p className="md:text-md text-sm lg:text-lg">
                Quantity: {product?.quantity}
              </p>
              <p className="md:text-md text-sm lg:text-lg">
                Rs. {product?.price}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="gap-x-5 lg:pt-24 ">
        <p className="font-semibold md:text-lg lg:text-xl">Order Status:</p>
        <Badge
          variant={
            orderStatus === "Delivered"
              ? "success"
              : orderStatus === "Processing"
              ? "warning"
              : "secondary"
          }
        >
          {orderStatus}
        </Badge>
      </CardFooter>
    </Card>
  )
}

export default ProductsCard
