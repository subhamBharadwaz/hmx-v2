"use client"

import React from "react"
import { Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"
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
    pagination={{
      dynamicBullets: true,
      clickable: true,
    }}
    modules={[Pagination]}
      className={cn("mySwiper  min-h-[80vh]", className)}
    >
      {photos?.map((photo) => (
        <SwiperSlide key={photo.id} className="group" >
          <div className="relative mb-10 h-[80vh] w-full md:h-[85vh]">   
            <Image
              src={photo.secure_url}
              alt={productName}
              fill
              sizes="(max-width:768px) 85vh"
              className="cursor-grabbing object-cover"
            />
        </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SingleProductImageSwiper
