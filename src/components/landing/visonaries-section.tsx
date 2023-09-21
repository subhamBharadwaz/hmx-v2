"use client"

import { FC, useEffect } from "react"
import Image from "next/image"
import { visionaries } from "@/constants"
import { motion, stagger, useAnimate, useInView } from "framer-motion"

import Container from "../container"
import VisionariesSwiper from "./visionaries-swiper"

interface VisionariesSectionProps {}

const VisionariesSection: FC<VisionariesSectionProps> = ({}) => {
  const [scope, animate] = useAnimate()

  const isInView = useInView(scope, { once: true })
  useEffect(() => {
    if (isInView) {
      animate("h2", { opacity: [0, 1], y: [50, 0] }, { duration: 1 })
      animate(
        "#vision-container",
        { opacity: [0, 1], y: [150, 0] },
        { delay: stagger(0.2), duration: 0.8 }
      )
      animate("h3", { opacity: [0, 1] }, { delay: stagger(0.2), duration: 2 })
      animate("p", { opacity: [0, 1] }, { delay: stagger(0.2), duration: 2 })
    }
  }, [animate, isInView])

  return (
    <section ref={scope} className="min-h-[50vh] bg-neutral-900 py-20">
      <Container>
        <h2 className="text-center text-2xl font-semibold text-slate-100 md:text-3xl lg:text-4xl">
          Visionaries
        </h2>
        <div className="my-20">
          <div className="mt-16 hidden grid-rows-1 gap-5 md:grid md:grid-cols-3">
            {visionaries.map((visionary) => (
              <div
                key={visionary.id}
                id="vision-container"
                className="relative  overflow-hidden md:h-96  lg:h-[80vh]"
              >
                <Image
                  src={visionary.image}
                  alt={visionary.name}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-5 bg-slate-900/60">
                  <h3 className="font-semibold text-slate-100 lg:text-2xl 2xl:text-4xl">
                    {visionary.name}
                  </h3>
                  <p className="lg:text-md px-5 text-center text-sm text-slate-100 2xl:text-lg">
                    {visionary.para}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <VisionariesSwiper />
        </div>
      </Container>
    </section>
  )
}

export default VisionariesSection
