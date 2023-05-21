import Container from "@/components/container"
import { MainNav } from "@/components/main-nav"
import { eCommerceConfig } from "@/config/ecommerce"
import { getCurrentUser } from "@/lib/session"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function CheckoutLayout({
  children,
}: MarketingLayoutProps) {
  const user = await getCurrentUser()

  return (
    <div>
      <header className="sticky top-0 z-40 bg-background">
        
      </header>
      <main className="w-full">{children}</main>
    </div>
  )
}
