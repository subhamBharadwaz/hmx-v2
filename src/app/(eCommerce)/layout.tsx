
import Container from "@/components/container"
import { MainNav } from "@/components/main-nav"
import { eCommerceConfig } from "@/config/ecommerce"


interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 bg-background">
        <Container className="flex h-20 items-center justify-between py-6">
          <MainNav items={eCommerceConfig.mainNav} />   
        </Container>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
