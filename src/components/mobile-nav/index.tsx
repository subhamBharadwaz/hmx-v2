"use client"

import * as React from "react"

import { motion,  useCycle } from "framer-motion";
import { useDimensions } from "@/hooks/use-dimensions";
import  MenuToggle  from "./menu-toggle";
import { Navigation } from "./navigation";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  // items: MainNavItem[]
  children?: React.ReactNode
}

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};


export function MobileNav({ }: MobileNavProps) {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = React.useRef(null);
  const { height } = useDimensions(containerRef);

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);


  return (
    <motion.nav
    className="absolute inset-y-0 left-0 w-full md:hidden"
    initial={false}
    animate={isOpen ? "open" : "closed"}
    custom={height}
    ref={containerRef}
  >
    <motion.div className="absolute inset-y-0 left-0 h-screen w-full bg-blue-50" variants={sidebar} />
    <Navigation className={cn(!isOpen && 'pointer-events-none')}  toggle={() => toggleOpen()} />
    <MenuToggle toggle={() => toggleOpen()} />
  </motion.nav>
  )
}
