import { Link } from "react-router-dom";

function SignUp() {
  return (
    <main className="mx-auto max-w-xl px-6 py-24 text-center text-white">
      <h1 className="text-3xl font-bold">Sign up is coming soon</h1>
      <p className="mt-4 text-white/65">
        Account creation will be available when SUBNET authentication is ready.
      </p>
      <Link
        to="/"
        className="mt-7 inline-flex rounded-full border border-[#00D4C7]/60 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#00D4C7]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4C7]"
      >
        Back to SUBNET
      </Link>
    </main>
  );
}

export default SignUp;
