import { FC } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

interface ShippingDetailsProps {
    shippingInfo: {
        firstName: string;
        lastName: string;
        houseNo: string;
        streetName: string;
        landMark: string;
        postalCode: string;
        city: string;
        country: string;
        state: string;
        phoneNumber: string;
      };
}

const ShippingDetails: FC<ShippingDetailsProps> = ({shippingInfo}) => {
  return (
    <Card className='w-full'>
        <CardHeader>
            <CardTitle>Shipping Details</CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
            <p className='font-semibold'>{`${shippingInfo?.firstName} ${shippingInfo?.lastName}`}</p>
             <p className='text-sm text-slate-600 dark:text-slate-300'>{shippingInfo?.houseNo} {shippingInfo?.streetName}, {shippingInfo?.landMark}, {shippingInfo?.city} {shippingInfo?.postalCode}, {shippingInfo?.state}, {shippingInfo?.country}</p>
        </CardContent>
    </Card>
  )
}

export default ShippingDetails