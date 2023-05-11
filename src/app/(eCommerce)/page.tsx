import { useEffect } from "react"
import Image from "next/image"
import { store } from "@/store"


import Banner from "../../../public/images/banner.webp"
import Jogger1 from "../../../public/images/hero1.webp"
import Jogger2 from "../../../public/images/hero2.webp"
import { AspectRatio } from "@/components/ui/aspect-ratio"



export default function Home() {
  return (
    <section className="">
      <div className="relative">
        <h1 className="container-lg absolute top-2/4 z-30 text-center text-5xl font-bold">
          Lorem ipsum dolor sit amet.
        </h1>
        <AspectRatio ratio={16 / 9} className="max-h-[70vh]">
          <Image src={Banner} alt="banner" fill />
        </AspectRatio>     
      </div>
      <div></div>
    </section>
  )
}
