/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { MainNavItem, SidebarNavItem } from "@/types"
import { AnimatePresence, motion } from "framer-motion"

import { Bag } from "../bag"
import { WishList } from "../wishlist"
import { background, opacity } from "./anim"
import Nav from "./nav"

interface MobileNavProps {
  items: MainNavItem[] | SidebarNavItem[]
  children?: React.ReactNode
  className?: string
}

export function MobileNav({ items, children, className }: MobileNavProps) {
  const [isActive, setIsActive] = React.useState<boolean>(false)

  return (
    <nav
      className={cn(
        "container fixed top-0 z-50 w-full  bg-slate-100 py-6 dark:bg-slate-900 md:hidden",
        className
      )}
    >
      <div className="relative flex items-center justify-center text-base uppercase">
        <Link href="/" className="absolute left-0">
          HMX
        </Link>
        <div
          onClick={() => setIsActive(!isActive)}
          className="flex cursor-pointer items-center justify-center gap-2"
        >
          <div
            className={cn(
              "pointer-events-none relative w-[22.5px] before:relative before:top-[4px] before:block before:h-[1px] before:w-full before:bg-foreground before:transition-[all_1s_cubic-bezier(0.76,_0,_0.24,_1)] after:relative after:-top-[4px] after:block after:h-[1px] after:w-full after:bg-foreground after:transition-[all_1s_cubic-bezier(0.76,_0,_0.24,_1)]",
              isActive
                ? "[&:after]:top-[-1px] [&:after]:rotate-45 [&:before]:top-[1px] [&:before]:-rotate-45"
                : ""
            )}
          />

          <div className="relative flex items-center ">
            <motion.p
              variants={opacity}
              animate={!isActive ? "open" : "closed"}
            >
              Menu
            </motion.p>
            <motion.p
              className="absolute opacity-0"
              variants={opacity}
              animate={isActive ? "open" : "closed"}
            >
              Close
            </motion.p>
          </div>
        </div>
        <motion.div
          variants={opacity}
          animate={!isActive ? "open" : "closed"}
          className="absolute right-0 flex gap-8"
        >
          <div className="flex cursor-pointer items-center justify-center">
            {children}
          </div>
        </motion.div>
      </div>
      <motion.div
        variants={background}
        initial="initial"
        animate={isActive ? "open" : "closed"}
        className="absolute left-0 top-full h-full w-full bg-slate-950 opacity-50"
      />

      <AnimatePresence mode="wait">
        {isActive && <Nav items={items} />}
      </AnimatePresence>
    </nav>
  )
}
