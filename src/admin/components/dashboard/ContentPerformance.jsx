import { useState } from "react";
import { FiArrowUpRight, FiFilm } from "react-icons/fi";

import { TOP_CONTENT } from "../../data/mockAnalytics";

const CONTENT_TABS = [
  { id: "movies", label: "Movies" },
  { id: "shows", label: "TV Shows" },
  { id: "genres", label: "Genres" },
];

function ContentPerformance() {
  const [activeTab, setActiveTab] = useState("movies");
  const [showAll, setShowAll] = useState(false);
  const content = TOP_CONTENT[activeTab];

  return (
    <section className="admin-panel admin-content-panel" id="content-management" aria-labelledby="content-performance-title">
      <header className="admin-panel__header admin-content-panel__header">
        <div className="admin-panel__title-wrap">
          <span className="admin-panel__title-icon"><FiFilm aria-hidden="true" /></span>
          <div>
            <h2 id="content-performance-title">Content Performance</h2>
            <p>Top performing titles and genres.</p>
          </div>
        </div>
        <button
          aria-expanded={showAll}
          className="admin-panel__text-action"
          onClick={() => setShowAll((expanded) => !expanded)}
          type="button"
        >
          {showAll ? "Top 5" : "View All"} <FiArrowUpRight aria-hidden="true" />
        </button>
      </header>

      <div className="admin-content-panel__tabs" role="tablist" aria-label="Content category">
        {CONTENT_TABS.map((tab) => (
          <button
            aria-selected={activeTab === tab.id}
            className={activeTab === tab.id ? "is-active" : ""}
            id={`content-tab-${tab.id}`}
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setShowAll(false);
            }}
            role="tab"
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ol className="admin-content-list" role="tabpanel" aria-labelledby={`content-tab-${activeTab}`}>
        {content.slice(0, showAll ? content.length : 5).map((item, index) => (
          <li className="admin-content-list__item" key={item.title}>
            <span className="admin-content-list__rank">{index + 1}</span>
            <img alt="" className="admin-content-list__poster" loading="lazy" src={item.image} />
            <div className="admin-content-list__details">
              <strong>{item.title}</strong>
              <span>{item.category}</span>
              <div className="admin-content-list__bar" aria-hidden="true">
                <span style={{ width: `${Math.max(28, 100 - index * 10)}%` }} />
              </div>
            </div>
            <span className="admin-content-list__views">{item.views}<small>views</small></span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default ContentPerformance;
