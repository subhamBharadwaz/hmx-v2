'use client'

import { FC } from 'react'
import { IOrder } from '@/types'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

interface OrderItemCardProps {
  orderId: string | undefined
  products: {
    _id?: string;
    name: string;
    size: string;
    quantity: number;
    image: string;
    price: number;
    product: string;
  }[]
}

const OrderItemCard: FC<OrderItemCardProps> = ({orderId,products}) => {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Order #{orderId}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        {products?.map(product=>(
          <div key={product?._id} className='flex items-center justify-between'>
            <div className='flex items-center gap-x-3 lg:gap-x-5'>
              <div className='relative h-36 w-28 overflow-hidden rounded-md border border-slate-200 dark:border-slate-700 md:h-40 md:w-36 lg:h-52 lg:w-48'>
            <Image src={product?.image} alt={product?.name} fill className='object-cover' />
            </div>
            <div className='space-y-2'>
           
            <h3 className='font-semibold md:text-lg lg:text-xl'>{product?.name}</h3>
             <p className='md:text-md text-sm lg:text-lg'>Size: {product?.size}</p>
             <p className='md:text-md text-sm lg:text-lg'>Quantity: {product?.quantity}</p>
            </div>
          </div>
            <p className='font-semibold md:text-lg lg:text-xl'>Rs. {product?.price}</p>
          </div>
        ))}
      </CardContent>
      <CardFooter className='flex justify-end'>
          <Link href={`/account/orders/${orderId}`} className={cn(buttonVariants())}>View Order</Link>
      </CardFooter>
    </Card>
  )
}

export default OrderItemCard