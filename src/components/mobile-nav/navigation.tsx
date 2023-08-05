"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { MainNavItem, SidebarNavItem } from "@/types"
import { motion } from "framer-motion"

import { MenuItem } from "./menu-item"

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

interface NavigationProps {
  toggle: () => void
  className?: string
  items: MainNavItem[] | SidebarNavItem[]
}

export const Navigation: React.FC<NavigationProps> = ({
  toggle,
  className,
  items,
}) => (
  <motion.ul
    variants={variants}
    className={cn("absolute top-28 w-[230px] space-y-10 p-7", className)}
  >
    {items.map((item) => (
      <MenuItem toggle={toggle} item={item} key={item.href} />
    ))}
  </motion.ul>
)
