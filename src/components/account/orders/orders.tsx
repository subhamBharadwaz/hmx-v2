'use client'

import { IOrder } from '@/types'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FC } from 'react'
import OrderItemCard from './order-item-card'

interface OrdersProps {
  accessToken: string | undefined
}

const Orders: FC<OrdersProps> = ({accessToken}) => {
    const { data:orders, isLoading } = useQuery<IOrder[]>({
        queryKey: ["orders"],
        queryFn: async() => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/myorder`, {
                  headers: {
                      'Authorization': `Bearer ${accessToken}`
                  }
                }
              )
              return res?.data?.orders
        }        
      })

  return (
    <div className='space-y-5'>
        {orders && orders?.map(order=>(
           <OrderItemCard key={order?._id} orderId={order?._id} products={order?.orderItems} />
        )) }
    </div>
  )
}

export default Orders