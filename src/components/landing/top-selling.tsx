"use client"

import { FC } from "react"
import { ITopSellingProduct } from "@/types"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

import Container from "../container"
// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import Image from "next/image"
// import required modules
import { Pagination } from "swiper"
import Link from "next/link"

interface TopSellingProductsProps {}

const TopSellingProducts: FC<TopSellingProductsProps> = ({}) => {
  const { data: products, isLoading } = useQuery<ITopSellingProduct[]>({
    queryKey: ["top-selling-products"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/top-selling`
      )
      return await res?.data.products
    },
  })

 
  return (
    <section className="min-h-[50vh] py-20">
      <Container className="space-y-10">
        <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
          Top Selling
        </h2>
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 3,
            },
            1920: {
              slidesPerView: 4,
            },
          }}
          spaceBetween={15}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper cursor-grabbing"
        >
          {products &&
            products?.map((product) => (
              <SwiperSlide key={product?.productId} className="pb-10">
                  <Link href={`/products/${product?.productId}`} className="relative block h-[34rem] w-full overflow-hidden">
                  <Image
                    src={product?.photos[0]?.secure_url}
                    alt={product?.name}
                    className="object-cover transition duration-500 ease-in-out hover:scale-110 hover:opacity-0"
                    sizes="(max-width: 1280px) 40rem"
                    fill
                  />
                  <Image
                    src={product?.photos[1]?.secure_url}
                    alt={product?.name}
                    className="absolute left-0 top-0 h-auto w-full object-cover opacity-0 transition duration-500 ease-in-out hover:scale-105 hover:opacity-100"
                    sizes="(max-width: 1280px) 40rem"
                    fill
                  />
                  </Link>         
              </SwiperSlide>
            ))}
        </Swiper>
      </Container>
    </section>
  )
}

export default TopSellingProducts
