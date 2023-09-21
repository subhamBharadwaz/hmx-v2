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
      <header className="sticky top-0 z-40 bg-background"></header>
      <main className="mb-20 w-full">{children}</main>
    </div>
  )
}
