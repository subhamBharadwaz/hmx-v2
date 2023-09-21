import Orders from "@/components/account/orders/orders"
import Hydrate from "@/lib/HydrateClient"
import getQueryClient from "@/lib/getQueryClient"
import { getCurrentUser } from "@/lib/session"
import { dehydrate } from "@tanstack/query-core"
import axios from "axios"

const getOrders = async (token: string | undefined) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/myorder`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return res?.data?.orders
}

export default async function OrdersPage() {
  const user = await getCurrentUser()

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(["orders"], () =>
    getOrders(user?.accessToken)
  )
  const dehydratedState = dehydrate(queryClient)

  return (
    <section className="container mb-20 space-y-10 pt-24">
      <h2 className="text-xl font-bold text-foreground md:text-4xl">
        My Orders
      </h2>
      <Hydrate state={dehydratedState}>
        <Orders accessToken={user?.accessToken} />
      </Hydrate>
    </section>
  )
}
