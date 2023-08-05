"use client"

import * as React from "react"
import Link from "next/link"
import { MainNavItem, SidebarNavItem } from "@/types"
import { motion } from "framer-motion"

import { buttonVariants } from "../ui/button"

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

interface MenuItemProps {
  item: MainNavItem | SidebarNavItem
  toggle: () => void
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, toggle }) => {
  return (
    <motion.li
      className="mb-5 flex cursor-pointer items-center"
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        onClick={toggle}
        className="inline-block text-3xl font-semibold"
        href={item.href}
      >
        {item.title}
      </Link>
    </motion.li>
  )
}
