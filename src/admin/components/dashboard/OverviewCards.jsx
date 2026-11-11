import AdminCard from "../common/AdminCard";

// Reserves dashboard summary tiles without introducing placeholder analytics.
function OverviewCards() {
  const metrics = ["Total Users", "Total Streams", "Total Revenue", "Active Users"];

  return (
    <section className="admin-section" aria-labelledby="admin-overview-title">
      <h2 id="admin-overview-title">Overview</h2>
      <div className="admin-overview-grid">
        {metrics.map((metric) => (
          <AdminCard key={metric} title={metric}>
            <p className="admin-metric-placeholder">—</p>
          </AdminCard>
        ))}
      </div>
    </section>
  );
}

export default OverviewCards;
