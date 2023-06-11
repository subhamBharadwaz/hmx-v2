'use client'

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

interface MenuItemProps {
    item: {
        name: string,
        path: string
    },
    toggle: ()=> void
}


export const MenuItem: React.FC<MenuItemProps> = ({ item,toggle }) => {

  return (
    <motion.li
    className="mb-5 flex cursor-pointer items-center"
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
    <Link onClick={toggle} className='inline-block text-3xl font-semibold' href={item.path}>{item.name}</Link>
    </motion.li>
  );
};
