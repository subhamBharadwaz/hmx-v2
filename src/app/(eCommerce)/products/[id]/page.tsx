import { dehydrate } from "@tanstack/react-query"
import getQueryClient from "@/lib/getQueryClient"
import Hydrate from "@/lib/HydrateClient"
import axios from 'axios'
import SingleProduct from "@/components/product/single-product/single-product"

const getProduct = async(id: string)=>{
   const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/${id}`
    )
    return res.data.product
}

export default async function ProductPage ({params}: {params:{ id: string}}){
   const queryClient = getQueryClient()
   await queryClient.prefetchQuery([`products/${params.id}`], ()=> getProduct(params.id))
   const dehydratedState = dehydrate(queryClient)
   return (<section className=''>
   <div className="">
       <Hydrate state={dehydratedState}>
         <div>
            <SingleProduct id={params.id}/>
         </div>
       </Hydrate>
   </div>
 </section>
   )
}