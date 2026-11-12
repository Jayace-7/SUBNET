import adminHero from "../assets/images/admin hero.webp";
import ContentPerformance from "../components/dashboard/ContentPerformance";
import DashboardHero from "../components/dashboard/DashboardHero";
import OverviewCards from "../components/dashboard/OverviewCards";
import RecentActivity from "../components/dashboard/RecentActivity";
import StreamingAnalytics from "../components/dashboard/StreamingAnalytics";
import SubscriptionOverview from "../components/dashboard/SubscriptionOverview";
import SystemHealth from "../components/dashboard/SystemHealth";
import AdminLayout from "../components/layout/AdminLayout";

// Composes the dashboard from mock metrics, artwork and activity.
function AdminDashboard() {
  return (
    <AdminLayout contentClassName="admin-content--dashboard">
      <div className="admin-dashboard">
        <div
          className="admin-dashboard__hero"
          style={{ "--admin-dashboard-hero": `url("${adminHero}")` }}
        >
          <DashboardHero />
        </div>
        <div className="admin-dashboard__overview" id="overview">
          <span className="admin-anchor" id="users" />
          <OverviewCards />
        </div>
        <div className="admin-dashboard__analytics-grid">
          <StreamingAnalytics />
          <ContentPerformance />
        </div>
        <div className="admin-dashboard__lower-grid">
          <SystemHealth />
          <RecentActivity />
          <SubscriptionOverview />
        </div>
        <p className="admin-dashboard__demo-note">
          All dashboard metrics and status indicators are demonstration data, not live platform information.
        </p>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
