import type { Icon } from "lucide-react"

export type NavItem = {
  title: string
  href: string
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string

  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage?: string
  links: {
    twitter: string
    github: string
    linkedin: string
  }
}

export type ECommerceConfig = {
  mainNav: MainNavItem[]
}

export type AdminConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}
