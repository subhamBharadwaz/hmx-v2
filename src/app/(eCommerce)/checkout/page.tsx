import dynamic from 'next/dynamic'
import OrderSummary from "@/components/checkout/order-summary"
import { getCurrentUser } from "@/lib/session"

const ShippingAddress = dynamic(()=> import('@/components/checkout/shipping-address'), {
  ssr: false
})

export default async function CheckoutPage() {

  const user = await getCurrentUser()

  return (
    <section className="mb-10 flex w-full flex-col  justify-between space-y-10 lg:flex-row">
      <OrderSummary accessToken={user?.accessToken} />
      <ShippingAddress />
    </section>
  )
}
