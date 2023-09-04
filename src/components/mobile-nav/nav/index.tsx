"use client"

import { FC, useState } from "react"
import { MainNavItem, SidebarNavItem } from "@/types"
import { motion } from "framer-motion"

import { height } from "../anim"
import Body from "./body"

interface NavProps {
  items: MainNavItem[] | SidebarNavItem[]
}

const Nav: FC<NavProps> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState({
    isActive: false,
    index: 0,
  })

  return (
    <motion.div
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
      className="overflow-hidden"
    >
      <div className="mb-20 flex gap-12">
        <div className="flex flex-col justify-between">
          <Body
            items={items}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default Nav
