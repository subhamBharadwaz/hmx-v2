import SingleProduct from "@/components/product/single-product/single-product"
import Hydrate from "@/lib/HydrateClient"
import getQueryClient from "@/lib/getQueryClient"
import { getCurrentUser } from "@/lib/session"
import { dehydrate } from "@tanstack/query-core"
import axios from "axios"

const getProduct = async (id: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/${id}`
  )
  return res.data.product
}

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const user = await getCurrentUser()
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(["product", params.id], () =>
    getProduct(params.id)
  )
  const dehydratedState = dehydrate(queryClient)
  return (
    <section className="pt-24">
      <Hydrate state={dehydratedState}>
        <div>
          <SingleProduct id={params.id} accessToken={user?.accessToken} />
        </div>
      </Hydrate>
    </section>
  )
}
