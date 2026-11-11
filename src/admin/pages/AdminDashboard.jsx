import ContentPerformance from "../components/dashboard/ContentPerformance";
import OverviewCards from "../components/dashboard/OverviewCards";
import RecentActivity from "../components/dashboard/RecentActivity";
import StreamingAnalytics from "../components/dashboard/StreamingAnalytics";
import SubscriptionOverview from "../components/dashboard/SubscriptionOverview";
import SystemHealth from "../components/dashboard/SystemHealth";
import AdminLayout from "../components/layout/AdminLayout";

// Composes the dashboard sections without wiring analytics or service data.
function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <OverviewCards />
        <StreamingAnalytics />
        <ContentPerformance />
        <SystemHealth />
        <RecentActivity />
        <SubscriptionOverview />
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
