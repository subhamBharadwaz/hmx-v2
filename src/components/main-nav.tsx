"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { MainNavItem } from "@/types"
import { signOut, useSession } from "next-auth/react"

import { Bag } from "./bag"
import { HoverNavigationMenu } from "./hover-navigation"
import { ModeToggle } from "./mode-toggle"
import { Button, buttonVariants } from "./ui/button"
import { WishList } from "./wishlist"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
  accessToken: string | undefined
}

export function MainNav({ items, children, accessToken }: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

  const { data: session } = useSession()

  return (
    <nav className="flex w-full justify-between gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <HoverNavigationMenu />
      <div className="hidden gap-6 md:flex">
        <WishList accessToken={accessToken} />
        <Bag accessToken={accessToken} />
        {!session?.user.user ? (
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
          <Button size="sm" variant="outline" onClick={() => signOut()}>
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
