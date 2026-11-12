import { useState } from "react";
import { FiBarChart2 } from "react-icons/fi";

import { STREAMING_PERIODS } from "../../data/mockAnalytics";

const CHART = { left: 52, top: 16, width: 610, height: 150 };
const Y_TICKS = ["1M", "750K", "500K", "250K", "0"];

function getLinePath(values) {
  return values
    .map((value, index) => {
      const x = CHART.left + (index / (values.length - 1)) * CHART.width;
      const y = CHART.top + (1 - value / 1000) * CHART.height;
      return `${index === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
}

function StreamingAnalytics() {
  const [period, setPeriod] = useState("30D");
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const data = STREAMING_PERIODS[period];
  const chartBottom = CHART.top + CHART.height;
  const streamPath = getLinePath(data.streams);
  const userPath = getLinePath(data.users);
  const streamArea = `${streamPath} L${CHART.left + CHART.width},${chartBottom} L${CHART.left},${chartBottom} Z`;
  const xLabelIndexes = [0, 2, 4, 6, 7];

  return (
    <section className="admin-panel admin-streaming-panel" id="streaming-analytics" aria-labelledby="streaming-analytics-title">
      <header className="admin-panel__header">
        <div className="admin-panel__title-wrap">
          <span className="admin-panel__title-icon"><FiBarChart2 aria-hidden="true" /></span>
          <div>
            <h2 id="streaming-analytics-title">Streaming Analytics</h2>
            <p>Monitor platform viewing activity and streaming performance.</p>
          </div>
        </div>
        <div className="admin-range-selector" aria-label="Streaming chart date range">
          {Object.keys(STREAMING_PERIODS).map((range) => (
            <button
              aria-pressed={period === range}
              className={period === range ? "is-active" : ""}
              key={range}
              onClick={() => {
                setPeriod(range);
                setHoveredPoint(null);
              }}
              type="button"
            >
              {range}
            </button>
          ))}
        </div>
      </header>

      <div className="admin-streaming-panel__summary">
        <div><span>Total streams</span><strong>{data.totalStreams}</strong></div>
        <div><span>New users</span><strong>{data.newUsers}</strong></div>
        <div className="admin-chart-legend">
          <span><i className="admin-chart-legend__streams" />Streams</span>
          <span><i className="admin-chart-legend__users" />New users</span>
        </div>
      </div>

      <div className="admin-chart-wrap">
        <svg
          aria-label={`Streaming analytics for the last ${period}`}
          className="admin-streaming-chart"
          role="img"
          viewBox="0 0 690 210"
        >
          <defs>
            <linearGradient id="admin-stream-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#00d4c7" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#00d4c7" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="admin-user-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#168be2" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#168be2" stopOpacity="0" />
            </linearGradient>
          </defs>
          {Y_TICKS.map((label, index) => {
            const y = CHART.top + (index / (Y_TICKS.length - 1)) * CHART.height;
            return (
              <g key={label}>
                <line className="admin-streaming-chart__grid" x1={CHART.left} x2={CHART.left + CHART.width} y1={y} y2={y} />
                <text className="admin-streaming-chart__axis" textAnchor="end" x={CHART.left - 10} y={y + 4}>{label}</text>
              </g>
            );
          })}
          <path d={streamArea} fill="url(#admin-stream-area)" />
          <path d={`${userPath} L${CHART.left + CHART.width},${chartBottom} L${CHART.left},${chartBottom} Z`} fill="url(#admin-user-area)" />
          <path className="admin-streaming-chart__line admin-streaming-chart__line--streams" d={streamPath} />
          <path className="admin-streaming-chart__line admin-streaming-chart__line--users" d={userPath} />
          {xLabelIndexes.map((index) => {
            const x = CHART.left + (index / (data.labels.length - 1)) * CHART.width;
            return (
              <text className="admin-streaming-chart__axis" key={index} textAnchor="middle" x={x} y={CHART.top + CHART.height + 24}>
                {data.labels[index]}
              </text>
            );
          })}
          {data.streams.map((value, index) => {
            const x = CHART.left + (index / (data.streams.length - 1)) * CHART.width;
            const y = CHART.top + (1 - value / 1000) * CHART.height;
            const isHovered = hoveredPoint === index;
            return (
              <circle
                aria-label={`${data.labels[index]}: ${value} thousand streams and ${data.users[index]} thousand new users`}
                className={`admin-streaming-chart__point${isHovered ? " is-active" : ""}`}
                cx={x}
                cy={y}
                key={data.labels[index]}
                onBlur={() => setHoveredPoint(null)}
                onFocus={() => setHoveredPoint(index)}
                onPointerEnter={() => setHoveredPoint(index)}
                onPointerLeave={() => setHoveredPoint(null)}
                r={isHovered ? 5 : 10}
                role="button"
                tabIndex={0}
              />
            );
          })}
        </svg>
        {hoveredPoint !== null && (
          <div className="admin-chart-tooltip" role="status">
            <strong>{data.labels[hoveredPoint]}</strong>
            <span><i className="admin-chart-legend__streams" />Streams: {data.streams[hoveredPoint]}K</span>
            <span><i className="admin-chart-legend__users" />New users: {data.users[hoveredPoint]}K</span>
          </div>
        )}
      </div>
      <span className="admin-sr-only" id="reports">Reports use demonstration analytics only.</span>
    </section>
  );
}

export default StreamingAnalytics;
