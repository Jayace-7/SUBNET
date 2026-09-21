import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import MoviesComp from "./MoviesComp";

const NUMBER_WIDTHS = {
  1: 58,
  2: 78,
  3: 78,
  4: 80,
  5: 78,
  6: 78,
  7: 78,
  8: 78,
  9: 78,
  10: 80,
};

function RankNumber({ rank }) {
  const width = NUMBER_WIDTHS[rank] ?? 78;
  const gradientId = `rank-stroke-${rank}`;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 80 150"
      className="pointer-events-none relative z-0 h-42 w-auto shrink-0 select-none overflow-visible sm:h-42 md:h-48 lg:h-54"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.75)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.25)" />
        </linearGradient>
      </defs>
      <text
        x={84 - width}
        y="150"
        fontSize="215"
        fontWeight="700"
        fontFamily="'IBM Plex Sans Condensed', 'Arial Narrow', Arial, sans-serif"
        textLength={width}
        lengthAdjust="spacingAndGlyphs"
        fill="transparent"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      >
        {rank}
      </text>
    </svg>
  );
}

function MovieRow({
  title,
  movies,
  eyebrow,
  compact = false,
  ranked = false,
  className = "mt-0 w-full py-4",
  rowClassName,
  ariaLabel,
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeDot, setActiveDot] = useState(0);
  const [dotCount, setDotCount] = useState(1);
  const rowRef = useRef(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return undefined;

    const updateDotCount = () => {
      setDotCount(Math.max(1, Math.ceil(row.scrollWidth / row.clientWidth)));
    };

    updateDotCount();
    window.addEventListener("resize", updateDotCount);
    return () => window.removeEventListener("resize", updateDotCount);
  }, [movies.length]);

  const handleScroll = () => {
    const row = rowRef.current;
    if (!row) return;
    setActiveDot(Math.round(row.scrollLeft / row.clientWidth));
  };

  const scrollByPage = (direction) => {
    const row = rowRef.current;
    if (!row) return;
    row.scrollBy({ left: direction * row.clientWidth, behavior: "smooth" });
  };

  const previousLabel = `Previous ${ariaLabel ?? title}`;
  const nextLabel = `Next ${ariaLabel ?? title}`;

  return (
    <section className={className}>
      <div className={eyebrow ? "mb-3 sm:mb-4" : "mb-3 ml-2 flex w-full items-center px-4 sm:px-6"}>
        {eyebrow && (
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#00D4C7]">
            {eyebrow}
          </p>
        )}
        <h2 className={eyebrow ? "mt-1.5 text-xl font-bold text-white sm:text-2xl" : "text-xl font-bold text-white sm:text-2xl"}>
          {title}
        </h2>
      </div>

      <div className={`group relative ${ranked ? "" : "w-full"}`}>
        <button
          type="button"
          onClick={() => scrollByPage(-1)}
          aria-label={previousLabel}
          className={`absolute ${ranked ? "left-0" : "left-4 sm:left-6"} top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/75 text-white opacity-0 shadow-lg transition-opacity hover:bg-black/95 group-hover:opacity-100`}
        >
          <FiChevronLeft size={20} />
        </button>

        <div
          ref={rowRef}
          onScroll={handleScroll}
          className={rowClassName ?? (ranked ? "no-scrollbar flex items-end justify-start gap-2 overflow-x-auto px-2 py-6 scroll-smooth sm:gap-3 lg:gap-4" : "no-scrollbar flex w-full gap-4 overflow-x-auto scroll-smooth px-4 py-4 sm:px-6")}
        >
          {movies.map((movie, index) => {
            const card = (
              <MoviesComp
                {...movie}
                compact={compact}
                isHovered={hoveredIndex === index}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              />
            );

            if (!ranked) {
              return (
                <div key={`${movie.id}-${index}`} className="shrink-0">
                  {card}
                </div>
              );
            }

            return (
              <article key={`${movie.id}-${index}`} className="relative flex shrink-0 items-end">
                <RankNumber rank={index + 1} />
                <div className="relative z-10 -ml-2 shrink-0 sm:-ml-3">{card}</div>
              </article>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => scrollByPage(1)}
          aria-label={nextLabel}
          className={`absolute ${ranked ? "right-0" : "right-4 sm:right-6"} top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/75 text-white opacity-0 shadow-lg transition-opacity hover:bg-black/95 group-hover:opacity-100`}
        >
          <FiChevronRight size={20} />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        {Array.from({ length: dotCount }).map((_, index) => (
          <span
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${index === activeDot ? "w-6 bg-[#00D4C7]" : "w-3 bg-white/25"}`}
          />
        ))}
      </div>
    </section>
  );
}

export default MovieRow;
