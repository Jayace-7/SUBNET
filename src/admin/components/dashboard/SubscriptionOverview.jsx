import { FiArrowUpRight, FiCreditCard } from "react-icons/fi";

import { SUBSCRIPTION_DISTRIBUTION } from "../../data/mockAnalytics";

function SubscriptionOverview() {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;

  return (
    <section className="admin-panel admin-subscription-panel" id="subscription-overview" aria-labelledby="subscription-overview-title">
      <header className="admin-panel__header">
        <div className="admin-panel__title-wrap">
          <span className="admin-panel__title-icon"><FiCreditCard aria-hidden="true" /></span>
          <h2 id="subscription-overview-title">Subscription Overview</h2>
        </div>
        <a className="admin-panel__text-action" href="/admin/settings#subscriptions">
          View Report <FiArrowUpRight aria-hidden="true" />
        </a>
      </header>
      <div className="admin-subscription-panel__summary">
        <strong>12,480</strong>
        <span>active subscribers <small>sample total</small></span>
      </div>
      <div className="admin-subscription-panel__content">
        <div className="admin-donut">
          <svg aria-label="Subscription distribution: Premium 68%, Standard 24%, Basic 8%" role="img" viewBox="0 0 120 120">
            <circle className="admin-donut__track" cx="60" cy="60" r={radius} />
            {SUBSCRIPTION_DISTRIBUTION.map((plan, index) => {
              const dashLength = (plan.percentage / 100) * circumference;
              const accumulatedPercentage = SUBSCRIPTION_DISTRIBUTION
                .slice(0, index)
                .reduce((total, previousPlan) => total + previousPlan.percentage, 0);
              const offset = -(accumulatedPercentage / 100) * circumference;
              return (
                <circle
                  className="admin-donut__segment"
                  cx="60"
                  cy="60"
                  key={plan.label}
                  r={radius}
                  stroke={plan.color}
                  strokeDasharray={`${dashLength} ${circumference}`}
                  strokeDashoffset={offset}
                />
              );
            })}
          </svg>
          <div className="admin-donut__center">
            <strong>68%</strong>
            <span>Premium</span>
          </div>
        </div>
        <ul className="admin-subscription-legend">
          {SUBSCRIPTION_DISTRIBUTION.map((plan) => (
            <li key={plan.label}>
              <span className="admin-subscription-legend__name">
                <i style={{ backgroundColor: plan.color }} />
                {plan.label}
              </span>
              <strong>{plan.percentage}%<small>{plan.subscribers}</small></strong>
            </li>
          ))}
        </ul>
      </div>
      <p className="admin-panel__disclaimer">Demonstration plan distribution; not connected to billing data.</p>
    </section>
  );
}

export default SubscriptionOverview;
