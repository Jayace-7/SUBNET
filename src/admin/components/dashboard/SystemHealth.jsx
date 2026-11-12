import { useState } from "react";
import { FiActivity, FiArrowUpRight } from "react-icons/fi";

import { MOCK_SERVICES } from "../../data/mockAnalytics";

function SystemHealth() {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <section className="admin-panel admin-health-panel" id="system-health" aria-labelledby="system-health-title">
      <header className="admin-panel__header">
        <div className="admin-panel__title-wrap">
          <span className="admin-panel__title-icon"><FiActivity aria-hidden="true" /></span>
          <h2 id="system-health-title">System Health</h2>
        </div>
        <button
          aria-expanded={detailsOpen}
          className="admin-panel__text-action"
          onClick={() => setDetailsOpen((open) => !open)}
          type="button"
        >
          {detailsOpen ? "Hide Details" : "View Details"} <FiArrowUpRight aria-hidden="true" />
        </button>
      </header>
      <div className="admin-health-panel__uptime">
        <div className="admin-health-panel__ring"><strong>99.9%</strong><span>Uptime</span></div>
        <ul className="admin-service-list">
          {MOCK_SERVICES.map((service) => (
            <li key={service.name}>
              <span className="admin-service-list__status" aria-hidden="true" />
              <span>{service.name}</span>
              <strong>{service.status}</strong>
            </li>
          ))}
        </ul>
      </div>
      {detailsOpen && (
        <p className="admin-panel__disclaimer">
          Sample status and uptime values only; live services are not being monitored.
        </p>
      )}
    </section>
  );
}

export default SystemHealth;
