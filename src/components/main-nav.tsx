"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { AppDispatch } from "@/store"
import { logout, selectCurrentToken } from "@/store/features/auth/auth-slice"
import { MainNavItem } from "@/types"
import { useDispatch, useSelector } from "react-redux"

import { Bag } from "./bag"
import { HoverNavigationMenu } from "./hover-navigation"
import { ModeToggle } from "./mode-toggle"
import { Button, buttonVariants } from "./ui/button"
import { WishList } from "./wishlist"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
}

export function MainNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

  const token = useSelector(selectCurrentToken)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <nav className="flex w-full justify-between gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <HoverNavigationMenu />
      <div className="hidden gap-6 md:flex">
        <WishList />
        <Bag />
        {!token ? (
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "px-4"
            )}
          >
            Login
          </Link>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={() => dispatch(logout())}
          >
            Logout
          </Button>
        )}
        <ModeToggle />
      </div>
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </nav>
  )
}
