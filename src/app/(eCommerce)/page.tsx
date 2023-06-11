import Image from "next/image"
import Container from "@/components/container"
import HeroSection from "@/components/landing/hero-section"
import ServiceHighlights from "@/components/landing/service-highlights"
import TopSellingProducts from "@/components/landing/top-selling"
import VisionariesSwiper from "@/components/landing/visionaries-swiper"
import SwiperCards from "@/components/product/swiper"
import { ProductCarousalData } from "@/constants"
import Hydrate from "@/lib/HydrateClient"
import getQueryClient from "@/lib/getQueryClient"
import { dehydrate } from "@tanstack/query-core"
import axios from "axios"
import VisionariesSection from "@/components/landing/visonaries-section"

const getTopSellingProducts = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/top-selling`
  )
  return await res.data.products
}

export default async function Home() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(
    ["top-selling-products"],
    getTopSellingProducts
  )
  const dehydratedState = dehydrate(queryClient)

  return (
    <>
      <HeroSection />
      <ServiceHighlights />
      <Hydrate state={dehydratedState}>
        <TopSellingProducts />
      </Hydrate>
      <section className="min-h-screen py-10">
        <Container className="mb-16 space-y-10">
          <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
            Featured Categories
          </h2>
          <SwiperCards data={ProductCarousalData} />
        </Container>
      </section>
     <VisionariesSection/>
    </>
  )
}
