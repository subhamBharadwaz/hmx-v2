import { MainNav } from "@/components/main-nav"
import { buttonVariants } from "@/components/ui/button"
import { eCommerceConfig } from "@/config/ecommerce"
import { cn } from "@/lib/utils"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={eCommerceConfig.mainNav} />
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
