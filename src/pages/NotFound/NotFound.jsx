import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070909] px-5 pt-17 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00D4C7]/10 blur-3xl sm:h-120 sm:w-120"
      />
      <div className="relative z-10 mx-auto max-w-xl">
        <p className="text-[clamp(7rem,24vw,13rem)] font-black leading-none tracking-[-0.08em] text-white [text-shadow:0_0_12px_rgba(0,212,199,0.95),0_0_32px_rgba(0,212,199,0.8),0_0_72px_rgba(0,212,199,0.5)]">
          404
        </p>
        <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
          Page Not Found
        </h1>
        <p className="mt-3 text-sm leading-6 text-white/65 sm:text-base">
          The page you’re looking for doesn’t exist.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-lg border border-[#00D4C7]/60 bg-[#00D4C7]/10 px-5 py-3 text-sm font-semibold text-[#8ffaf2] shadow-[0_0_24px_rgba(0,212,199,0.2)] transition-all hover:border-[#00D4C7] hover:bg-[#00D4C7]/20 hover:shadow-[0_0_32px_rgba(0,212,199,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00D4C7]"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;