import { dehydrate } from "@tanstack/react-query"
import getQueryClient from "@/lib/getQueryClient"
import Hydrate from "@/lib/HydrateClient"
import axios from 'axios'
import { getCurrentUser } from "@/lib/session"

const getUser = async(id: string, accessToken: string | undefined)=>{
   const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    return res.data.user
}

export default async function UserPage ({params}: {params:{ id: string}}){
   const user = await getCurrentUser()
   const queryClient = getQueryClient()
   await queryClient.prefetchQuery(['admin-user',params.id], ()=> getUser(params.id, user?.accessToken))
   const dehydratedState = dehydrate(queryClient)
   return (<section className=''>
   <div className="">
       <Hydrate state={dehydratedState}>
         <div>
            {/* <SingleProduct id={params.id} accessToken={user?.accessToken}/> */}
         </div>
       </Hydrate>
   </div>
 </section>
   )
}