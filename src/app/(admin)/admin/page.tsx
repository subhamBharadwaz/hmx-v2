import OverviewCard from "@/components/admin/dashboard/card"
import SalesByLocationChart from "@/components/admin/dashboard/charts/sales-by-location"
import TotalSalesChart from "@/components/admin/dashboard/charts/total-sales"
import RecentOrders from "@/components/admin/dashboard/recent-orders"
import TopSellingProducts from "@/components/admin/dashboard/top-selling-products"
import Container from "@/components/container"

export default function AdminPage() {
  return (
    <div className="space-y-10">
      <div className="justify-between gap-3 space-y-3 md:flex md:space-y-0">
        <OverviewCard />
        <OverviewCard />
        <OverviewCard />
        <OverviewCard />
      </div>
      <div className="justify-between space-y-10 md:flex md:gap-x-3 md:space-y-0">
        <TotalSalesChart />
        <SalesByLocationChart />
      </div>
      <div className="justify-between space-y-10 md:flex md:gap-x-3 md:space-y-0">
        <RecentOrders />
        <TopSellingProducts/>
      </div>
    </div>
  )
}
