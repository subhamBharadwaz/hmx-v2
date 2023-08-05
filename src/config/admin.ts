import { AdminConfig } from "@/types"

export const adminConfig: AdminConfig = {
  mainNav: [],
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
