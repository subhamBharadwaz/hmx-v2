"use client"

import { Dispatch, FC, SetStateAction } from "react"
import Link from "next/link"
import { MainNavItem, SidebarNavItem } from "@/types"
import { motion } from "framer-motion"

import { blur, translate } from "../anim"

interface BodyProps {
  items: MainNavItem[] | SidebarNavItem[]
  selectedItem: { isActive: boolean; index: number }
  setSelectedItem: Dispatch<
    SetStateAction<{
      isActive: boolean
      index: number
    }>
  >
}

const getChars = (word: string) => {
  let chars: any[] = []
  word.split("").forEach((char, i) => {
    chars.push(
      <motion.span
        custom={[i * 0.02, (word.length - i) * 0.01]}
        variants={translate}
        initial="initial"
        animate="enter"
        exit="exit"
        key={char + i}
      >
        {char}
      </motion.span>
    )
  })
  return chars
}

const Body: FC<BodyProps> = ({ items, selectedItem, setSelectedItem }) => {
  return (
    <div className="mt-10 flex flex-wrap">
      {items.map((item, index) => {
        const { title, href } = item
        return (
          <Link
            key={`l_${index}`}
            href={href as string}
            className="uppercase text-foreground"
          >
            <motion.p
              className="m-0 flex overflow-hidden pr-8 pt-3 text-xl"
              onMouseOver={() => {
                setSelectedItem({ isActive: true, index })
              }}
              onMouseLeave={() => {
                setSelectedItem({ isActive: false, index })
              }}
              variants={blur}
              animate={
                selectedItem.isActive && selectedItem.index != index
                  ? "open"
                  : "closed"
              }
            >
              {getChars(title)}
            </motion.p>
          </Link>
        )
      })}
    </div>
  )
}

export default Body
