import Orders from "@/components/admin/orders/orders"
import getQueryClient from "@/lib/getQueryClient"
import { getCurrentUser } from "@/lib/session"
import { dehydrate } from "@tanstack/query-core"
import Hydrate from "@/lib/HydrateClient"
import axios from "axios"

const getOrders = async (accessToken: string | undefined) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/orders`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
  return await res?.data.orders
}

export default async function AdminOrdersPage() {
  const user = await getCurrentUser()

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(["admin-orders"], () =>
    getOrders(user?.accessToken)
  )
  const dehydratedState = dehydrate(queryClient)

  return (
    <Hydrate state={dehydratedState}>
      <Orders accessKey={user?.accessToken} />
    </Hydrate>
  )
}
