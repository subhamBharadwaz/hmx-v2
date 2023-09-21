"use client"

import * as React from "react"
import { Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"
import Image from "next/image"
import { visionaries } from "@/constants"
import { cn } from "@/lib/utils"

interface VisionariesSwiperProps {
  className?: string
}

const VisionariesSwiper: React.FC<VisionariesSwiperProps> = ({ className }) => {
  return (
    <div className={cn("md:hidden", className)}>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mb-10"
      >
        {visionaries.map((visionary) => (
          <SwiperSlide key={visionary.id} className="group cursor-grab pb-10">
            <div className="space-y-3 md:space-y-5">
              <div className="relative h-96 w-full overflow-hidden">
                <Image
                  src={visionary.image}
                  alt={visionary.name}
                  fill
                  sizes="w-full"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-5 bg-slate-900/60">
                  <h3 className="text-xl font-semibold text-slate-100">
                    {visionary.name}
                  </h3>
                  <p className="px-5 text-center text-sm text-slate-100">
                    {visionary.para}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default VisionariesSwiper
