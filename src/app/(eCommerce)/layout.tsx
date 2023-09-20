import Link from "next/link"
import { Bag } from "@/components/bag"
import Container from "@/components/container"
import Footer from "@/components/footer"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { buttonVariants } from "@/components/ui/button"
import { WishList } from "@/components/wishlist"
import { eCommerceConfig } from "@/config/ecommerce"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"

interface ECommerceLayoutProps {
  children: React.ReactNode
}

export default async function ECommerceLayout({
  children,
}: ECommerceLayoutProps) {
  const user = await getCurrentUser()

  return (
    <div className="flex min-h-screen flex-col">
      <>
        <header className="fixed top-0 z-40 w-full">
          <MainNav
            items={eCommerceConfig.mainNav}
            accessToken={user?.accessToken}
            isAdmin={user?.user?.role === "admin" ? true : false}
            isCommerce={true}
          />
        </header>
        <MobileNav
          items={eCommerceConfig.mainNav}
          isAdmin={user?.user?.role === "admin" ? true : false}
        >
          <Link href={user?.accessToken ? "/account" : "/login"}>
            <Icons.user className="h-5 w-5" />
          </Link>
          <Bag
            navTransparent={false}
            accessToken={user?.accessToken}
            className="h-5 w-5"
          />
          <WishList
            navTransparent={false}
            accessToken={user?.accessToken}
            className="h-5 w-5"
          />
        </MobileNav>
      </>

      <main className="relative flex-1 ">{children}</main>
      <Footer />
    </div>
  )
}
