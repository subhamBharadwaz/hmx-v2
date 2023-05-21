import Container from "@/components/container"
import { MainNav } from "@/components/main-nav"
import { UserAccountNav } from "@/components/user-account-nav"
import { eCommerceConfig } from "@/config/ecommerce"
import { getCurrentUser } from "@/lib/session"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const user = await getCurrentUser()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 bg-background">
        <Container className="flex h-20 items-center justify-between py-6">
          <MainNav
            items={eCommerceConfig.mainNav}
            accessToken={user?.accessToken}
          />
        </Container>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
