"use client"

import React from "react"
import { Scrollbar } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/scrollbar";
import Image from "next/image"

import { cn } from "@/lib/utils"



interface SliderProps {
  photos: {
    id:string,
    secure_url:string
  }[]
  productName:string,
  className?: string
}

const SingleProductImageSwiper: React.FC<SliderProps> = ({ photos, productName,className }) => {

  return (
    <Swiper
      scrollbar={{
        hide: true,
        scrollbarDisabledClass: 'swiper-scrollbar-disabled'
      }}
      modules={[Scrollbar]}
      className={cn("mySwiper min-h-[80vh]", className)}
    >
      {photos?.map((photo) => (
        <SwiperSlide key={photo.id} className="group" >
          <div className="relative mb-1 h-[80vh] w-full">   
            <Image
              src={photo.secure_url}
              alt={productName}
              fill
              className="object-cover"
            />
        </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SingleProductImageSwiper
