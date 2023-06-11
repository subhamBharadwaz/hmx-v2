'use client'

import { IOrder } from '@/types'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FC } from 'react'
import ProductsCard from './products-card'
import ShippingDetails from './shipping-details'
import PaymentSummary from './payment-summary'


interface OrderProps {
  accessToken: string | undefined
  orderId: string
}

const Order: FC<OrderProps> = ({accessToken, orderId}) => {
    const { data:order, isLoading } = useQuery<IOrder>({
        queryKey: ["order", orderId],
        queryFn: async() => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/order/${orderId}`, {
                  headers: {
                      'Authorization': `Bearer ${accessToken}`
                  }
                }
              )
              return res?.data?.order
        }        
      })

  return (
    <>
        {order && (
            <div className='justify-between gap-x-10  space-y-10 md:flex md:space-y-0'>
            <ProductsCard orderId={order?._id} products={order?.orderItems} createdDate={order?.createdAt} />
            <div className='w-full space-y-10 md:w-1/3'>
                <ShippingDetails shippingInfo={order?.shippingInfo} />
                <PaymentSummary shippingAmount={order?.shippingAmount} taxAmount={order?.taxAmount} totalAmount={order?.totalAmount} />
            </div>
            </div>
        )}
       
    </>
  )
}

export default Order