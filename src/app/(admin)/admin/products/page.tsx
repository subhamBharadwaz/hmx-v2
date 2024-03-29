import Products from "@/components/admin/products/products"
import { Button } from "@/components/ui/button"
import getQueryClient from "@/lib/getQueryClient"
import { getCurrentUser } from "@/lib/session"
import { dehydrate } from "@tanstack/query-core"
import Hydrate from "@/lib/HydrateClient"
import axios from "axios"
import Link from "next/link"

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
    <>
    <div className="flex items-center justify-between">
      <h3 className="">Products</h3>
      <Button className="">
      <Link href='/admin/products/create'>Create</Link>
    </Button>
    </div>
    <Hydrate state={dehydratedState}>
      <Products accessKey={user?.accessToken}/>
    </Hydrate>
    </>
  )
}
