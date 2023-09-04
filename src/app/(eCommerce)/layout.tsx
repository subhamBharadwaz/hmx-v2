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
            isCommerce={true}
          />
        </header>
        <MobileNav items={eCommerceConfig.mainNav}>
          <Link
            href={user?.accessToken ? "/account" : "/login"}
            className={cn(buttonVariants({ variant: "link", size: "sm" }))}
          >
            <Icons.user />
          </Link>
          <Bag navTransparent={false} accessToken={user?.accessToken} />
          <WishList navTransparent={false} accessToken={user?.accessToken} />
        </MobileNav>
      </>

      <main className="relative mb-10 flex-1 ">{children}</main>
      <Footer />
    </div>
  )
}
