import { useMemo, useState } from "react";
import {
  FiBookmark,
  FiChevronRight,
  FiClock,
  FiPlay,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import heroBackground from "../../assets/movies hero/Spider man brand new day.webp";
import { useMyList } from "../../components/mylist/MyListContext";

const TAB_OPTIONS = [
  { id: "all", label: "All" },
  { id: "continue-watching", label: "Continue Watching" },
  { id: "watch-later", label: "Watch Later" },
];

// Shows the saved titles and lets the user switch between list tabs.
function Mylist() {
  const navigate = useNavigate();
  const { savedItems, continueWatching, watchLater, removeSavedItem, getSavedItem } = useMyList();
  const [activeTab, setActiveTab] = useState("all");

  // Picks the titles that match the selected tab.
  const filteredItems = useMemo(() => {
    if (activeTab === "continue-watching") return continueWatching;
    if (activeTab === "watch-later") return watchLater;
    return savedItems;
  }, [activeTab, continueWatching, savedItems, watchLater]);

  // Builds one row of saved title cards, or nothing if it has no titles.
  const renderSection = (title, description, items, type) => {
    const sectionItems = items ?? [];

    if (sectionItems.length === 0) {
      return null;
    }

    return (
      <section className="space-y-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white">
              {type === "continue" ? <FiClock className="h-5 w-5 text-[#00D4C7]" /> : <FiBookmark className="h-5 w-5 text-[#00D4C7]" />}
              {title}
            </h2>
            <p className="mt-1 text-sm text-white/60">{description}</p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab(type === "continue" ? "continue-watching" : "watch-later")}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#00D4C7] transition-colors hover:text-[#65f0ea]"
          >
            View All <FiChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {sectionItems.map((item) => {
            const savedItem = getSavedItem(item.id);
            const progressPercent = savedItem && savedItem.duration > 0
              ? Math.min(100, (savedItem.playbackPosition / savedItem.duration) * 100)
              : 0;

            return (
              <article key={item.id} className="overflow-hidden rounded-xl border border-[#00D4C7]/18 bg-[#0a1113] shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
                <div className="relative">
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="h-52 w-full object-cover"
                  />
                  <button
                    type="button"
                    aria-label={`Remove ${item.title}`}
                    onClick={() => removeSavedItem(item.id)}
                    className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-[#030a0b]/70 text-white/80 transition-colors hover:border-[#00D4C7]/60 hover:text-[#00D4C7]"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-3 p-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-[11px] text-white/60">
                        {item.year ?? "New"} • {item.type ?? "Movie"}
                      </p>
                    </div>
                  </div>

                  {type === "continue" && savedItem && savedItem.duration > 0 && (
                    <div>
                      <div className="mb-1.5 flex items-center justify-between text-[10px] uppercase tracking-[0.12em] text-white/60">
                        <span>{item.duration ? "Time left" : "Progress"}</span>
                        <span>{Math.round(progressPercent)}%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-[#00D4C7]" style={{ width: `${progressPercent}%` }} />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => navigate(`/watch/${encodeURIComponent(item.id)}`)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#00D4C7] px-3 py-2 text-xs font-semibold text-[#061010] transition-opacity hover:opacity-90"
                    >
                      <FiPlay className="h-3.5 w-3.5" /> {type === "continue" ? "Resume" : "Watch"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    );
  };

  const isTabFiltered = activeTab !== "all";

  return (
    <div className="mx-auto max-w-367.5 px-4 pb-14 pt-24 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[30px] border border-[#0f2d2e] bg-[#040b0f] shadow-[0_20px_80px_rgba(0,0,0,0.4)]">
        <div className="relative overflow-hidden border-b border-white/5 bg-[#061114]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,212,199,0.18),transparent_34%)]" />
          <img
            src={heroBackground}
            alt="My List hero"
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,11,15,0.92),rgba(4,11,15,0.6),rgba(4,11,15,0.4))]" />

          <div className="relative z-10 px-6 pb-8 pt-8 sm:px-8 lg:px-10">
            <img
              src="/favicon.png"
              alt="SUBNET"
              className="mb-4 h-10 w-10 object-contain"
            />

            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="flex items-center gap-3 text-4xl font-bold text-white sm:text-5xl">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#00D4C7]/40 bg-[#00D4C7]/10 text-[#00D4C7]">
                    <FiBookmark className="h-5 w-5" />
                  </span>
                  My List
                </h1>
                <p className="mt-3 text-base text-white/70">Your entertainment, right where you left it.</p>
              </div>
            </div>

            <div className="mt-7 inline-flex rounded-full border border-[#00D4C7]/25 bg-[rgba(11,19,20,0.68)] p-1.5 backdrop-blur-sm">
              {TAB_OPTIONS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                    activeTab === tab.id
                      ? "bg-[#00D4C7] text-[#061010] shadow-[0_0_20px_rgba(0,212,199,0.35)]"
                      : "text-white/75 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-10 px-6 py-7 sm:px-8 lg:px-10 lg:py-9">
          {activeTab === "all" ? (
            <>
              {renderSection(
                "Continue Watching",
                "Pick up where you left off.",
                continueWatching,
                "continue"
              )}
              {renderSection(
                "Watch Later",
                "Save shows and movies to watch whenever you’re ready.",
                watchLater,
                "later"
              )}
              {savedItems.length === 0 && (
                <div className="rounded-2xl border border-dashed border-[#00D4C7]/30 bg-[#0a1010]/70 px-6 py-12 text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#00D4C7]/25 bg-[#00D4C7]/10 text-[#00D4C7]">
                    <FiBookmark className="h-7 w-7" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">Your saved list is empty</h2>
                  <p className="mx-auto mt-3 max-w-lg text-sm text-white/60">
                    Save titles from the catalogue to keep them here for later.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("/movies")}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#00D4C7] px-5 py-2.5 text-sm font-semibold text-[#061010] transition-opacity hover:opacity-90"
                  >
                    <FiPlus className="h-4 w-4" /> Browse Movies
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {filteredItems.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#00D4C7]/30 bg-[#0a1010]/70 px-6 py-12 text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#00D4C7]/25 bg-[#00D4C7]/10 text-[#00D4C7]">
                    {isTabFiltered && activeTab === "continue-watching" ? <FiClock className="h-7 w-7" /> : <FiBookmark className="h-7 w-7" />}
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    {activeTab === "continue-watching" ? "Nothing in Continue Watching yet" : "Your Watch Later list is empty"}
                  </h2>
                  <p className="mx-auto mt-3 max-w-lg text-sm text-white/60">
                    {activeTab === "continue-watching"
                      ? "Start watching a title to keep your progress here."
                      : "Add titles you want to watch later and they’ll show up here."}
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate(activeTab === "continue-watching" ? "/movies" : "/tv-shows")}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#00D4C7] px-5 py-2.5 text-sm font-semibold text-[#061010] transition-opacity hover:opacity-90"
                  >
                    <FiPlus className="h-4 w-4" /> Browse {activeTab === "continue-watching" ? "Movies" : "TV Shows"}
                  </button>
                </div>
              ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                  {filteredItems.map((item) => {
                    const savedItem = getSavedItem(item.id);
                    const progressPercent = savedItem && savedItem.duration > 0
                      ? Math.min(100, (savedItem.playbackPosition / savedItem.duration) * 100)
                      : 0;

                    return (
                      <article key={item.id} className="overflow-hidden rounded-xl border border-[#00D4C7]/18 bg-[#0a1113] shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
                        <div className="relative">
                          <img src={item.poster} alt={item.title} className="h-52 w-full object-cover" />
                          <button
                            type="button"
                            aria-label={`Remove ${item.title}`}
                            onClick={() => removeSavedItem(item.id)}
                            className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-[#030a0b]/70 text-white/80"
                          >
                            <FiTrash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="space-y-3 p-3.5">
                          <div>
                            <h3 className="truncate text-lg font-semibold text-white">{item.title}</h3>
                            <p className="mt-1 text-[11px] text-white/60">{item.year ?? "New"} • {item.type ?? "Movie"}</p>
                          </div>

                          {activeTab === "continue-watching" && savedItem && savedItem.duration > 0 && (
                            <div>
                              <div className="mb-1.5 flex items-center justify-between text-[10px] uppercase tracking-[0.12em] text-white/60">
                                <span>Progress</span>
                                <span>{Math.round(progressPercent)}%</span>
                              </div>
                              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                                <div className="h-full rounded-full bg-[#00D4C7]" style={{ width: `${progressPercent}%` }} />
                              </div>
                            </div>
                          )}

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => navigate(`/watch/${encodeURIComponent(item.id)}`)}
                              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#00D4C7] px-3 py-2 text-xs font-semibold text-[#061010]"
                            >
                              <FiPlay className="h-3.5 w-3.5" /> {activeTab === "continue-watching" ? "Resume" : "Watch"}
                            </button>
                            <button
                              type="button"
                              onClick={() => removeSavedItem(item.id)}
                              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/4 px-3 py-2 text-xs font-semibold text-white"
                            >
                              <FiTrash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mylist;