import Container from "@/components/container"
import { FilterProducts } from "@/components/product/filter"
import ProductSection from "@/components/product/section"
import SwiperCards from "@/components/product/swiper"
import { ProductCarousalData } from "@/constants"
import Hydrate from "@/lib/HydrateClient"
import getQueryClient from "@/lib/getQueryClient"
import { dehydrate } from "@tanstack/query-core"
import axios from "axios"

const getProducts = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products?gender=Women`
  )
  return res.data.products
}

export default async function WomenProductsPage() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(["products-Women"], getProducts)
  const dehydratedState = dehydrate(queryClient)

  return (
    <section className="pt-24">
      <h2 className="mx-auto my-5 max-w-[120rem] px-8 text-center text-xl font-semibold md:text-2xl lg:my-10 lg:text-3xl">
        Which Jogger is right for you?
      </h2>

      <Container className="mb-16">
        <SwiperCards data={ProductCarousalData} />
      </Container>

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
      <Container className="mb-20">
        <Hydrate state={dehydratedState}>
          <ProductSection section="Women" />
        </Hydrate>
      </Container>
    </section>
  )
}
