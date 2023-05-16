import { useEffect } from "react"
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { store } from "@/store"

import Banner from "../../../public/images/banner.webp"
import Jogger1 from "../../../public/images/hero1.webp"
import Jogger2 from "../../../public/images/hero2.webp"

import { getCurrentUser } from "@/lib/session"

export default  async function Home() {
  const session = await getCurrentUser()

  console.log({session})

  return (
    <section className="">
      <div className="relative">
        <h1 className="absolute top-2/4 z-30 text-center text-5xl font-bold">
          Lorem ipsum dolor sit amet.
        </h1>
        <AspectRatio ratio={16 / 9} className="max-h-[70vh]">
          <Image src={Banner} alt="banner" fill />
        </AspectRatio>
      </div>
     <p className="text-4xl text-slate-700"><pre>{JSON.stringify(session, null, 2)}</pre></p>
    </section>
  )
}
