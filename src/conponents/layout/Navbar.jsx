import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiBell,
  FiBookmark,
  FiChevronDown,
  FiFilm,
  FiHome,
  FiLogOut,
  FiSearch,
  FiSettings,
  FiTv,
  FiUser,
} from "react-icons/fi";

import Logo from "../common/Logo";

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
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // The background changes on scroll, while the border animation remains a
  // separate visual treatment so one behavior does not control the other.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the profile menu when the user clicks outside of it.
  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!profileRef.current?.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

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

  return <>
    {/*
      The outer header only handles positioning. The rounded inner nav is
      the visual surface that receives the SUBNET animated border.
    */}
   <header
      className={`fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-4 sm:px-5 sm:pt-4 lg:px-10`}>
     <div
       className={`subnet-glow-border w-full max-w-[95%] rounded-[10px] transition-[background-color,backdrop-filter,box-shadow] duration-1000 ${scrolled ? "bg-[#080B0B]/95 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl" : "bg-[#070909]/15 shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-md"}`}
>
       <nav
           className={`relative flex h-17 items-center justify-between px-6 sm:h-18 sm:px-8 lg:px-10`}>
          {/* Desktop/mobile brand area. */}
          <Link
            to="/"
            aria-label="SUBNET Home"
            className="hidden shrink-0 items-center gap-3 lg:flex"
            onClick={() => setMobileOpen(false)}
          >
            <Logo height={150} className="sm:hidden" />
            <Logo height={150} className="hidden sm:block" />
          </Link>

          {/* Desktop navigation links. */}
          <ul className="hidden items-center gap-8 lg:flex xl:gap-10">
            {NAV_LINKS.map(({ label, to, end }) => (<li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `group relative inline-flex py-2 text-[15px] font-medium tracking-[0.01em] transition-colors duration-200 ${
                    isActive
                      ? "text-[#00D4C7]"
                      : "text-white/85 hover:text-[#00D4C7]"
                  }`
                }
              >
                {({ isActive }) => (<>
                  {label}
                  {/* The underline grows from right to left on hover and
                      stays visible for the active route. */}
                  <span
                    aria-hidden={`true`}
                    className={'pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-right rounded-full bg-[#00D4C7] transition-transform duration-350 ease-out ' + (isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100")}
                  />
                </>)}
              </NavLink>
            </li>))}
          </ul>

          {/* Desktop actions. */}
          <div className="hidden items-center gap-1 lg:flex">
            <button
              type="button"
              onClick={goToSearch}
              aria-label="Search"
              className="rounded-full p-2.5 text-white/85 transition-colors duration-200 hover:text-[#00D4C7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B8A9]"
            >
              <FiSearch size={21} strokeWidth={1.8} />
            </button>

            <span className="mx-2 h-7 w-px bg-white/15" aria-hidden="true" />

            <button
              type="button"
              aria-label="Notifications"
              className="rounded-full p-2.5 text-white/85 transition-colors duration-200 hover:text-[#00D4C7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B8A9]"
            >
              <FiBell size={21} strokeWidth={1.8} />
            </button>

            <span className="mx-2 h-7 w-px bg-white/15" aria-hidden="true" />

            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={profileOpen}
                className="flex items-center gap-4 rounded-full p-2 text-white/85 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B8A9]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/8">
                  <FiUser size={16} strokeWidth={1.8} />
                </span>
                <FiChevronDown
                  size={16}
                className={`-ml-1 transition-transform duration-200 ${
                profileOpen ? "rotate-180" : ""
        }`}
                />
              </button>

              {profileOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-[calc(100%+10px)] w-48 overflow-hidden rounded-xl border border-[#00B8A9]/25 bg-[#080B0B]/98 p-1.5 shadow-[0_18px_45px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                >
                  <Link
                    to="/profile"
                    role="menuitem"
                    onClick={closeProfile}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/85 transition-colors hover:bg-white/5 hover:text-[#00D4C7]"
                  >
                    <FiUser size={16} /> Profile
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={closeProfile}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-white/85 transition-colors hover:bg-white/5 hover:text-[#00D4C7]"
                  >
                    <FiSettings size={16} /> Settings
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={closeProfile}
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
              <Logo height={150} />
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

              {/* Profile */}
              <button
                type="button"
                aria-label="Profile"
              className="mr-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="8" r="3.5" />
                  <path d="M5 21c.8-4 3.1-6 7-6s6.2 2 7 6" />
                </svg>
              </button>

            </div>
          </div>
        </nav>
      </div>
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
            <Logo height={150} />

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
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V22h-2.4v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1L8 19l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6.7v-2.4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9L8 10.6l1.7-1.7.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V7h2.4v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.7 1.7-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2v2.4h-.2a1.7 1.7 0 0 0-1.5 1Z" />
                </svg>

                <span className="text-lg font-semibold">
                  Settings
                </span>
              </button>

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
  </>;
}

export default Navbar;