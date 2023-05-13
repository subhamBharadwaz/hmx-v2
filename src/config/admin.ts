
import { AdminConfig } from "@/types"

export const adminConfig: AdminConfig = {
  mainNav: [
    {
      title: "Men",
      href: "/products/men",
    },
    {
      title: "Women",
      href: "/products/women",
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
