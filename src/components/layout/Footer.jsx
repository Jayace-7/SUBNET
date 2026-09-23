import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiHelpCircle,
  FiInstagram,
  FiMail,
  FiYoutube,
} from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

import Logo from "../common/Logo";

const FOOTER_LINKS = [
  {
    title: "Explore",
    links: [
      { label: "Home", to: "/" },
      { label: "Movies", to: "/movies" },
      { label: "TV Shows", to: "/tv-shows" },
      { label: "My List", to: "/my-list" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Profile", to: "/profile" },
      { label: "Sign in", to: "/login" },
      { label: "Create account", to: "/register" },
      { label: "Search", to: "/search" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Centre", to: "/" },
      { label: "Contact us", to: "/" },
      { label: "Privacy", to: "/" },
      { label: "Terms of use", to: "/" },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: "Facebook", icon: FiFacebook },
  { label: "Instagram", icon: FiInstagram },
  { label: "X", icon: FaXTwitter },
  { label: "YouTube", icon: FiYoutube },
];

function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#080b0b]">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="flex flex-col gap-7 border-b border-white/10 pb-7 md:flex-row md:items-start md:justify-between md:gap-10 lg:gap-12">
          <div className="flex max-w-sm flex-col items-center text-center lg:items-start lg:text-left">
            <Link to="/" aria-label="SUBNET Home" className="inline-flex">
              <Logo height={130} />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-6 text-white/55">
              Your home for unforgettable movies, must-watch series, and stories worth returning to.
            </p>
            <a
              href="mailto:support@subnet.com"
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white/75 transition-colors hover:text-[#00D4C7]"
            >
              <FiMail size={16} />
              support@subnet.com
            </a>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 md:max-w-2xl">
            {FOOTER_LINKS.map(({ title, links }) => (
              <div key={title}>
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                  {title}
                </h2>
                <ul className="mt-3 space-y-2">
                  {links.map(({ label, to }) => (
                    <li key={label}>
                      <Link
                        to={to}
                        className="text-sm text-white/70 transition-colors hover:text-[#00D4C7]"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-center gap-3 sm:justify-start">
            {SOCIAL_LINKS.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/65 transition-all duration-200 hover:-translate-y-1 hover:border-[#00D4C7] hover:bg-[#00D4C7]/15 hover:text-[#00D4C7] hover:shadow-[0_8px_18px_rgba(0,212,199,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4C7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080b0b]"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 self-start text-sm text-white/65 transition-colors hover:text-[#00D4C7] sm:self-auto"
          >
            <FiHelpCircle size={16} />
            Help Centre
          </button>
        </div>

        <div className="mt-5 flex flex-row items-center justify-between gap-3 text-[10px] text-white/35 sm:text-xs">
          <p>© {new Date().getFullYear()} SUBNET. All rights reserved.</p>
          <p className="text-right">Made for stories that stay with you.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
