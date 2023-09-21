import { AdminSidebarNav } from "@/components/admin/sidebar-nav"
import { Bag } from "@/components/bag"
import Container from "@/components/container"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { UserAccountNav } from "@/components/user-account-nav"
import { WishList } from "@/components/wishlist"
import { adminConfig } from "@/config/admin"
import { getCurrentUser } from "@/lib/session"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const user = await getCurrentUser()

  return (
    <div className="flex min-h-screen flex-col">
      <>
        <header className="sticky top-0 z-40 hidden bg-background md:block">
          <div className="container flex h-16 items-center justify-between py-4">
            <MainNav
              accessToken={user?.accessToken}
              items={adminConfig?.sidebarNav}
            />
            <div className="hidden items-center gap-x-5 md:flex">
              <UserAccountNav
                user={{
                  firstName: user?.user?.firstName as string,
                  lastName: user?.user?.lastName as string,
                  email: user?.user?.email as string,
                  photo: user?.user?.photo?.secure_url as string,
                }}
              />
              <ModeToggle />
            </div>
          </div>
        </header>
        <MobileNav items={adminConfig.mainNav}>
          <UserAccountNav
            user={{
              firstName: user?.user?.firstName as string,
              lastName: user?.user?.lastName as string,
              email: user?.user?.email as string,
              photo: user?.user?.photo?.secure_url as string,
            }}
          />
          <ModeToggle />
        </MobileNav>
      </>

      <div className="container my-28 grid flex-1 gap-12 md:mt-0 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <AdminSidebarNav items={adminConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
