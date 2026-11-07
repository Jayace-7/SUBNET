import { NavLink, Outlet } from "react-router-dom";

const BILLING_LINKS = [
  { label: "Current plan", to: "/settings/billing", end: true },
  { label: "Subscription plans", to: "/settings/billing/plans" },
  { label: "Payment methods", to: "/settings/billing/payment-methods" },
  { label: "Payment history", to: "/settings/billing/payment-history" },
  { label: "Billing management", to: "/settings/billing/management" },
];

function BillingLayout() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <header className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00D4C7]">
          Account settings
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Plan &amp; Billing
        </h1>
        <p className="mt-3 text-sm text-white/50">
          Frontend preview using sample subscription and payment information only.
        </p>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <nav
          aria-label="Billing pages"
          className="flex gap-2 overflow-x-auto rounded-2xl border border-white/8 bg-[#080f10] p-2 lg:flex-col"
        >
          {BILLING_LINKS.map(({ label, to, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `shrink-0 rounded-xl px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4C7] ${
                  isActive
                    ? "bg-[#00D4C7]/12 text-[#00D4C7]"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <section
          aria-label="Billing content"
          className="min-w-0 rounded-2xl border border-white/8 bg-[#080f10] p-5 sm:p-7"
        >
          <Outlet />
        </section>
      </div>
    </div>
  );
}

export default BillingLayout;
