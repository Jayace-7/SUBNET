import {
  FiBell,
  FiCreditCard,
  FiEye,
  FiGlobe,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const SETTINGS_CATEGORIES = [
  {
    title: "Language & Subtitles",
    description: "Choose your preferred display language, audio, and subtitle options.",
    icon: FiGlobe,
  },
  {
    title: "Notifications",
    description: "Choose which account and viewing updates you would like to receive.",
    icon: FiBell,
  },
  {
    title: "Privacy & Security",
    description: "Review privacy preferences and account security options.",
    icon: FiShield,
  },
  {
    title: "Parental Controls",
    description: "Explore viewing restrictions and family profile controls.",
    icon: FiUsers,
  },
  {
    title: "Accessibility",
    description: "Find options designed to make SUBNET easier to use.",
    icon: FiEye,
  },
];

function Settings() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <header className="relative overflow-hidden rounded-[30px] border border-[#00D4C7]/15 bg-[#050b0d] px-6 py-8 shadow-[0_24px_90px_rgba(0,0,0,0.35)] sm:px-10 sm:py-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(0,212,199,0.16),transparent_48%)]"
        />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00D4C7]">
            Your account
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Settings
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">
            Manage your SUBNET preferences. Some settings are still being prepared.
          </p>
        </div>
      </header>

      <section aria-labelledby="settings-categories-heading" className="mt-10">
        <div className="mb-5">
          <h2 id="settings-categories-heading" className="text-xl font-semibold text-white">
            Account preferences
          </h2>
          <p className="mt-1 text-sm text-white/50">
            Select a category to explore the available options.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SETTINGS_CATEGORIES.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="rounded-2xl border border-white/8 bg-[#080f10] p-5 transition-colors duration-200 hover:border-[#00D4C7]/25"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00D4C7]/20 bg-[#00D4C7]/8 text-[#00D4C7]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-base font-semibold text-white">{title}</h3>
              <p className="mt-2 min-h-12 text-sm leading-6 text-white/50">{description}</p>
              <span className="mt-4 inline-flex rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-white/45">
                Coming soon
              </span>
            </article>
          ))}

          <article className="rounded-2xl border border-[#00D4C7]/25 bg-[#081312] p-5 transition-colors duration-200 hover:border-[#00D4C7]/50">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00D4C7]/25 bg-[#00D4C7]/10 text-[#00D4C7]">
              <FiCreditCard className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-base font-semibold text-white">Plan &amp; Billing</h3>
            <p className="mt-2 min-h-12 text-sm leading-6 text-white/55">
              Review your demo subscription, payment preferences, and billing activity.
            </p>
            <Link
              to="/settings/billing"
              className="mt-4 inline-flex items-center rounded-full bg-[#00D4C7] px-4 py-2 text-sm font-semibold text-[#061110] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4C7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#081312]"
            >
              Open billing
            </Link>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Settings;
