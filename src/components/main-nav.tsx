"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useSelectedLayoutSegment } from "next/navigation"
import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { MainNavItem, SidebarNavItem } from "@/types"
import { signOut, useSession } from "next-auth/react"

import { Bag } from "./bag"
import Container from "./container"
import { HoverNavigationMenu } from "./hover-navigation"
import { Button, buttonVariants } from "./ui/button"
import { WishList } from "./wishlist"

interface MainNavProps {
  items: MainNavItem[] | SidebarNavItem[]
  children?: React.ReactNode
  accessToken: string | undefined
  isCommerce?: boolean
}

export function MainNav({
  items,
  children,
  accessToken,
  isCommerce,
}: MainNavProps) {
  const [navTransparent, setNavTransparent] = React.useState<boolean>(true)
  const { data: session } = useSession()
  const segment = useSelectedLayoutSegment()

  const pathname = usePathname()

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset
      const threshold = 50

      if (currentScroll > threshold) {
        setNavTransparent(false)
      } else {
        setNavTransparent(true)
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      <nav
        className={cn(
          navTransparent ? "bg-transparent" : "bg-background",
          "w-full transition-colors duration-150 ease-in-out"
        )}
      >
        <div className="container flex w-full justify-between gap-6 py-6 md:gap-10">
          {isCommerce && (
            <HoverNavigationMenu navTransparent={navTransparent} />
          )}
          {!isCommerce && (
            <Link href="/" className="hidden items-center space-x-2 md:flex">
              <span
                className={cn(
                  pathname === "/" && navTransparent
                    ? "text-white"
                    : "text-foreground",
                  "hidden text-xl font-bold tracking-widest sm:inline-block"
                )}
              >
                {siteConfig.name}
              </span>
            </Link>
          )}

          {isCommerce && (
            <>
              <Link href="/" className="hidden items-center space-x-2 md:flex">
                <span
                  className={cn(
                    pathname === "/" && navTransparent
                      ? "text-white"
                      : "text-foreground",
                    "hidden text-xl font-bold tracking-widest sm:inline-block"
                  )}
                >
                  {siteConfig.name}
                </span>
              </Link>
              <div className="hidden gap-3 md:flex">
                <Link
                  href={accessToken ? "/account" : "/login"}
                  className={cn(
                    buttonVariants({ variant: "link", size: "sm" })
                  )}
                >
                  <Icons.user
                    className={cn(
                      pathname === "/" && navTransparent
                        ? "text-white"
                        : "text-foreground"
                    )}
                  />
                </Link>
                <WishList
                  navTransparent={navTransparent}
                  accessToken={accessToken}
                />
                <Bag
                  navTransparent={navTransparent}
                  accessToken={accessToken}
                />
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
              </div>
            </>
          )}
          <MobileNav items={items}>{children}</MobileNav>
        </div>
      </nav>
    </>
  )
}
