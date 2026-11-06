import { useState } from "react";
import {
  FiArrowUpRight,
  FiBookmark,
  FiCalendar,
  FiCheck,
  FiClock,
  FiEdit2,
  FiMail,
  FiShield,
  FiUser,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import ProfileAvatar from "../../components/common/ProfileAvatar";
import { useMyList } from "../../components/mylist/MyListContext";

const INITIAL_PROFILE = {
  displayName: "BENJAMIN EKAM",
  email: "benjamin.ekam@subnet.example",
  username: "benjaminekam",
};

// Demo-only account details; no identity provider or remote persistence is connected.
function Profile() {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [draft, setDraft] = useState(INITIAL_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const { savedItems, continueWatching } = useMyList();
  const initials = profile.displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "BE";

  const startEditing = () => {
    setDraft(profile);
    setSaved(false);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraft(profile);
    setIsEditing(false);
  };

  const saveProfile = (event) => {
    event.preventDefault();
    setProfile(draft);
    setIsEditing(false);
    setSaved(true);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[30px] border border-[#00D4C7]/15 bg-[#050b0d] shadow-[0_24px_90px_rgba(0,0,0,0.45)]">
        <section className="relative overflow-hidden border-b border-white/8 px-6 py-8 sm:px-10 sm:py-11">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_0%,rgba(0,212,199,0.2),transparent_48%)]"
          />
          <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5 sm:gap-7">
              <ProfileAvatar initials={initials} className="h-20 w-20 text-xl sm:h-24 sm:w-24 sm:text-2xl" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00D4C7]">
                  Your SUBNET account
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {profile.displayName}
                </h1>
                <p className="mt-2 text-sm text-white/55">{profile.email}</p>
              </div>
            </div>
            {!isEditing && (
              <button
                type="button"
                onClick={startEditing}
                className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-[#00D4C7]/35 bg-[#00D4C7]/10 px-4 py-2.5 text-sm font-semibold text-[#8df3eb] transition-colors hover:bg-[#00D4C7]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4C7]"
              >
                <FiEdit2 className="h-4 w-4" />
                Edit profile
              </button>
            )}
          </div>
        </section>

        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_0.82fr]">
          <div className="space-y-8">
            <section aria-labelledby="account-details-heading">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#00D4C7]/20 bg-[#00D4C7]/8 text-[#00D4C7]">
                  <FiUser className="h-5 w-5" />
                </span>
                <div>
                  <h2 id="account-details-heading" className="text-xl font-semibold text-white">
                    Account details
                  </h2>
                  <p className="mt-1 text-sm text-white/50">Manage your profile information.</p>
                </div>
              </div>

              {saved && (
                <p role="status" className="mt-5 inline-flex items-center gap-2 text-sm text-[#8df3eb]">
                  <FiCheck className="h-4 w-4" /> Profile changes saved for this session.
                </p>
              )}

              {isEditing ? (
                <form onSubmit={saveProfile} className="mt-6 space-y-4 rounded-2xl border border-[#00D4C7]/15 bg-[#081113] p-5 sm:p-6">
                  <p className="text-xs leading-relaxed text-white/45">
                    Demo profile only. Changes are held in this page and are not sent to a service.
                  </p>
                  {[
                    { id: "displayName", label: "Display name", type: "text" },
                    { id: "email", label: "Email address", type: "email" },
                    { id: "username", label: "Username", type: "text" },
                  ].map(({ id, label, type }) => (
                    <label key={id} className="block">
                      <span className="mb-2 block text-sm font-medium text-white/75">{label}</span>
                      <input
                        required
                        type={type}
                        value={draft[id]}
                        onChange={(event) => setDraft((current) => ({ ...current, [id]: event.target.value }))}
                        className="w-full rounded-xl border border-white/12 bg-[#050b0d] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#00D4C7]/60 focus:ring-2 focus:ring-[#00D4C7]/15"
                      />
                    </label>
                  ))}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-full bg-[#00D4C7] px-5 py-2.5 text-sm font-semibold text-[#061110] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4C7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#081113]"
                    >
                      <FiCheck className="h-4 w-4" /> Save changes
                    </button>
                    <button
                      type="button"
                      onClick={cancelEditing}
                      className="inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-2.5 text-sm font-medium text-white/70 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4C7]"
                    >
                      <FiX className="h-4 w-4" /> Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <dl className="mt-6 divide-y divide-white/8 rounded-2xl border border-white/8 bg-white/2.5 px-5 sm:px-6">
                  <div className="flex items-center justify-between gap-4 py-4">
                    <dt className="inline-flex items-center gap-3 text-sm text-white/50"><FiUser className="h-4 w-4 text-[#00D4C7]" /> Username</dt>
                    <dd className="text-sm font-medium text-white">@{profile.username}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-4">
                    <dt className="inline-flex items-center gap-3 text-sm text-white/50"><FiMail className="h-4 w-4 text-[#00D4C7]" /> Email address</dt>
                    <dd className="max-w-[60%] break-all text-right text-sm font-medium text-white">{profile.email}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-4">
                    <dt className="inline-flex items-center gap-3 text-sm text-white/50"><FiCalendar className="h-4 w-4 text-[#00D4C7]" /> Member since</dt>
                    <dd className="text-sm font-medium text-white">August 2026</dd>
                  </div>
                </dl>
              )}
            </section>

            <section aria-labelledby="membership-heading">
              <h2 id="membership-heading" className="text-xl font-semibold text-white">Membership</h2>
              <div className="mt-4 flex items-start gap-4 rounded-2xl border border-[#00D4C7]/15 bg-linear-to-r from-[#00D4C7]/8 to-transparent p-5 sm:p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00D4C7]/12 text-[#00D4C7]">
                  <FiShield className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-white">SUBNET Standard</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/55">
                    Sample membership details for the profile preview.
                  </p>
                </div>
                <span className="ml-auto rounded-full border border-[#00D4C7]/20 bg-[#00D4C7]/10 px-3 py-1 text-xs font-medium text-[#8df3eb]">
                  Demo
                </span>
              </div>
            </section>
          </div>

          <aside className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Your library</h2>
              <p className="mt-1 text-sm text-white/50">Pick up where you left off.</p>
            </div>
            <Link
              to="/my-list"
              className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-white/2.5 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00D4C7]/30 hover:bg-[#00D4C7]/4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4C7]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#00D4C7]/20 bg-[#00D4C7]/8 text-[#00D4C7]">
                <FiBookmark className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-white">My List</span>
                <span className="mt-1 block text-sm text-white/50">{savedItems.length} saved {savedItems.length === 1 ? "title" : "titles"}</span>
              </span>
              <FiArrowUpRight className="h-5 w-5 text-white/35 transition-colors group-hover:text-[#00D4C7]" />
            </Link>
            <Link
              to="/my-list?tab=continue-watching"
              className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-white/2.5 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00D4C7]/30 hover:bg-[#00D4C7]/4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4C7]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#00D4C7]/20 bg-[#00D4C7]/8 text-[#00D4C7]">
                <FiClock className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-white">Continue Watching</span>
                <span className="mt-1 block text-sm text-white/50">{continueWatching.length} {continueWatching.length === 1 ? "title" : "titles"} in progress</span>
              </span>
              <FiArrowUpRight className="h-5 w-5 text-white/35 transition-colors group-hover:text-[#00D4C7]" />
            </Link>
            <p className="px-1 pt-1 text-xs leading-relaxed text-white/35">
              Profile information on this page is sample data and is not connected to an account service.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Profile;