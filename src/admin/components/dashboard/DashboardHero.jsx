import { FiCheckCircle, FiClock } from "react-icons/fi";

function DashboardHero() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="admin-dashboard__welcome" aria-labelledby="admin-dashboard-welcome">
      <div>
        <p className="admin-dashboard__eyebrow">SUBNET ADMINISTRATION</p>
        <h2 id="admin-dashboard-welcome">Welcome back, Admin.</h2>
        <p className="admin-dashboard__description">
          Monitor your streaming platform, users and content performance.
        </p>
      </div>
      <div className="admin-dashboard__hero-meta">
        <span><FiClock aria-hidden="true" />{today}</span>
        <span className="admin-dashboard__platform-status">
          <FiCheckCircle aria-hidden="true" />Demo status: online
        </span>
      </div>
    </section>
  );
}

export default DashboardHero;
