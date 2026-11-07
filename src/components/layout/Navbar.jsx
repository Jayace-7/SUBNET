import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FiBell,
  FiBookmark,
  FiChevronDown,
  FiFilm,
  FiHome,
  FiLogOut,
  FiSettings,
  FiTv,
} from "react-icons/fi";

import Logo from "../common/Logo";
import ProfileAvatar from "../common/ProfileAvatar";
import { useNotifications } from "../notifications/NotificationsContext";
import Search from "../../pages/Search/Search";

const NAV_LINKS = [
  { label: "Home", to: "/", icon: FiHome, end: true },
  { label: "Movies", to: "/movies", icon: FiFilm },
  { label: "TV Shows", to: "/tv-shows", icon: FiTv },
  { label: "My List", to: "/my-list", icon: FiBookmark },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useNotifications();
  const desktopProfileRef = useRef(null);
  const mobileProfileRef = useRef(null);
  const settingsRef = useRef(null);
  const notificationsPanelRef = useRef(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const unreadCount = notifications.filter(({ unread }) => unread).length;

  // The background changes on scroll, while the border animation remains a
  // separate visual treatment so one behavior does not control the other.
  useEffect(() => {
    const handleScroll = (event) => {
      const pageScrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      const searchScrollPosition =
        event?.target?.id === "subnet-search-results"
          ? event.target.scrollTop
          : 0;
      setScrolled(
        pathname === "/search" ||
          Math.max(pageScrollPosition, searchScrollPosition) > 40,
      );
    };

    handleScroll();
    // Recheck after route changes, once the browser has applied scroll restoration.
    const frameId = window.requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, {
      capture: true,
      passive: true,
    });
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [pathname]);

  // Close the profile menu when the user clicks outside of it.
  useEffect(() => {
    const handlePointerDown = (event) => {
      if (
        !desktopProfileRef.current?.contains(event.target) &&
        !mobileProfileRef.current?.contains(event.target)
      ) {
        setProfileOpen(false);
      }
      if (!settingsRef.current?.contains(event.target)) setSettingsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  useEffect(() => {
    if (!profileOpen && !settingsOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setProfileOpen(false);
        setSettingsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [profileOpen, settingsOpen]);

  // Keep the dropdown open for clicks on either responsive bell; close it elsewhere.
  useEffect(() => {
    const handlePointerDown = (event) => {
      const clickedTrigger =
        event.target instanceof Element &&
        event.target.closest("[data-notification-trigger]");
      if (!notificationsPanelRef.current?.contains(event.target) && !clickedTrigger) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  useEffect(() => {
    if (!notificationsOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setNotificationsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [notificationsOpen]);

  // Prevent the page behind the mobile drawer from scrolling.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Escape is a reliable way to close the mobile drawer.
  useEffect(() => {
    if (!mobileOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const goToSearch = () => {
    navigate("/search");
    setMobileOpen(false);
  };

  const closeProfile = () => setProfileOpen(false);
  const closeSettings = () => setSettingsOpen(false);
  const toggleNotifications = () => setNotificationsOpen((open) => !open);
  const openMobileNotifications = () => {
    setMobileOpen(false);
    setNotificationsOpen(true);
  };

  return (
    <>
      {/*
        The outer header only handles positioning. The rounded inner nav is
        the visual surface that receives the SUBNET animated border.
      */}
     <header
        className="fixed inset-x-0 top-0 z-50 flex w-full justify-center cursor-pointer"
      >
       <div
        className={`subnet-glow-border w-full transition-[background-color,backdrop-filter,box-shadow] duration-500 ${scrolled ? "subnet-glow-border--active bg-[#080B0B]/95 shadow-[0_8px_30px_rgba(0,212,199,0.18),0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl" : "bg-transparent shadow-none backdrop-blur-none"}`}
  >
         <nav
             className={`relative flex h-17 items-center justify-between px-6 sm:h-18 sm:px-8 lg:px-10`}>
            {/* Keep the brand and page navigation as one left-aligned group.
                The remaining flex space intentionally creates a calm centre gap. */}
            <div className="hidden min-w-0 items-center lg:flex">
              <Link
                to="/"
                aria-label="SUBNET Home"
                className="flex shrink-0 items-center gap-3"
                onClick={() => setMobileOpen(false)}
              >
                <Logo height={48} className="sm:hidden" />
                <Logo height={48} className="hidden sm:block" />
              </Link>

              {/* Desktop navigation links. */}
              <ul className="ml-8 flex items-center gap-7 xl:ml-10 xl:gap-9 mt-4">
                {NAV_LINKS.map(({ label, to, end }) => (<li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      `group relative inline-flex py-2 text-[15px] font-medium tracking-[0.01em] transition-colors duration-200 ${
                        isActive
                          ? "text-[#00D4C7] [text-shadow:0_0_10px_rgba(0,212,199,0.8)]"
                          : "text-white/85 hover:text-[#00D4C7]"
                      }`
                    }
                  >
                    {label}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-[#00D4C7] transition-transform duration-300 ease-out group-hover:scale-x-100"
                    />
                  </NavLink>
                </li>))}
              </ul>
            </div>

            {/* Desktop actions. */}
            <div className="hidden items-center gap-1 lg:flex mt-3">
              <Search />

              <span className="mx-2 h-7 w-px bg-white/15" aria-hidden="true" />

              <button
                type="button"
                onClick={toggleNotifications}
                aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
                aria-expanded={notificationsOpen}
                aria-controls="subnet-notifications"
                data-notification-trigger
                className="relative rounded-full p-2.5 text-white/85 transition-colors duration-200 hover:text-[#00D4C7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B8A9] *:cursor-pointer"
              >
                <FiBell size={21} strokeWidth={1.8} />
                {unreadCount > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full border border-[#080B0B] bg-[#00D4C7] px-1 text-[9px] font-bold leading-none text-[#061110]">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>

              <span className="mx-2 h-7 w-px bg-white/15" aria-hidden="true" />

              <div className="relative" ref={desktopProfileRef}>
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen((open) => !open);
                    setSettingsOpen(false);
                  }}
                  aria-label="Open profile menu"
                  aria-haspopup="menu"
                  aria-expanded={profileOpen}
                  aria-controls="subnet-profile-menu"
                  className="flex items-center gap-2 rounded-full p-1.5 text-white/85 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B8A9]"
                >
                  <ProfileAvatar className="h-9 w-9 text-xs" />
                  <FiChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {profileOpen && (
                  <div
                    id="subnet-profile-menu"
                    role="menu"
                    className="absolute right-0 top-[calc(100%+10px)] w-64 overflow-hidden rounded-2xl border border-[#00B8A9]/25 bg-[#080B0B]/98 p-2 shadow-[0_18px_45px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-3 border-b border-white/8 px-3 py-3">
                      <ProfileAvatar className="h-11 w-11 text-xs" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">Benjamin Ekam</p>
                        <p className="mt-0.5 text-xs text-white/45">SUBNET member</p>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      role="menuitem"
                      onClick={closeProfile}
                      className="mt-1 flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-white/85 transition-colors hover:bg-[#00D4C7]/10 hover:text-[#00D4C7]"
                    >
                      View profile <FiChevronDown className="h-4 w-4 -rotate-90" />
                    </Link>
                  </div>
                )}
              </div>

              <div className="relative ml-1" ref={settingsRef}>
                <button
                  type="button"
                  onClick={() => {
                    setSettingsOpen((open) => !open);
                    setProfileOpen(false);
                  }}
                  aria-label="Settings and logout"
                  aria-haspopup="menu"
                  aria-expanded={settingsOpen}
                  aria-controls="subnet-settings-menu"
                  className="rounded-full p-2.5 text-white/75 transition-colors duration-200 hover:bg-white/5 hover:text-[#00D4C7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B8A9]"
                >
                  <FiSettings size={19} strokeWidth={1.8} />
                </button>
                {settingsOpen && (
                  <div
                    id="subnet-settings-menu"
                    role="menu"
                    className="absolute right-0 top-[calc(100%+10px)] w-48 overflow-hidden rounded-xl border border-[#00B8A9]/25 bg-[#080B0B]/98 p-1.5 shadow-[0_18px_45px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                  >
                    <Link
                      to="/settings"
                      role="menuitem"
                      onClick={closeSettings}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-white/85 transition-colors hover:bg-white/5 hover:text-[#00D4C7]"
                    >
                      <FiSettings size={16} /> Settings
                    </Link>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={closeSettings}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-white/85 transition-colors hover:bg-white/5 hover:text-[#00D4C7]"
                    >
                      <FiLogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ==================================================
                MOBILE TOP BAR
                - Hamburger button stays on the LEFT
                - Sidebar opens from the LEFT
                - Sidebar uses approximately 40% viewport width
                - Desktop navbar is NOT affected
            ================================================== */}
            <div className="absolute inset-0 flex items-center justify-between px-8 lg:hidden">

              {/* Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-[#00B8A9] bg-[#080B0B]/90 shadow-[0_0_18px_rgba(0,184,169,0.18)] transition-all duration-300 hover:bg-[#00B8A9]/10"
              >
                <span className="flex w-7 flex-col gap-1.5">
                  <span className="block h-0.5 w-7 rounded-full bg-white" />
                  <span className="block h-0.5 w-7 rounded-full bg-white" />
                  <span className="block h-0.5 w-7 rounded-full bg-white" />
                </span>
              </button>

              {/* Center Logo */}
              <Link
                to="/"
                aria-label="SUBNET Home"
                className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3"
                onClick={() => setMobileOpen(false)}
              >
                <Logo height={48} />
              </Link>

              {/* Right Side */}
              <div className="flex items-center gap-3">

                {/* Search */}
                <button
                  type="button"
                  onClick={goToSearch}
                  aria-label="Search"
                  className="text-white transition-colors duration-300 hover:text-[#00D4C7]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-7 w-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-4-4" />
                  </svg>
                </button>

                {/* Mobile notification bell opens the same responsive dropdown. */}
                <button
                  type="button"
                  onClick={toggleNotifications}
                  aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
                  aria-expanded={notificationsOpen}
                  aria-controls="subnet-notifications"
                  data-notification-trigger
                  className="relative flex h-9 w-9 items-center justify-center text-white transition-colors duration-300 hover:text-[#00D4C7]"
                >
                  <FiBell size={22} strokeWidth={1.8} />
                  {unreadCount > 0 && (
                    <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full border border-[#080B0B] bg-[#00D4C7] px-1 text-[9px] font-bold leading-none text-[#061110]">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>

                {/* Profile */}
                <div className="relative" ref={mobileProfileRef}>
                  <button
                    type="button"
                    onClick={() => setProfileOpen((open) => !open)}
                    aria-label="Open profile menu"
                    aria-haspopup="menu"
                    aria-expanded={profileOpen}
                    aria-controls="subnet-mobile-profile-menu"
                    className="mr-2 flex rounded-full transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4C7]"
                  >
                    <ProfileAvatar className="h-8 w-8 text-[10px]" />
                  </button>
                  {profileOpen && (
                    <div
                      id="subnet-mobile-profile-menu"
                      role="menu"
                      className="absolute right-0 top-[calc(100%+12px)] z-60 w-64 overflow-hidden rounded-2xl border border-[#00B8A9]/25 bg-[#080B0B]/98 p-2 shadow-[0_18px_45px_rgba(0,0,0,0.6)] backdrop-blur-xl"
                    >
                      <div className="flex items-center gap-3 border-b border-white/8 px-3 py-3">
                        <ProfileAvatar className="h-11 w-11 text-xs" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-white">Alex Morgan</p>
                          <p className="mt-0.5 text-xs text-white/45">SUBNET member</p>
                        </div>
                      </div>
                      <Link
                        to="/profile"
                        role="menuitem"
                        onClick={closeProfile}
                        className="mt-1 flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-white/85 transition-colors hover:bg-[#00D4C7]/10 hover:text-[#00D4C7]"
                      >
                        View profile <FiChevronDown className="h-4 w-4 -rotate-90" />
                      </Link>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </nav>
        </div>

        {/* Mock notification data stays local until a notification service exists. */}
        <section
          id="subnet-notifications"
          ref={notificationsPanelRef}
          aria-label="Notifications"
          aria-hidden={!notificationsOpen}
          inert={!notificationsOpen}
          className={`absolute right-4 top-full mt-3 w-[calc(100vw-2rem)] max-w-[20rem] overflow-hidden rounded-2xl border border-[#00B8A9]/30 bg-[#030606] shadow-[0_20px_60px_rgba(0,0,0,0.65),0_0_24px_rgba(0,184,169,0.12)] transition-[opacity,transform,visibility] duration-200 sm:right-8 lg:right-10 ${
            notificationsOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible pointer-events-none translate-y-2 opacity-0"
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div>
              <h2 className="text-base font-semibold tracking-wide text-white">
                Notifications
              </h2>
              <p className="mt-1 text-xs text-white/45">
                {unreadCount ? `${unreadCount} unread` : "You're all caught up"}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllNotificationsAsRead}
                className="rounded-lg px-2.5 py-2 text-xs font-medium text-[#00D4C7] transition-colors hover:bg-[#00D4C7]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B8A9]"
              >
                Mark all as read
              </button>
            )}
          </div>

          {notifications.length <= 0 ? (
            <div className="flex flex-col items-center px-6 py-10 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00B8A9]/10 text-[#00D4C7]">
                <FiBell size={21} strokeWidth={1.7} />
              </span>
              <p className="mt-4 text-sm font-medium text-white">You&apos;re all caught up</p>
              <p className="mt-1.5 max-w-56 text-xs leading-relaxed text-white/45">
                There are no notifications to show right now.
              </p>
            </div>
          ) : (
            <ul className="max-h-[min(60vh,26rem)] space-y-2 overflow-y-auto p-2">
              {notifications.map(({ id, icon: Icon, title, message, timestamp, unread }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => markNotificationAsRead(id)}
                    aria-label={`${unread ? "Mark as read: " : ""}${title}. ${message} ${timestamp}`}
                    className={`flex w-full items-start gap-3 rounded-xl px-3 py-3.5 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00B8A9] ${
                      unread
                        ? "bg-[#00B8A9]/8 hover:bg-[#00B8A9]/13"
                        : "hover:bg-white/4"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        unread
                          ? "bg-[#00D4C7]/15 text-[#00D4C7]"
                          : "bg-white/[.07] text-white/55"
                      }`}
                    >
                      <Icon size={17} strokeWidth={1.8} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-start justify-between gap-3">
                        <span className={`text-sm ${unread ? "font-semibold text-white" : "font-medium text-white/75"}`}>
                          {title}
                        </span>
                        {unread && (
                          <span
                            aria-label="Unread"
                            className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#00D4C7] shadow-[0_0_8px_rgba(0,212,199,0.65)]"
                          />
                        )}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-white/55">
                        {message}
                      </span>
                      <span className="mt-2 block text-[11px] text-white/35">
                        {timestamp}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </header>

      {/* ==================================================
          MOBILE SIDEBAR
      ================================================== */}

      {mobileOpen && (
        <>
          {/* Dark overlay */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-60 bg-black/60 lg:hidden"
          />

          {/* Sidebar */}
          <aside
            className="fixed left-0 top-0 z-70 flex h-screen w-[40vw] min-w-70 max-w-95 flex-col overflow-hidden rounded-r-[28px] border border-l-0 border-[#00B8A9]/70 bg-[#070909] shadow-[8px_0_35px_rgba(0,184,169,0.16)] lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="SUBNET mobile navigation"
          >

            {/* Animated teal glow */}
            <div className="pointer-events-none absolute inset-0 rounded-r-[28px] border border-[#00B8A9]/40" />

            {/* Sidebar Header */}
            <div className="relative flex h-32.5 items-center justify-between border-b border-white/10 px-7">

              {/* Logo */}
              <Logo height={48} />

              {/* Close */}
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors duration-300 hover:bg-white/10 hover:text-[#00D4C7]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12" />
                  <path d="M18 6 6 18" />
                </svg>
              </button>

            </div>


            {/* Navigation */}
            <nav className="relative flex-1 overflow-y-auto px-4 py-5">

              {/* MAIN NAVIGATION */}

              <div className="space-y-1">
                {NAV_LINKS.map(({ label, to, end }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex w-full items-center gap-8 rounded-xl px-4 py-3.5 text-left transition-colors ${
                        isActive
                          ? "bg-[#00B8A9]/10 text-[#00D4C7]"
                          : "text-white hover:bg-white/5 hover:text-[#00D4C7]"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {label === "Home" && (
                          <svg
                            viewBox="0 0 24 24"
                            className="h-7 w-7 shrink-0 mr-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="m3 10 9-7 9 7" />
                            <path d="M5 9v11h14V9" />
                            <path d="M9 20v-6h6v6" />
                          </svg>
                        )}
                        {label === "Movies" && (
                          <svg
                            viewBox="0 0 24 24"
                            className="h-7 w-7 shrink-0 mr-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <rect x="3" y="4" width="18" height="16" rx="2" />
                            <path d="M3 9h18" />
                            <path d="m8 4 2 5" />
                            <path d="m14 4 2 5" />
                          </svg>
                        )}
                        {label === "TV Shows" && (
                          <svg
                            viewBox="0 0 24 24"
                            className="h-7 w-7 shrink-0 mr-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <rect x="3" y="6" width="18" height="13" rx="2" />
                            <path d="M8 3l4 3 4-3" />
                            <path d="M8 19v2h8v-2" />
                          </svg>
                        )}
                        {label === "My List" && (
                          <svg
                            viewBox="0 0 24 24"
                            className="h-7 w-7 shrink-0 mr-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M6 3h12v18l-6-4-6 4V3Z" />
                          </svg>
                        )}

                        <span className="text-lg font-semibold">
                          {label}
                        </span>

                        {isActive && (
                          <span className="ml-auto h-2.5 w-2.5 rounded-full bg-[#00D4C7]" />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>


              {/* Divider */}
              <div className="my-3 border-t border-white/10" />


              {/* SECONDARY NAVIGATION */}

              <div className="space-y-1">

                {/* Search */}
                <button
                  type="button"
                  onClick={goToSearch}
                  className="flex w-full items-center gap-8 rounded-xl px-4 py-3.5 text-left text-white transition-colors hover:bg-white/5 hover:text-[#00D4C7]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-7 w-7 shrink-0 mr-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-4-4" />
                  </svg>

                  <span className="text-lg font-semibold">
                    Search
                  </span>
                </button>


                {/* Notifications */}
                <button
                  type="button"
                  onClick={openMobileNotifications}
                  className="flex w-full items-center gap-8 rounded-xl px-4 py-3.5 text-left text-white transition-colors hover:bg-white/5 hover:text-[#00D4C7]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-7 w-7 shrink-0 mr-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                    <path d="M10 21h4" />
                  </svg>

                  <span className="text-lg font-semibold">
                    Notifications
                  </span>
                 
                </button>


                {/* Profile */}
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center gap-8 rounded-xl px-4 py-3.5 text-left text-white transition-colors hover:bg-white/5 hover:text-[#00D4C7]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-7 w-7 shrink-0 mr-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M5 21c.8-4 3.1-6 7-6s6.2 2 7 6" />
                  </svg>

                  <span className="text-lg font-semibold">
                    Profile
                  </span>
                </Link>


                {/* Settings */}
                <Link
                  to="/settings"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center gap-8 rounded-xl px-4 py-3.5 text-left text-white transition-colors hover:bg-white/5 hover:text-[#00D4C7]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-7 w-7 shrink-0 mr-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V22h-2.4v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1L8 19l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6.7v-2.4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9L8 10.6l1.7-1.7.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V7h2.4v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.7 1.7-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2v2.4h-.2a1.7 1.7 0 0 0-1.5 1Z" />
                  </svg>

                  <span className="text-lg font-semibold">
                    Settings
                  </span>
                </Link>

              </div>


              {/* Divider */}
              <div className="my-3 border-t border-white/10" />


              {/* Logout */}
              <button
                type="button"
                className="flex w-full items-center gap-8 rounded-xl px-4 py-3.5 text-left text-white transition-colors hover:bg-white/5 hover:text-[#00D4C7]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7 shrink-0 mr-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M10 17l5-5-5-5" />
                  <path d="M15 12H3" />
                  <path d="M21 19V5a2 2 0 0 0-2-2h-6" />
                </svg>

                <span className="text-lg font-semibold">
                  Logout
                </span>
              </button>

            </nav>
          </aside>
        </>
      )}
    </>
  );
}

export default Navbar;
