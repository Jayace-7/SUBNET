import { FiActivity, FiCreditCard, FiPlayCircle, FiUsers } from "react-icons/fi";

import { KPI_METRICS } from "../../data/mockAnalytics";

const METRIC_ICONS = {
  users: FiUsers,
  streams: FiPlayCircle,
  revenue: FiCreditCard,
  active: FiActivity,
};

function getSparklinePath(values) {
  const width = 130;
  const height = 32;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;

  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / span) * (height - 5) - 2;
      return `${index === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
}

function OverviewCards() {
  return (
    <section className="admin-overview-grid" aria-label="Platform overview metrics">
      {KPI_METRICS.map((metric) => {
        const Icon = METRIC_ICONS[metric.icon];
        return (
          <article className="admin-kpi-card" key={metric.label}>
            <div className="admin-kpi-card__top">
              <span className="admin-kpi-card__icon"><Icon aria-hidden="true" /></span>
              <span className="admin-kpi-card__label">{metric.label}</span>
              <svg
                aria-hidden="true"
                className="admin-kpi-card__sparkline"
                preserveAspectRatio="none"
                viewBox="0 0 130 32"
              >
                <path d={getSparklinePath(metric.trend)} />
              </svg>
            </div>
            <div className="admin-kpi-card__bottom">
              <strong>{metric.value}</strong>
              <span className="admin-kpi-card__growth">
                {metric.growth}
                <small>vs previous period</small>
              </span>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default OverviewCards;
