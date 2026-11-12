import { useState } from "react";
import { FiActivity, FiArrowUpRight, FiCreditCard, FiPlay, FiSettings, FiUserPlus } from "react-icons/fi";

import { MOCK_ACTIVITY } from "../../data/mockAnalytics";

const ACTIVITY_ICONS = {
  user: FiUserPlus,
  play: FiPlay,
  subscription: FiCreditCard,
  settings: FiSettings,
};

function RecentActivity() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="admin-panel admin-activity-panel" id="recent-activity" aria-labelledby="recent-activity-title">
      <header className="admin-panel__header">
        <div className="admin-panel__title-wrap">
          <span className="admin-panel__title-icon"><FiActivity aria-hidden="true" /></span>
          <h2 id="recent-activity-title">Recent Activity</h2>
        </div>
        <button
          aria-expanded={showAll}
          className="admin-panel__text-action"
          onClick={() => setShowAll((expanded) => !expanded)}
          type="button"
        >
          {showAll ? "Show Less" : "View All"} <FiArrowUpRight aria-hidden="true" />
        </button>
      </header>
      <ul className="admin-activity-list">
        {MOCK_ACTIVITY.slice(0, showAll ? MOCK_ACTIVITY.length : 4).map((activity, index) => {
          const Icon = ACTIVITY_ICONS[activity.icon];
          return (
            <li className="admin-activity-list__item" key={`${activity.message}-${index}`}>
              <span className={`admin-activity-list__icon admin-activity-list__icon--${activity.icon}`}>
                <Icon aria-hidden="true" />
              </span>
              <span className="admin-activity-list__copy">
                <strong>{activity.message}</strong>
                <small>{activity.detail}</small>
              </span>
              <time>{activity.time}</time>
            </li>
          );
        })}
      </ul>
      <p className="admin-panel__disclaimer">Example activity only; no live account events are connected.</p>
    </section>
  );
}

export default RecentActivity;
