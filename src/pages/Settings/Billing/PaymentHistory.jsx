import { useState } from "react";

const TRANSACTIONS = [
  {
    date: "November 7, 2026",
    reference: "DEMO-SUB-2026-1107",
    amount: "₦13,990",
    method: "Demo Visa •••• 1842",
    status: "Paid (sample)",
  },
  {
    date: "October 7, 2026",
    reference: "DEMO-SUB-2026-1007",
    amount: "₦13,990",
    method: "Demo Visa •••• 1842",
    status: "Paid (sample)",
  },
  {
    date: "September 7, 2026",
    reference: "DEMO-SUB-2026-0907",
    amount: "₦13,990",
    method: "Demo Visa •••• 1842",
    status: "Paid (sample)",
  },
];

function PaymentHistory() {
  const [message, setMessage] = useState("");

  return (
    <div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#00D4C7]">
          Payment history
        </p>
        <h2 className="mt-2 text-2xl font-bold text-white">Sample transactions</h2>
        <p className="mt-2 text-sm leading-6 text-white/50">
          The records below are mock entries and do not represent actual charges.
        </p>
      </div>

      {message && <p role="status" className="mt-4 text-sm text-[#9df5ef]">{message}</p>}

      <div className="mt-5 space-y-3">
        {TRANSACTIONS.map((transaction) => (
          <article
            key={transaction.reference}
            className="rounded-xl border border-white/8 bg-[#050b0d] p-4"
          >
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-[1fr_1.2fr_0.65fr_1.15fr_auto] xl:items-center">
              <div>
                <p className="text-xs text-white/40">Transaction date</p>
                <p className="mt-1 text-sm font-medium text-white">{transaction.date}</p>
              </div>
              <div>
                <p className="text-xs text-white/40">Reference</p>
                <p className="mt-1 break-all font-mono text-xs text-white/70">{transaction.reference}</p>
              </div>
              <div>
                <p className="text-xs text-white/40">Amount</p>
                <p className="mt-1 text-sm font-semibold text-white">{transaction.amount}</p>
              </div>
              <div>
                <p className="text-xs text-white/40">Payment method / status</p>
                <p className="mt-1 text-sm text-white/70">{transaction.method}</p>
                <p className="mt-1 text-xs text-[#00D4C7]">{transaction.status}</p>
              </div>
              <button
                type="button"
                onClick={() => setMessage("Invoice downloads are not available in this frontend demo.")}
                className="rounded-lg border border-[#00D4C7]/25 px-3 py-2 text-xs font-semibold text-[#00D4C7] transition-colors hover:bg-[#00D4C7]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4C7]"
              >
                Download invoice
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default PaymentHistory;
