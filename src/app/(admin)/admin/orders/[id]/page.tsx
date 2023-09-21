import OrderDetails from "@/components/admin/orders/order-details"
import Hydrate from "@/lib/HydrateClient"
import getQueryClient from "@/lib/getQueryClient"
import { getCurrentUser } from "@/lib/session"
import { dehydrate } from "@tanstack/query-core"
import axios from "axios"

const getOrder = async (id: string, accessToken: string | undefined) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/orders/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
  return res?.data?.order
}

export default async function OrderPage({
  params,
}: {
  params: { id: string }
}) {
  const user = await getCurrentUser()
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(["admin-order", params.id], () =>
    getOrder(params.id, user?.accessToken)
  )
  const dehydratedState = dehydrate(queryClient)
  return (
    <section className="">
      <div className="">
        <Hydrate state={dehydratedState}>
          <div>
            <OrderDetails orderId={params.id} accessToken={user?.accessToken} />
          </div>
        </Hydrate>
      </div>
    </section>
  )
}
