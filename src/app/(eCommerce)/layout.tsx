import Container from "@/components/container"
import Footer from "@/components/footer"
import { MainNav } from "@/components/main-nav"
import { eCommerceConfig } from "@/config/ecommerce"
import { getCurrentUser } from "@/lib/session"

interface ECommerceLayoutProps {
  children: React.ReactNode
}

export default async function ECommerceLayout({
  children,
}: ECommerceLayoutProps) {
  const user = await getCurrentUser()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 z-40 w-full">
        <MainNav
          items={eCommerceConfig.mainNav}
          accessToken={user?.accessToken}
          isCommerce={true}
        />
      </header>
      <main className="relative mb-10 flex-1 ">{children}</main>
      <Footer />
    </div>
  )
}
