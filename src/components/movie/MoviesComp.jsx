// src/components/movie/MoviesComp.jsx
//
// Single trending-row card. Receives all movie data as props from
// TrendingNow — this component has no knowledge of the movie list itself,
// only how to render one entry plus its Netflix-style hover-expand state.

import {
  FiBell,
  FiCheck,
  FiChevronDown,
  FiPlay,
  FiPlus,
  FiThumbsUp,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { useMyList } from "../mylist/MyListContext";
import formatPosterTitle from "./formatPosterTitle";

function MoviesComp({
  id,
  title,
  poster,
  year = "2024",
  rating = "16+",
  duration = "2h",
  quality = "HD",
  type = "Movie",
  genres = [],
  badge,
  compact = false,
  isHovered,
  onHoverStart,
  onHoverEnd,
}) {
  const navigate = useNavigate();
  const { toggleSavedItem, hasSavedItem } = useMyList();
  const displayTitle = formatPosterTitle(title);
  const isSaved = hasSavedItem(id ?? title);

  const handlePlay = (event) => {
    event.stopPropagation();
    const itemId = id ?? title;
    if (itemId) {
      navigate(`/watch/${encodeURIComponent(itemId)}`);
    }
  };

  const handleToggleSaved = (event) => {
    event.stopPropagation();
    const itemId = id ?? title;
    toggleSavedItem({
      id: itemId,
      title: displayTitle,
      poster,
      year,
      type,
      rating,
      duration,
      quality,
      genres,
    });
  };

  return (
    <div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onTouchStart={onHoverStart}
      className={`trend-glow relative shrink-0 cursor-pointer overflow-hidden rounded-lg bg-[#151918] ${
        compact ? "w-28 sm:w-28 md:w-28 lg:w-36" : "w-36 sm:w-44"
      } ${
        isHovered ? "trend-glow--active z-10" : "z-0"
      }`}
    >
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-lg bg-[#111414]">
        <img
          src={poster}
          alt={displayTitle}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover transition-transform duration-300 ease-out ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />

        {badge && (
          <span className="absolute bottom-2 left-2 rounded bg-[#00B8A9] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            {badge}
          </span>
        )}

        <div
          className={`absolute inset-x-0 bottom-0 bg-linear-to-t from-[#0b0d0d] via-[#0b0d0d]/95 to-transparent px-3 pb-3 pt-14 transition-all duration-300 ease-out ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
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
              aria-label={`Play ${displayTitle}`}
              onClick={handlePlay}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-colors duration-150 hover:bg-white/85 cursor-pointer"
            >
              <FiPlay size={14} />
            </button>
            <button
              type="button"
              aria-label="Remind me"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 text-white transition-colors duration-150 hover:border-white cursor-pointer"
            >
              <FiBell size={14} />
            </button>
            <button
              type="button"
              aria-label={isSaved ? `Remove ${displayTitle} from My List` : `Add ${displayTitle} to My List`}
              onClick={handleToggleSaved}
              className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-150 cursor-pointer ${
                isSaved
                  ? "border-[#00D4C7] bg-[#00D4C7] text-[#071111]"
                  : "border-white/50 text-white hover:border-white"
              }`}
            >
              {isSaved ? <FiCheck size={14} /> : <FiPlus size={14} />}
            </button>
            <button
              type="button"
              aria-label="Like"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 text-white transition-colors duration-150 hover:border-white cursor-pointer"
            >
              <FiThumbsUp size={14} />
            </button>
            <button
              type="button"
              aria-label="More details"
              className="ml-auto flex h-8 w-8 items-center justify-center rounded-full border border-white/50 text-white transition-colors duration-150 hover:border-white cursor-pointer"
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
