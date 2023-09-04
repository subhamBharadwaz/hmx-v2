import { FC } from "react"
import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

import Container from "./container"

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className="bg-[#212529] pb-10 text-white">
      <div className="flex min-h-[30vh] items-center justify-center bg-[#F84714] py-11 md:min-h-[50vh]">
        <p className="text-center text-lg font-semibold  text-foreground md:text-2xl xl:text-3xl">
          Inspired by those in pursuit of a vision. <br /> The journey is up to
          you.
        </p>
      </div>
      <Container className="mt-10 space-y-10">
        <div className="flex w-full flex-col gap-y-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <h3 className="text-4xl font-semibold">Let&apos;s Connect</h3>
            <p className="max-w-md text-sm">
              Release dates, philosophy, stories, & book recommendations. <br />{" "}
              A few a month.
            </p>
          </div>
          <div className="flex w-full  items-center justify-between md:w-1/4">
            <div className="flex flex-col gap-y-1">
              <Link href="/account" className="text-base font-semibold">
                Account
              </Link>
              <Link href="/" className="text-base font-semibold">
                FAQ
              </Link>
              <Link href="/" className="text-base font-semibold">
                Contact
              </Link>
            </div>
            <div className="flex flex-col gap-y-1">
              <Link href="/products" className="text-base font-semibold">
                Shop All
              </Link>
              <Link href="/products/men" className="text-base font-semibold">
                Men
              </Link>
              <Link href="/products/women" className="text-base font-semibold">
                Women
              </Link>
            </div>
          </div>
        </div>
      </Container>
      <div className="mt-24 border-t border-t-slate-600">
        <Container className="flex flex-col-reverse items-center justify-between gap-y-6 py-3 md:flex-row">
          <p className="text-sm">&copy; 2023 HMX ALL RIGHTS RESERVED</p>

          <h3 className="text-bold text-5xl ">HMX</h3>

          <div className="flex items-center gap-x-5 text-sm">
            <Link href="/terms">Terms of Use</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </Container>
      </div>
    </footer>
  )
}

export default Footer
