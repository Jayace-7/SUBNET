import {
  FiActivity,
  FiBarChart2,
  FiBell,
  FiCreditCard,
  FiFileText,
  FiFolder,
  FiGrid,
  FiLogOut,
  FiSettings,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

import Logo from "../../../components/common/Logo";
import { MOCK_ADMIN_PROFILE } from "../../data/mockAdminProfile";

const NAV_GROUPS = [
  {
    label: "Main Menu",
    items: [
      { label: "Overview", to: "/admin/dashboard#overview", hash: "#overview", icon: FiGrid },
      { label: "Users", to: "/admin/dashboard#users", hash: "#users", icon: FiUsers },
      { label: "Content Management", to: "/admin/dashboard#content-management", hash: "#content-management", icon: FiFolder },
      { label: "Subscriptions & Billing", to: "/admin/dashboard#subscription-overview", hash: "#subscription-overview", icon: FiCreditCard },
    ],
  },
  {
    label: "Analytics",
    items: [
      { label: "Streaming Analytics", to: "/admin/dashboard#streaming-analytics", hash: "#streaming-analytics", icon: FiBarChart2 },
      { label: "Reports", to: "/admin/dashboard#reports", hash: "#reports", icon: FiFileText },
    ],
  },
  {
    label: "System",
    items: [
      { label: "System Health", to: "/admin/dashboard#system-health", hash: "#system-health", icon: FiActivity },
      { label: "Notifications", to: "/admin/dashboard#admin-notifications", hash: "#admin-notifications", icon: FiBell },
      { label: "Settings", to: "/admin/settings", icon: FiSettings },
    ],
  },
];

function AdminSidebar({ isOpen, onNavigate, unreadCount }) {
  const { pathname, hash } = useLocation();
  const initials = MOCK_ADMIN_PROFILE.fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  function isActive(item) {
    if (item.to === "/admin/settings") return pathname === item.to;
    return pathname === "/admin/dashboard" && (hash === item.hash || (!hash && item.label === "Overview"));
  }

  return (
    <>
      {isOpen && (
        <button
          aria-label="Close admin navigation"
          className="admin-sidebar__scrim"
          onClick={onNavigate}
          type="button"
        />
      )}
      <aside className={`admin-sidebar${isOpen ? " admin-sidebar--open" : ""}`} aria-label="Admin navigation">
        <div className="admin-sidebar__brand">
          <Logo height={36} className="admin-sidebar__logo" />
          <span>ADMIN</span>
        </div>
        <nav className="admin-sidebar__nav">
          {NAV_GROUPS.map((group) => (
            <section className="admin-sidebar__group" key={group.label}>
              <h2>{group.label}</h2>
              <ul>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item);
                  return (
                    <li key={item.label}>
                      <Link
                        aria-current={active ? "page" : undefined}
                        className={`admin-sidebar__link${active ? " admin-sidebar__link--active" : ""}`}
                        onClick={onNavigate}
                        to={item.to}
                      >
                        <Icon aria-hidden="true" />
                        <span>{item.label}</span>
                        {item.label === "Notifications" && unreadCount > 0 && (
                          <span className="admin-sidebar__badge">{unreadCount}</span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </nav>
        <div className="admin-sidebar__account">
          <div className="admin-sidebar__account-heading">
            <span className="admin-sidebar__avatar" aria-hidden="true">{initials || "AD"}</span>
            <span className="admin-sidebar__account-copy">
              <strong>{MOCK_ADMIN_PROFILE.fullName}</strong>
              <small>Administrator</small>
            </span>
          </div>
          <Link
            aria-current={pathname === "/admin/profile" ? "page" : undefined}
            className={`admin-sidebar__account-link${pathname === "/admin/profile" ? " admin-sidebar__account-link--active" : ""}`}
            onClick={onNavigate}
            to="/admin/profile"
          >
            <FiShield aria-hidden="true" />Profile
          </Link>
          <Link className="admin-sidebar__account-link" onClick={onNavigate} to="/admin/login">
            <FiLogOut aria-hidden="true" />Logout
          </Link>
          <p>Demo administrator account</p>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
