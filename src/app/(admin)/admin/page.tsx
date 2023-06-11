import SalesByLocationChart from "@/components/admin/dashboard/charts/sales-by-location"
import TotalSalesChart from "@/components/admin/dashboard/charts/total-sales"
import Overview from "@/components/admin/dashboard/overview"
import RecentOrders from "@/components/admin/dashboard/recent-orders"
import TopSellingProducts from "@/components/admin/dashboard/top-selling-products"
import Container from "@/components/container"
import { getCurrentUser } from "@/lib/session"

export default async function AdminPage() {
  const user = await getCurrentUser()
  return (
    <div className="space-y-10">
      <Overview accessToken={user?.accessToken} />
      <div className="justify-between space-y-10 md:flex md:gap-x-3 md:space-y-0">
        <TotalSalesChart accessToken={user?.accessToken} />
        <SalesByLocationChart />
      </div>
      <div className="justify-between space-y-10 md:flex md:gap-x-3 md:space-y-0">
        <RecentOrders accessToken={user?.accessToken} />
        <TopSellingProducts />
      </div>
    </div>
  )
}
