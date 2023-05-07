import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { buttonVariants } from "@/components/ui/button"
import { eCommerceConfig } from "@/config/ecommerce"
import { cn } from "@/lib/utils"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={eCommerceConfig.mainNav} />
         
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
