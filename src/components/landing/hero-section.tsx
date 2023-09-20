"use client"

import { FC, useEffect, useState } from "react"
import Link from "next/link"
import {
  motion,
  stagger,
  useAnimate,
  useScroll,
  useTransform,
} from "framer-motion"

import Container from "../container"

const HeroSection: FC = () => {
  const { scrollY } = useScroll()
  let y = useTransform(scrollY, [0, 700], ["0%", "50%"])
  const [isMuted, setIsMuted] = useState(true)

  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate(
      ".hero-anim",
      { opacity: [0, 1], y: [100, 0] },
      { duration: 1, delay: stagger(0.3) }
    )
  }, [animate])

  return (
    <motion.section
      style={{ y }}
      className="min-w-screen  relative -z-20 h-screen overflow-hidden"
    >
      <div className="absolute inset-0 flex bg-slate-800/40" />
      <Container ref={scope} className="absolute bottom-40 space-y-10">
        <h2 className="hero-anim self-end text-2xl leading-snug tracking-wide text-slate-100 md:text-5xl">
          Ultimate Comfort and Style <br className="hidden sm:inline" />
          for Every Adventure.
        </h2>
      </Container>
      <video
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="h-full w-full object-cover"
      >
        <source
          src="https://res.cloudinary.com/dogdzaavf/video/upload/v1685030114/HMX_Hero_Section_-_Made_with_Clipchamp_z6cpgk.mp4"
          type="video/mp4"
        />
        <source
          id="jpg"
          src="../../public/images/banner.webp"
          type="photo/jpg"
        />
      </video>

      {/* <button onClick={() => setAudioOn(!audioOn)}>On</button> */}
    </motion.section>
  )
}

export default HeroSection
