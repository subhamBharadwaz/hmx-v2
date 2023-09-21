import { FC } from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

interface PaymentSummaryProps {
    taxAmount: number;
    shippingAmount: number;
    totalAmount: number;
}

const PaymentSummary: FC<PaymentSummaryProps> = ({taxAmount, shippingAmount, totalAmount}) => {
  return (
    <Card className='w-full'>
        <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
           <p className='flex justify-between'>
            <span>Cart Total</span>
            <span>Rs. {totalAmount}</span>
           </p>
           <p className='flex justify-between'>
            <span>Shipping Amount</span>
            <span>Rs. {shippingAmount}</span>
           </p>
           <p className='flex justify-between'>
            <span>Tax Amount</span>
            <span>Rs. {taxAmount}</span>
           </p>
           <p className='flex justify-between'>
            <span>Order Total</span>
            <span>Rs. {totalAmount}</span>
           </p>
        </CardContent>
        
        <CardFooter className='border-t border-slate-200 pt-3 dark:border-slate-600'>
          <p className='flex w-full justify-between font-bold'>
            <span>Amount Paid</span>
            <span>Rs. {totalAmount}</span>
          </p>
        </CardFooter>
    </Card>
  )
}

export default PaymentSummary