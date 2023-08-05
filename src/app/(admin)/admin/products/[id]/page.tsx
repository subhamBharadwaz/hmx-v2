import AdminEditProduct from "@/components/admin/products/edit/edit-product"
import Hydrate from "@/lib/HydrateClient"
import getQueryClient from "@/lib/getQueryClient"
import { getCurrentUser } from "@/lib/session"
import { dehydrate } from "@tanstack/query-core"
import axios from "axios"

const getProduct = async (id: string, accessToken: string | undefined) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/product/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
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
  await queryClient.prefetchQuery(["admin-product", params.id], () =>
    getProduct(params.id, user?.accessToken)
  )
  const dehydratedState = dehydrate(queryClient)
  return (
    <section className="">
      <div className="">
        <Hydrate state={dehydratedState}>
          <div className="space-y-10">
            <h3 className="text-2xl font-semibold text-foreground">
              Edit Product
            </h3>
            <AdminEditProduct
              accessToken={user?.accessToken}
              productId={params.id}
            />
          </div>
        </Hydrate>
      </div>
    </section>
  )
}
