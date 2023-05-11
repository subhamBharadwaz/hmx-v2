"use client"

import React from "react"
import { Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"
import Image from "next/image"
import Link from "next/link"
import { ProductCarousalData } from "@/constants"
import { cn } from "@/lib/utils"

import { buttonVariants } from "../ui/button"

interface SliderProps {
  data: typeof ProductCarousalData
  className?: string
}

const SwiperCards: React.FC<SliderProps> = ({ data, className }) => {
  return (
    <Swiper
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
      }}
      spaceBetween={30}
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      modules={[Pagination]}
      className={cn("mySwiper min-h-[100vh]", className)}
    >
      {data?.map((slide) => (
        <SwiperSlide key={slide.id} className="group cursor-grab">
          <div className="space-y-3 md:space-y-5">
            <div className=" relative h-[70vh] w-full overflow-hidden">
              <span className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 text-lg text-slate-50 md:text-xl">
                {slide.category}
              </span>

              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="z-20 object-cover opacity-70 transition duration-500 ease-in-out group-hover:rotate-2 group-hover:scale-105"
              />
              <div className="h-full w-full bg-slate-950 " />
            </div>
            <p className="text-xl font-semibold text-slate-800 dark:text-slate-200 md:text-2xl">
              {slide.title}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {slide.description}
            </p>
            <Link
              href="#"
              className={cn(
                buttonVariants(),
                "group-hover:border group-hover:border-slate-800 group-hover:bg-slate-100 group-hover:font-semibold group-hover:text-slate-900 dark:group-hover:bg-slate-900 dark:group-hover:text-slate-100"
              )}
            >
              Shop Now
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SwiperCards
