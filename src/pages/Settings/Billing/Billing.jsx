import { FiArrowUpRight, FiCalendar, FiCreditCard, FiLayers } from "react-icons/fi";
import { Link } from "react-router-dom";

const CURRENT_PLAN = {
  name: "SUBNET Premium",
  price: "₦13,990",
  period: "per month",
  status: "Active (demo)",
  nextPayment: "December 7, 2026",
};

const QUICK_LINKS = [
  {
    title: "Available plans",
    description: "Compare subscription options and their included features.",
    to: "/settings/billing/plans",
    icon: FiLayers,
  },
  {
    title: "Payment methods",
    description: "View and manage the safe sample payment methods on this page.",
    to: "/settings/billing/payment-methods",
    icon: FiCreditCard,
  },
  {
    title: "Payment history",
    description: "Review sample transactions and invoice actions.",
    to: "/settings/billing/payment-history",
    icon: FiCalendar,
  },
];

function Billing() {
  return (
    <div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#00D4C7]">
          Current plan
        </p>
        <h2 className="mt-2 text-2xl font-bold text-white">{CURRENT_PLAN.name}</h2>
        <p className="mt-2 text-sm text-white/50">
          Subscription details shown below are mock data for this frontend stage.
        </p>
      </div>

      <dl className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-white/8 bg-[#050b0d] p-4">
          <dt className="text-xs font-medium uppercase tracking-wide text-white/40">Price</dt>
          <dd className="mt-2 text-lg font-semibold text-white">
            {CURRENT_PLAN.price} <span className="text-sm font-normal text-white/50">{CURRENT_PLAN.period}</span>
          </dd>
        </div>
        <div className="rounded-xl border border-white/8 bg-[#050b0d] p-4">
          <dt className="text-xs font-medium uppercase tracking-wide text-white/40">Status</dt>
          <dd className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#00D4C7]">
            <span className="h-2 w-2 rounded-full bg-[#00D4C7]" aria-hidden="true" />
            {CURRENT_PLAN.status}
          </dd>
        </div>
        <div className="rounded-xl border border-white/8 bg-[#050b0d] p-4 sm:col-span-2">
          <dt className="text-xs font-medium uppercase tracking-wide text-white/40">Next payment date</dt>
          <dd className="mt-2 text-sm font-semibold text-white">{CURRENT_PLAN.nextPayment}</dd>
        </div>
      </dl>

      <section aria-labelledby="billing-shortcuts-heading" className="mt-8">
        <h3 id="billing-shortcuts-heading" className="text-base font-semibold text-white">
          Manage your billing
        </h3>
        <div className="mt-3 grid gap-3">
          {QUICK_LINKS.map(({ title, description, to, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="group flex items-center gap-4 rounded-xl border border-white/8 bg-[#050b0d] p-4 transition-colors hover:border-[#00D4C7]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4C7]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00D4C7]/10 text-[#00D4C7]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-white">{title}</span>
                <span className="mt-1 block text-xs leading-5 text-white/45">{description}</span>
              </span>
              <FiArrowUpRight className="h-4 w-4 shrink-0 text-white/35 transition-colors group-hover:text-[#00D4C7]" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <Link
        to="/settings/billing/management"
        className="mt-6 inline-flex text-sm font-semibold text-[#00D4C7] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4C7]"
      >
        Billing management
      </Link>
    </div>
  );
}

export default Billing;
