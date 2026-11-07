import { useState } from "react";

const PLANS = [
  {
    name: "SUBNET Basic",
    price: "₦5,990",
    period: "per month",
    quality: "HD",
    devices: 1,
    features: ["Stream the full library", "One supported device", "HD playback"],
    action: "Downgrade (demo)",
  },
  {
    name: "SUBNET Standard",
    price: "₦9,990",
    period: "per month",
    quality: "Full HD",
    devices: 2,
    features: ["Stream the full library", "Two simultaneous devices", "Full HD playback"],
    action: "Downgrade (demo)",
  },
  {
    name: "SUBNET Premium",
    price: "₦13,990",
    period: "per month",
    quality: "4K Ultra HD",
    devices: 4,
    features: ["Stream the full library", "Four simultaneous devices", "4K Ultra HD playback"],
    action: "Current plan",
    current: true,
  },
  {
    name: "SUBNET Ultra",
    price: "₦17,990",
    period: "per month",
    quality: "4K Ultra HD",
    devices: 6,
    features: ["Stream the full library", "Six simultaneous devices", "4K Ultra HD playback"],
    action: "Upgrade (demo)",
  },
];

function Plans() {
  const [message, setMessage] = useState("");

  const handlePlanAction = (planName) => {
    setMessage(
      `${planName} is for demonstration only. No subscription has been changed.`,
    );
  };

  return (
    <div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#00D4C7]">
          Subscription plans
        </p>
        <h2 className="mt-2 text-2xl font-bold text-white">Choose your experience</h2>
        <p className="mt-2 text-sm leading-6 text-white/50">
          Sample prices and features only. Plan selection is not connected to a payment service.
        </p>
      </div>

      {message && (
        <p role="status" className="mt-5 rounded-xl border border-[#00D4C7]/20 bg-[#00D4C7]/8 p-3 text-sm text-[#9df5ef]">
          {message}
        </p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {PLANS.map((plan) => (
          <article
            key={plan.name}
            className={`flex flex-col rounded-2xl border p-5 ${
              plan.current
                ? "border-[#00D4C7]/35 bg-[#00D4C7]/5"
                : "border-white/8 bg-[#050b0d]"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              {plan.current && (
                <span className="rounded-full border border-[#00D4C7]/25 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#00D4C7]">
                  Current demo
                </span>
              )}
            </div>
            <p className="mt-4 text-2xl font-bold text-white">
              {plan.price}
              <span className="ml-1 text-sm font-normal text-white/45">{plan.period}</span>
            </p>
            <ul className="mt-5 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2 text-sm text-white/65">
                  <span className="text-[#00D4C7]" aria-hidden="true">✓</span>
                  {feature}
                </li>
              ))}
              <li className="border-t border-white/8 pt-3 text-sm text-white/55">
                Video quality: <span className="text-white">{plan.quality}</span>
              </li>
              <li className="text-sm text-white/55">
                Simultaneous devices: <span className="text-white">{plan.devices}</span>
              </li>
            </ul>
            <button
              type="button"
              disabled={plan.current}
              onClick={() => handlePlanAction(plan.name)}
              className="mt-6 w-full rounded-full border border-[#00D4C7]/40 px-4 py-2.5 text-sm font-semibold text-[#00D4C7] transition-colors hover:bg-[#00D4C7]/10 disabled:cursor-not-allowed disabled:border-white/10 disabled:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4C7]"
            >
              {plan.action}
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Plans;
