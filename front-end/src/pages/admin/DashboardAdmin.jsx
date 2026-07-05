import RecentOrders from "../../Components/admin/dashboard/RecentOrders";
import SalesChart from "../../Components/admin/dashboard/SalesChart";
import StatsCards from "../../Components/admin/dashboard/StatsCards";
import UpgradeBanner from "../../Components/admin/dashboard/UpgradeBanner";


export default function DashboardAdmin() {
  return (
    <main className="flex-1 p-lg max-w-7xl mx-auto w-full">
      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        <SalesChart />
        <RecentOrders />
      </div>

      <UpgradeBanner />
    </main>
  );
}
