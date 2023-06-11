import { FC } from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image from 'next/image'
import { format } from 'date-fns'


interface ProductsCardProps {
    orderId: string | undefined
    createdDate: Date | undefined
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

const ProductsCard: FC<ProductsCardProps> = ({products,orderId,createdDate}) => {
  return (
    <Card className='w-full md:w-2/3'>
    <CardHeader>
      <CardTitle className='text-md items-center justify-between space-y-3 md:flex md:space-y-0 md:text-lg'>
        <p>Order ID: <span className='font-normal text-slate-500 dark:text-slate-300'>#{orderId}</span> </p>
        <p>Date: <span className='font-normal text-slate-500 dark:text-slate-300'>{format(new Date(createdDate as Date), 'dd MMM, yyyy')}</span></p>
      </CardTitle>
    </CardHeader>
    <CardContent className='space-y-3'>
      {products?.map(product=>(
          <div key={product?._id} className='flex items-center gap-x-3 lg:gap-x-5'>
            <div className='relative h-36 w-28 overflow-hidden rounded-md border border-slate-200 dark:border-slate-700 md:h-40 md:w-36 lg:h-52 lg:w-48'>
          <Image src={product?.image} alt={product?.name} fill className='object-cover' />
          </div>
          <div className='space-y-2'>
         
          <h3 className='font-semibold md:text-lg lg:text-xl'>{product?.name}</h3>
           <p className='md:text-md text-sm lg:text-lg'>Size: {product?.size}</p>
           <p className='md:text-md text-sm lg:text-lg'>Quantity: {product?.quantity}</p>
           <p className='md:text-md text-sm lg:text-lg'>Rs. {product?.price}</p>
          </div>
        </div>
      ))}
    </CardContent>
    <CardFooter className='flex justify-end'>
        
    </CardFooter>
  </Card>
  )
}

export default ProductsCard