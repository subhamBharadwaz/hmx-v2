import Products from "@/components/admin/products/products"
import getQueryClient from "@/lib/getQueryClient"
import { getCurrentUser } from "@/lib/session"
import { Hydrate, dehydrate } from "@tanstack/react-query"
import axios from "axios"

const getProducts = async (accessToken: string | undefined) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/products`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
  return await res?.data
}

export default async function AdminProductsPage() {
  const user = await getCurrentUser()
  
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(["admin-products"], ()=> getProducts(user?.accessToken))
  const dehydratedState = dehydrate(queryClient)


  return (
    <Hydrate state={dehydratedState}>
      <Products accessKey={user?.accessToken}/>
    </Hydrate>
  )
}
