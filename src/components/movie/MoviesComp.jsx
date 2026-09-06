// src/components/movie/MoviesComp.jsx
//
// Single trending-row card. Receives all movie data as props from
// TrendingNow — this component has no knowledge of the movie list itself,
// only how to render one entry plus its Netflix-style hover-expand state.

import {
  FiPlay,
  FiPlus,
  FiBell,
  FiThumbsUp,
  FiChevronDown,
} from "react-icons/fi";

function MoviesComp({
  title,
  poster,
  year,
  rating,
  duration,
  quality,
  type,
  genres = [],
  badge,
  isHovered,
  onHoverStart,
  onHoverEnd,
}) {
  return (
    <div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className={`trend-glow relative w-40 shrink-0 cursor-pointer overflow-hidden rounded-lg sm:w-48 ${
        isHovered ? "trend-glow--active z-10" : "z-0"
      }`}
    >
      {/* Poster / key art */}
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-lg bg-[#111414]">
        <img
          src={poster}
          alt={title}
          className="h-full w-full object-cover"
        />

        {/* Optional ribbon, e.g. "New Season" / "Recently Added" — kept
            on-brand (teal) instead of Netflix's red, per the SUBNET
            color system. */}
        {badge && (
          <span className="absolute bottom-2 left-2 rounded bg-[#00B8A9] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            {badge}
          </span>
        )}

        <div
          className={`absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/95 to-transparent px-3 pb-3 pt-12 transition-all duration-200 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <p className="mb-1 text-sm font-semibold text-white">{title}</p>

          <div className="mb-1.5 flex flex-wrap items-center gap-2 text-[11px] text-white">
            {year && <span>{year}</span>}
            {rating && (
              <span className="rounded border border-[#00D4C7]/70 px-1.5 py-0.5 font-semibold leading-none text-white">
                {rating}
              </span>
            )}
            {duration && <span>{duration}</span>}
            {type && <span>{type}</span>}
            {quality && (
              <span className="rounded border border-white/40 px-1.5 py-0.5 font-semibold leading-none text-white">
                {quality}
              </span>
            )}
          </div>

          {genres.length > 0 && (
            <p className="mb-2 text-[11px] font-medium text-white">
              {genres.join(" \u2022 ")}
            </p>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={`Play ${title}`}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-colors duration-150 hover:bg-white/85"
            >
              <FiPlay size={14} />
            </button>
            <button
              type="button"
              aria-label="Remind me"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 text-white transition-colors duration-150 hover:border-white"
            >
              <FiBell size={14} />
            </button>
            <button
              type="button"
              aria-label="Add to My List"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 text-white transition-colors duration-150 hover:border-white"
            >
              <FiPlus size={14} />
            </button>
            <button
              type="button"
              aria-label="Like"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 text-white transition-colors duration-150 hover:border-white"
            >
              <FiThumbsUp size={14} />
            </button>
            <button
              type="button"
              aria-label="More details"
              className="ml-auto flex h-8 w-8 items-center justify-center rounded-full border border-white/50 text-white transition-colors duration-150 hover:border-white"
            >
              <FiChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviesComp;
