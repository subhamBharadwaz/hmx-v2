import { FilterProducts } from "@/components/product/filter"
import Products from "@/components/product/products"
import SwiperCards from "@/components/product/swiper"
import { ProductCarousalData } from "@/constants"
import Hydrate from "@/lib/HydrateClient"
import getQueryClient from "@/lib/getQueryClient"
import { dehydrate } from "@tanstack/react-query"
import axios from "axios"

const getProducts = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`
  )
  return res.data.products
}

export default async function ProductsPage() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(["products"], getProducts)
  const dehydratedState = dehydrate(queryClient)

  return (
    <section>
      <h2 className="container my-5 text-center text-xl font-semibold md:text-2xl lg:my-10 lg:text-3xl">
        Which Jogger is right for you?
      </h2>

      <div className="container mb-16">
        <SwiperCards data={ProductCarousalData} />
      </div>

      <div className="mb-16 flex h-56 w-full flex-col items-center justify-center gap-y-10 bg-zinc-800 dark:bg-slate-100 lg:h-72">
        <p className="font-serif text-2xl tracking-tighter text-slate-200 dark:text-slate-600 lg:text-4xl">
          &quot;A Swiss Army knife for your closet.&quot;
        </p>
        <div className="flex gap-5">
          <p className="font-serif text-xl tracking-tighter text-slate-200 dark:text-slate-600  lg:text-2xl">
            VOGUE
          </p>
          <p className="text-xl font-bold tracking-tighter text-zinc-400  lg:text-2xl">
            WWD
          </p>
        </div>
      </div>
      <div className="container">
        <div className="mb-5">
          <FilterProducts />
        </div>
        <Hydrate state={dehydratedState}>
          <Products />
        </Hydrate>
      </div>
    </section>
  )
}
