import getQueryClient from "@/lib/getQueryClient"
import { dehydrate } from "@tanstack/query-core"
import Hydrate from "@/lib/HydrateClient"
import axios from "axios"
import { getCurrentUser } from "@/lib/session"
import Order from "@/components/account/orders/single-order/order"
import Link from "next/link"
import { Icons } from "@/components/icons"


const getOrder = async (token: string | undefined, id: string) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/order/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
      }
    )
    return res?.data?.order
  }


export default async function SingleOrderPage({params}: {params:{ id: string}}){

    const user = await getCurrentUser()

    const queryClient = getQueryClient()
    await queryClient.prefetchQuery(["order",params.id], ()=> getOrder(user?.accessToken, params?.id))
    const dehydratedState = dehydrate(queryClient)

    return (
        <section className="container space-y-10 pt-24">
            <Link href='/account/orders' className='flex items-center gap-x-2 text-lg font-semibold'> <Icons.chevronLeft/> Back to My Orders</Link>
            <Hydrate state={dehydratedState}>
          <Order accessToken={user?.accessToken} orderId={params?.id} />
        </Hydrate>
        </section>
    )
}