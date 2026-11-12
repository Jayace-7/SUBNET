import { useEffect, useMemo, useRef, useState } from "react";
import {
  FiBell,
  FiChevronDown,
  FiGrid,
  FiMenu,
  FiSearch,
  FiX,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import { MOCK_ADMIN_PROFILE } from "../../data/mockAdminProfile";
import { MOCK_ACTIVITY, TOP_CONTENT } from "../../data/mockAnalytics";

const SEARCH_ITEMS = [
  { label: "Overview and users", target: "/admin/dashboard#overview" },
  { label: "Content management", target: "/admin/dashboard#content-management" },
  { label: "Subscriptions and billing", target: "/admin/dashboard#subscription-overview" },
  { label: "Streaming analytics", target: "/admin/dashboard#streaming-analytics" },
  { label: "Reports", target: "/admin/dashboard#reports" },
  { label: "System health", target: "/admin/dashboard#system-health" },
  { label: "Notifications", target: "/admin/dashboard#admin-notifications" },
  { label: "Settings", target: "/admin/settings" },
  { label: "Admin profile", target: "/admin/profile" },
  ...Object.values(TOP_CONTENT).flat().map((item) => ({
    label: item.title,
    target: "/admin/dashboard#content-management",
  })),
  ...MOCK_ACTIVITY.map((activity) => ({
    label: activity.detail,
    target: "/admin/dashboard#recent-activity",
  })),
];

function AdminHeader({
  title = "Dashboard",
  isSidebarOpen,
  notifications,
  onMarkAllNotificationsRead,
  onMarkNotificationRead,
  onMenuToggle,
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const initials = MOCK_ADMIN_PROFILE.fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
  const unreadCount = notifications.filter((notification) => notification.unread).length;
  const searchResults = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    return query
      ? SEARCH_ITEMS.filter((item) => item.label.toLowerCase().includes(query))
      : [];
  }, [searchValue]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setProfileOpen(false);
        setNotificationsOpen(false);
        setSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        setProfileOpen(false);
        setNotificationsOpen(false);
        setSearchOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  function submitSearch(event) {
    event.preventDefault();
    if (searchResults.length === 0) return;
    navigate(searchResults[0].target);
    setSearchOpen(false);
    setSearchValue("");
  }

  return (
    <header className="admin-header" ref={headerRef}>
      <div className="admin-header__leading">
        <button
          aria-expanded={isSidebarOpen}
          aria-label={isSidebarOpen ? "Close admin navigation" : "Open admin navigation"}
          className="admin-header__menu-toggle"
          onClick={onMenuToggle}
          type="button"
        >
          {isSidebarOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>
        <div className="admin-header__heading">
          <p className="admin-header__breadcrumb"><FiGrid aria-hidden="true" /> Admin <span>/</span> {title}</p>
          <h1>{title}</h1>
        </div>
      </div>

      <form className="admin-header__search" onSubmit={submitSearch} role="search">
        <FiSearch aria-hidden="true" />
        <input
          aria-expanded={searchOpen && searchValue.trim().length > 0}
          aria-label="Search users, content or reports"
          autoComplete="off"
          onBlur={() => window.setTimeout(() => setSearchOpen(false), 120)}
          onChange={(event) => {
            setSearchValue(event.target.value);
            setSearchOpen(true);
            setProfileOpen(false);
            setNotificationsOpen(false);
          }}
          onFocus={() => {
            setSearchOpen(true);
            setProfileOpen(false);
            setNotificationsOpen(false);
          }}
          placeholder="Search users, content, or reports..."
          ref={searchInputRef}
          value={searchValue}
        />
        <kbd>Ctrl K</kbd>
        {searchOpen && searchValue.trim().length > 0 && (
          <div className="admin-header__search-results">
            {searchResults.length > 0 ? searchResults.map((item) => (
              <Link
                key={item.label}
                onClick={() => {
                  setSearchOpen(false);
                  setSearchValue("");
                }}
                to={item.target}
              >
                <FiSearch aria-hidden="true" />{item.label}
              </Link>
            )) : <p>No matching admin sections.</p>}
          </div>
        )}
      </form>

      <div className="admin-header__actions">
        <span className="admin-header__system-status">
        <i aria-hidden="true" />Demo status
        </span>
        <div className="admin-header__action-wrap" id="admin-notifications">
          <button
            aria-controls="admin-notifications-menu"
            aria-expanded={notificationsOpen}
            aria-haspopup="menu"
            aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
            className="admin-header__icon-button"
            onClick={() => {
              setNotificationsOpen((open) => !open);
              setProfileOpen(false);
              setSearchOpen(false);
            }}
            type="button"
          >
            <FiBell aria-hidden="true" />
            {unreadCount > 0 && <span className="admin-header__unread-badge">{unreadCount}</span>}
          </button>
          {notificationsOpen && (
            <div className="admin-header__dropdown admin-header__notifications" id="admin-notifications-menu" role="menu">
              <div className="admin-header__dropdown-heading">
                <strong>Notifications</strong>
                <button onClick={onMarkAllNotificationsRead} type="button">Mark all read</button>
              </div>
              {notifications.map((notification) => (
                <button
                  aria-label={`${notification.title}: ${notification.detail}. Mark read`}
                  className={`admin-notification${notification.unread ? " is-unread" : ""}`}
                  key={notification.id}
                  onClick={() => onMarkNotificationRead(notification.id)}
                  role="menuitem"
                  type="button"
                >
                  <span className="admin-notification__dot" />
                  <span>
                    <strong>{notification.title}</strong>
                    <small>{notification.detail}</small>
                    <time>{notification.time}</time>
                  </span>
                </button>
              ))}
              <p className="admin-header__demo-label">Sample notifications only</p>
            </div>
          )}
        </div>

        <div className="admin-header__action-wrap">
          <button
            aria-controls="admin-profile-menu"
            aria-expanded={profileOpen}
            aria-haspopup="menu"
            aria-label="Open admin profile menu"
            className="admin-header__profile-trigger"
            onClick={() => {
              setProfileOpen((open) => !open);
              setNotificationsOpen(false);
              setSearchOpen(false);
            }}
            type="button"
          >
            <span className="admin-header__avatar" aria-hidden="true">{initials || "AD"}</span>
            <span className="admin-header__profile-copy">
              <strong>{MOCK_ADMIN_PROFILE.fullName.split(" ")[0]}</strong>
              <small>Administrator</small>
            </span>
            <FiChevronDown aria-hidden="true" className={profileOpen ? "is-open" : ""} />
          </button>
          {profileOpen && (
            <div className="admin-header__dropdown admin-header__profile-menu" id="admin-profile-menu" role="menu">
              <div className="admin-header__dropdown-user">
                <strong>{MOCK_ADMIN_PROFILE.fullName}</strong>
                <span>{MOCK_ADMIN_PROFILE.role}</span>
              </div>
              <Link onClick={() => setProfileOpen(false)} role="menuitem" to="/admin/profile">Profile</Link>
              <Link onClick={() => setProfileOpen(false)} role="menuitem" to="/admin/settings">Settings</Link>
              <Link onClick={() => setProfileOpen(false)} role="menuitem" to="/admin/login">Logout</Link>
              <p className="admin-header__demo-label">Demo account</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
