"use client"

import React from "react"
import { Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"
import Image from "next/image"
import { ProductCarousalData } from "@/constants"
import { cn } from "@/lib/utils"
import Link from "next/link"
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
          slidesPerView: 1
        },
        768:{
          slidesPerView: 2
        }
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
        <SwiperSlide key={slide.id} className="group" >
          <div className="space-y-3 md:space-y-5">
          <div className="relative h-[70vh] w-full">
            <span className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 text-lg text-slate-50 md:text-xl">
              {slide.category}
            </span>
            <div className="absolute z-10 h-full w-full bg-slate-950 opacity-50"/>
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
            />
          </div>
        <p className="text-xl font-semibold text-slate-800 md:text-2xl">{slide.title}</p>
        <p className="text-xs text-slate-600">{slide.description}</p>
        <Link href='#' className={cn(buttonVariants(), 'group-hover:border group-hover:border-slate-800 group-hover:bg-slate-50 group-hover:font-semibold group-hover:text-slate-900')}>Shop Now</Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SwiperCards
