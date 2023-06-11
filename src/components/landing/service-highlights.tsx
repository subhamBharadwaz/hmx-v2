import { FC } from "react"
import Image from "next/image"
import Container from "@/components/container"
import { Icons } from "@/components/icons"

const ServiceHighlights: FC = () => {
  return (
    <section className="min-h-[50vh] bg-background">
      <Container>
        <div className="hidden items-center justify-between gap-x-2 py-10 lg:flex">
          <div className="flex flex-col items-center justify-center gap-y-2">
            <Icons.billing className="h-7 w-7 stroke-slate-600 stroke-1 dark:stroke-slate-400 xl:h-10 xl:w-10" />
            <h3 className="text-xl xl:text-2xl">Secure Payments</h3>
            <p className="text-center text-sm">Safe and trusted transactions</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-2">
            <Icons.return className="h-7 w-7 stroke-slate-600 stroke-1 dark:stroke-slate-400 xl:h-10 xl:w-10" />
            <h3 className="text-xl xl:text-2xl">Easy Returns</h3>
            <p className="text-center text-sm">Hassle-free product returns</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-2">
            <Icons.order className="h-7 w-7 stroke-slate-600 stroke-1 dark:stroke-slate-400 xl:h-10 xl:w-10" />
            <h3 className="text-xl xl:text-2xl">Faster Delivery</h3>
            <p className="text-center text-sm">Speedy shipping service</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-2">
            <Icons.support className="h-7 w-7 stroke-slate-600 stroke-1 dark:stroke-slate-400 xl:h-10 xl:w-10" />
            <h3 className="text-xl xl:text-2xl">24/7 Support</h3>
            <p className="text-center text-sm">Round-the-clock assistance</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-2">
            <Icons.quality className="h-7 w-7 stroke-slate-600 stroke-1 dark:stroke-slate-400 xl:h-10 xl:w-10" />
            <h3 className="text-xl xl:text-2xl">Quality Guaranteed</h3>
            <p className="text-center text-sm">Reliable, high-quality products</p>
          </div>
        </div>
       <div className="relative flex overflow-x-hidden">
       <div className="flex animate-marquee items-center justify-between space-x-5 whitespace-nowrap py-10 lg:hidden">
          <div className="flex  items-center  gap-x-2">
            <Icons.billing className="h-10 w-10 stroke-slate-600 stroke-1 dark:stroke-slate-400" />
            <h3 className="text-lg">Secure Payments</h3>
          </div>
          <div className="flex  items-center gap-x-2">
            <Icons.return className="h-10 w-10 stroke-slate-600 stroke-1 dark:stroke-slate-400" />
            <h3 className="text-lg">Easy Returns</h3>
          </div>
          <div className="flex items-center gap-x-2">
            <Icons.order className="h-10 w-10 stroke-slate-600 stroke-1 dark:stroke-slate-400" />
            <h3 className="text-lg">Faster Delivery</h3>
          </div>
          <div className="flex items-center gap-x-2">
            <Icons.support className="h-10 w-10 stroke-slate-600 stroke-1 dark:stroke-slate-400" />
            <h3 className="text-lg">24/7 Support</h3>
          </div>
          <div className="flex  items-center  gap-x-2">
            <Icons.quality className="h-10 w-10 stroke-slate-600 stroke-1 dark:stroke-slate-400" />
            <h3 className="text-lg">Quality Guaranteed</h3>
          </div>
        </div>
        <div className="absolute top-0 ml-5 flex animate-marquee2 items-center justify-between space-x-5 whitespace-nowrap py-10 lg:hidden">
          <div className="flex  items-center  gap-x-2">
            <Icons.billing className="h-10 w-10 stroke-slate-600 stroke-1 dark:stroke-slate-400" />
            <h3 className="text-lg">Secure Payments</h3>
          </div>
          <div className="flex  items-center gap-x-2">
            <Icons.return className="h-10 w-10 stroke-slate-600 stroke-1 dark:stroke-slate-400" />
            <h3 className="text-lg">Easy Returns</h3>
          </div>
          <div className="flex items-center gap-x-2">
            <Icons.order className="h-10 w-10 stroke-slate-600 stroke-1 dark:stroke-slate-400" />
            <h3 className="text-lg">Faster Delivery</h3>
          </div>
          <div className="flex items-center gap-x-2">
            <Icons.support className="h-10 w-10 stroke-slate-600 stroke-1 dark:stroke-slate-400" />
            <h3 className="text-lg">24/7 Support</h3>
          </div>
          <div className="flex  items-center  gap-x-2">
            <Icons.quality className="h-10 w-10 stroke-slate-600 stroke-1 dark:stroke-slate-400" />
            <h3 className="text-lg">Quality Guaranteed</h3>
          </div>
        </div>
       </div>
        <div className="mt-10 grid-cols-4 grid-rows-2 lg:grid lg:min-h-screen">
          <div className="relative col-span-2 row-span-full h-96 w-full overflow-hidden lg:h-full">
            <Image
              src="/images/banner.webp"
              alt="new"
              fill
              className="h-full w-full object-cover object-center transition-all duration-500 ease-in-out hover:scale-105"
            />
          </div>
          <div className="relative col-span-1  hidden h-full  w-full overflow-hidden lg:block">
            <Image
              src="/images/banner2.webp"
              alt="new"
              fill
              className="h-full w-full object-cover object-center transition-all duration-500 ease-in-out hover:scale-105"
            />
          </div>
          <div className="relative col-span-1   hidden h-full w-full overflow-hidden lg:block">
            <Image
              src="/images/hero1.webp"
              alt="new"
              fill
              className="h-full w-full object-cover object-center transition-all duration-500 ease-in-out hover:scale-105"
            />
          </div>
          <div className="relative col-span-1  hidden h-full w-full overflow-hidden lg:block">
            <Image
              src="/images/hero2.webp"
              alt="new"
              fill
              className="h-full w-full object-cover object-center transition-all duration-500 ease-in-out hover:scale-105"
            />
          </div>
          <div className="relative col-span-1   hidden h-full w-full overflow-hidden lg:block">
            <Image
              src="/images/230130_Seneca_Laydowns_0059_670x.webp"
              alt="new"
              fill
              className="h-full w-full object-cover object-center transition-all duration-500 ease-in-out hover:scale-105"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ServiceHighlights
