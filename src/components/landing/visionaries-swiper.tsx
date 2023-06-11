"use client"

import * as React from "react"
import { Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import Image from "next/image"
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
        <SwiperSlide className="group cursor-grab pb-10">
          <div className="space-y-3 md:space-y-5">
            <div className="relative h-96 w-full overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/8345977/pexels-photo-8345977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="man giving a speech"
                fill
                sizes="w-full"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-5 bg-slate-800/40">
                <h3 className="text-xl font-semibold text-slate-100">
                  Michael Rodriguez
                </h3>
                <p className="px-5 text-center text-sm text-slate-200">
                  Michael Rodriguez, our visionary Head of Marketing, plays a
                  pivotal role in shaping HMX&apos;s brand identity and driving
                  customer engagement.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="group cursor-grab pb-10">
          <div className="space-y-3 md:space-y-5">
            <div className=" relative h-96 w-full overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/15761320/pexels-photo-15761320/free-photo-of-girl-posing-in-a-fashionable-outfit.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="man giving a speech"
                fill
                sizes="w-full"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-5 bg-slate-800/40">
                <h3 className="text-xl font-semibold text-slate-100">
                  Elias Jara
                </h3>
                <p className="px-5 text-center text-sm text-slate-200">
                  Elias Jara, our dedicated Director of Customer Experience, is
                  passionate about delivering exceptional service to our valued
                  customers.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="group cursor-grab pb-10">
          <div className="space-y-3 md:space-y-5">
            <div className=" relative h-96 w-full overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/15141516/pexels-photo-15141516/free-photo-of-man-speaking-on-a-meeting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="man giving a speech"
                fill
                sizes="w-full"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-5 bg-slate-800/40">
                <h3 className="text-xl font-semibold text-slate-100">
                  Matheus Bertelli
                </h3>
                <p className="px-5 text-center text-sm text-slate-200">
                  Matheus Bertelli, our brilliant CTO, leads the technical team
                  at HMX, overseeing the development and implementation of
                  innovative solutions that power our e-commerce platform.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default VisionariesSwiper
