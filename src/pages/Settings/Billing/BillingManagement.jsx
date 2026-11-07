import { useState } from "react";

function BillingManagement() {
  const [autoRenew, setAutoRenew] = useState(true);
  const [cancellationRequested, setCancellationRequested] = useState(false);
  const [message, setMessage] = useState("");

  const toggleAutoRenew = () => {
    setAutoRenew((enabled) => !enabled);
    setMessage("Auto-renewal preference changed in this frontend demo only.");
  };

  const requestCancellation = () => {
    setCancellationRequested(true);
    setMessage("Cancellation was demonstrated locally only; no subscription was changed.");
  };

  const reactivate = () => {
    setCancellationRequested(false);
    setMessage("Reactivation was demonstrated locally only; no subscription was changed.");
  };

  return (
    <div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#00D4C7]">
          Billing management
        </p>
        <h2 className="mt-2 text-2xl font-bold text-white">Manage your subscription</h2>
        <p className="mt-2 text-sm leading-6 text-white/50">
          Controls on this page only update their local demo state. No billing service is connected.
        </p>
      </div>

      {message && (
        <p role="status" className="mt-5 rounded-xl border border-[#00D4C7]/20 bg-[#00D4C7]/8 p-3 text-sm text-[#9df5ef]">
          {message}
        </p>
      )}

      <section aria-labelledby="subscription-status-heading" className="mt-6 rounded-xl border border-white/8 bg-[#050b0d] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 id="subscription-status-heading" className="font-semibold text-white">Subscription status</h3>
            <p className="mt-1 text-sm text-white/45">SUBNET Premium · Sample account</p>
          </div>
          <span className="rounded-full border border-[#00D4C7]/25 px-3 py-1 text-xs font-semibold text-[#00D4C7]">
            {cancellationRequested ? "Cancellation requested (demo)" : "Active (demo)"}
          </span>
        </div>
      </section>

      <section aria-labelledby="upcoming-payment-heading" className="mt-3 rounded-xl border border-white/8 bg-[#050b0d] p-5">
        <h3 id="upcoming-payment-heading" className="font-semibold text-white">Upcoming payment</h3>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-white/40">Amount</dt>
            <dd className="mt-1 text-sm font-medium text-white">₦13,990 NGN</dd>
          </div>
          <div>
            <dt className="text-xs text-white/40">Expected date</dt>
            <dd className="mt-1 text-sm font-medium text-white">December 7, 2026 (sample)</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="renewal-heading" className="mt-3 flex flex-col gap-4 rounded-xl border border-white/8 bg-[#050b0d] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 id="renewal-heading" className="font-semibold text-white">Auto-renewal</h3>
          <p className="mt-1 text-sm text-white/45">
            {autoRenew ? "Enabled in this demo" : "Disabled in this demo"}
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={autoRenew}
          onClick={toggleAutoRenew}
          className={`relative h-7 w-12 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4C7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050b0d] ${
            autoRenew ? "bg-[#00D4C7]" : "bg-white/20"
          }`}
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-[#061110] transition-transform ${
              autoRenew ? "translate-x-6" : "translate-x-1"
            }`}
          />
          <span className="sr-only">Toggle auto-renewal</span>
        </button>
      </section>

      <section aria-labelledby="subscription-actions-heading" className="mt-3 rounded-xl border border-white/8 bg-[#050b0d] p-5">
        <h3 id="subscription-actions-heading" className="font-semibold text-white">Subscription actions</h3>
        <p className="mt-1 text-sm leading-6 text-white/45">
          Cancellation and reactivation are visual demonstrations and will not contact SUBNET or a payment provider.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {!cancellationRequested ? (
            <button
              type="button"
              onClick={requestCancellation}
              className="rounded-full border border-[#00D4C7]/35 px-4 py-2.5 text-sm font-semibold text-[#00D4C7] transition-colors hover:bg-[#00D4C7]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4C7]"
            >
              Cancel subscription (demo)
            </button>
          ) : (
            <button
              type="button"
              onClick={reactivate}
              className="rounded-full bg-[#00D4C7] px-4 py-2.5 text-sm font-semibold text-[#061110] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4C7]"
            >
              Reactivate (demo)
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default BillingManagement;
