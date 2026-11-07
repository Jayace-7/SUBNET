import { useState } from "react";
import { FiCreditCard, FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";

const INITIAL_METHODS = [
  { id: 1, label: "Demo Visa", ending: "1842", isDefault: true },
  { id: 2, label: "Demo Mastercard", ending: "7351", isDefault: false },
];

function PaymentMethods() {
  const [methods, setMethods] = useState(INITIAL_METHODS);
  const [addOpen, setAddOpen] = useState(false);
  const [newLabel, setNewLabel] = useState("Demo Visa");
  const [editingId, setEditingId] = useState(null);
  const [labelDraft, setLabelDraft] = useState("");
  const [message, setMessage] = useState("");

  const addMethod = (event) => {
    event.preventDefault();
    const newMethod = {
      id: Date.now(),
      label: newLabel,
      ending: "0000",
      isDefault: methods.length === 0,
    };
    setMethods((current) => [...current, newMethod]);
    setAddOpen(false);
    setMessage("A mock payment method was added for this page session only.");
  };

  const saveLabel = (event) => {
    event.preventDefault();
    setMethods((current) =>
      current.map((method) =>
        method.id === editingId ? { ...method, label: labelDraft } : method,
      ),
    );
    setEditingId(null);
    setMessage("The demo payment method was updated for this page session.");
  };

  const setDefault = (id) => {
    setMethods((current) =>
      current.map((method) => ({ ...method, isDefault: method.id === id })),
    );
    setMessage("Default method updated in this frontend demo only.");
  };

  const removeMethod = (id) => {
    setMethods((current) => {
      const remaining = current.filter((method) => method.id !== id);
      if (!remaining.some((method) => method.isDefault) && remaining.length > 0) {
        remaining[0] = { ...remaining[0], isDefault: true };
      }
      return remaining;
    });
    setMessage("The mock payment method was removed from this page session.");
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#00D4C7]">
            Payment methods
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">Your saved methods</h2>
        </div>
        <button
          type="button"
          onClick={() => setAddOpen((open) => !open)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00D4C7] px-4 py-2.5 text-sm font-semibold text-[#061110] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4C7]"
        >
          <FiPlus className="h-4 w-4" aria-hidden="true" />
          Add method
        </button>
      </div>

      <p className="mt-3 text-sm leading-6 text-white/50">
        These are fictional, masked examples. Do not enter real card numbers, CVVs, or bank credentials.
      </p>

      {message && <p role="status" className="mt-4 text-sm text-[#9df5ef]">{message}</p>}

      {addOpen && (
        <form onSubmit={addMethod} className="mt-5 rounded-xl border border-[#00D4C7]/20 bg-[#050b0d] p-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/75">Mock method type</span>
            <select
              value={newLabel}
              onChange={(event) => setNewLabel(event.target.value)}
              className="w-full rounded-xl border border-white/12 bg-[#080f10] px-4 py-3 text-sm text-white outline-none focus:border-[#00D4C7]/60 focus:ring-2 focus:ring-[#00D4C7]/15"
            >
              <option>Demo Visa</option>
              <option>Demo Mastercard</option>
              <option>Demo bank transfer</option>
            </select>
          </label>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="submit" className="rounded-full bg-[#00D4C7] px-4 py-2 text-sm font-semibold text-[#061110]">
              Add mock method
            </button>
            <button type="button" onClick={() => setAddOpen(false)} className="rounded-full border border-white/12 px-4 py-2 text-sm text-white/70 hover:text-white">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-5 space-y-3">
        {methods.length === 0 && (
          <p className="rounded-xl border border-dashed border-white/12 p-5 text-sm text-white/50">
            No mock payment methods are currently listed.
          </p>
        )}
        {methods.map((method) => (
          <article key={method.id} className="rounded-xl border border-white/8 bg-[#050b0d] p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00D4C7]/10 text-[#00D4C7]">
                <FiCreditCard className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                {editingId === method.id ? (
                  <form onSubmit={saveLabel} className="flex flex-wrap gap-2">
                    <label className="sr-only" htmlFor={`method-type-${method.id}`}>Mock payment method type</label>
                    <select
                      id={`method-type-${method.id}`}
                      value={labelDraft}
                      onChange={(event) => setLabelDraft(event.target.value)}
                      className="min-w-0 flex-1 rounded-lg border border-white/12 bg-[#080f10] px-3 py-2 text-sm text-white outline-none focus:border-[#00D4C7]/60"
                    >
                      <option>Demo Visa</option>
                      <option>Demo Mastercard</option>
                      <option>Demo bank transfer</option>
                    </select>
                    <button type="submit" className="rounded-lg bg-[#00D4C7] px-3 py-2 text-xs font-semibold text-[#061110]">Save method</button>
                  </form>
                ) : (
                  <>
                    <p className="font-semibold text-white">{method.label}</p>
                    <p className="mt-1 text-sm text-white/45">Mock •••• {method.ending}</p>
                  </>
                )}
              </div>
              {method.isDefault && (
                <span className="w-fit rounded-full border border-[#00D4C7]/25 px-2.5 py-1 text-xs font-medium text-[#00D4C7]">
                  Default
                </span>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2 border-t border-white/8 pt-3">
              {!method.isDefault && (
                <button type="button" onClick={() => setDefault(method.id)} className="rounded-lg px-3 py-2 text-xs font-medium text-white/60 hover:bg-white/5 hover:text-[#00D4C7]">
                  Set as default
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setEditingId(method.id);
                  setLabelDraft(method.label);
                }}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-white/60 hover:bg-white/5 hover:text-[#00D4C7]"
              >
                <FiEdit2 aria-hidden="true" /> Update method
              </button>
              <button
                type="button"
                onClick={() => removeMethod(method.id)}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-white/60 hover:bg-white/5 hover:text-[#00D4C7]"
              >
                <FiTrash2 aria-hidden="true" /> Remove
              </button>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-5 rounded-xl border border-white/8 bg-[#050b0d] p-4 text-xs leading-5 text-white/40">
        Demo only: this screen does not collect, store, or process payment credentials.
      </p>
    </div>
  );
}

export default PaymentMethods;
