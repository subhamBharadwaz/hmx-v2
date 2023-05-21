import { dehydrate } from "@tanstack/query-core"
import getQueryClient from "@/lib/getQueryClient"
import Hydrate from "@/lib/HydrateClient"
import axios from 'axios'
import { getCurrentUser } from "@/lib/session"

const getProduct = async(id: string, accessToken: string | undefined)=>{
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

export default async function ProductPage ({params}: {params:{ id: string}}){
   const user = await getCurrentUser()
   const queryClient = getQueryClient()
   await queryClient.prefetchQuery(['admin-product',params.id], ()=> getProduct(params.id, user?.accessToken))
   const dehydratedState = dehydrate(queryClient)
   return (<section className=''>
   <div className="">
       <Hydrate state={dehydratedState}>
         <div>
            {/* <P id={params.id} accessToken={user?.accessToken}/> */}
         </div>
       </Hydrate>
   </div>
 </section>
   )
}