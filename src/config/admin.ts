import { AdminConfig } from "@/types"

export const adminConfig: AdminConfig = {
  mainNav: [
    {
      title: "Dashboard",
      href: "/admin",
    },
    {
      title: "Products",
      href: "/admin/products",
    },
    {
      title: "Orders",
      href: "/admin/orders",
    },
    {
      title: "Users",
      href: "/admin/users",
    },
  ],
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/admin",
      icon: "dashboard",
    },
    {
      title: "Products",
      href: "/admin/products",
      icon: "product",
    },
    {
      title: "Orders",
      href: "/admin/orders",
      icon: "shipping",
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: "user",
    },
  ],
}
