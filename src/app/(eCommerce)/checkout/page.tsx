import Checkout from "@/components/checkout/checkout"
import { getCurrentUser } from "@/lib/session"

export default async function CheckoutPage() {
  const user = await getCurrentUser()

  return (
    <section className="pt-24">
      <Checkout accessToken={user?.accessToken} />
    </section>
  )
}
