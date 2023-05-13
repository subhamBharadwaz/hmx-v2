import { AdminSidebarNav } from "@/components/admin/sidebar-nav"
import Container from "@/components/container"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { adminConfig } from "@/config/admin"
import { siteConfig } from "@/config/site"
import Link from "next/link"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 bg-background">
        <div className="container flex h-20 items-center space-x-4 sm:justify-between sm:space-x-0">
          <MainNav items={adminConfig.mainNav}>
            <AdminSidebarNav items={adminConfig.sidebarNav} />
          </MainNav>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <AdminSidebarNav items={adminConfig.sidebarNav} />
        </aside>
        <main className="w-full">
          {children}
        </main>
      </div>
    </div>
  )
}
