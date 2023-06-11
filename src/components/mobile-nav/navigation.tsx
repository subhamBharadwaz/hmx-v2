'use client'

import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./menu-item";
import { cn } from "@/lib/utils";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const menuItems =[
    {name: 'Shop All', path: '/products'},
    {name: 'Men', path: '/products/men'},
    {name: 'Women', path: '/products/women'},
]

interface NavigationProps {
    toggle: ()=> void
    className?: string
}

export const Navigation: React.FC<NavigationProps> = ({toggle,className}) => (
  <motion.ul variants={variants} className={cn("absolute top-28 w-[230px] space-y-10 p-7",className)}>
    {menuItems.map(item => (
      <MenuItem toggle={toggle} item={item} key={item.name} />
    ))}
  </motion.ul>
);


