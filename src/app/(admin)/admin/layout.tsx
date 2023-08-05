import { AdminSidebarNav } from "@/components/admin/sidebar-nav"
import Container from "@/components/container"
import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { UserAccountNav } from "@/components/user-account-nav"
import { adminConfig } from "@/config/admin"
import { getCurrentUser } from "@/lib/session"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const user = await getCurrentUser()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav
            accessToken={user?.accessToken}
            items={adminConfig?.sidebarNav}
          />
          <div className="flex items-center gap-x-5">
            <UserAccountNav
              user={{
                firstName: user?.user?.firstName,
                lastName: user?.user?.lastName,
                email: user?.user?.email,
                photo: user?.user?.photo?.secure_url,
              }}
            />
            <ModeToggle />
          </div>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
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
