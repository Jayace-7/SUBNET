import { useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import MoviesComp from "./MoviesComp";

const movieFiles = import.meta.glob("../../assets/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const MOVIE_POSTERS = Object.entries(movieFiles)
  .filter(([path]) => !/(\/hero\/|\/logo\/|\/icons\/|\/videos\/)/i.test(path))
  .map(([path, poster]) => {
    const fileName = path.split("/").pop().replace(/\.[^/.]+$/, "");

    return {
      id: fileName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      title: fileName.replace(/[-_]/g, " "),
      poster,
    };
  });

function getRandomTopMovies() {
  return [...MOVIE_POSTERS]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);
}

/* Glyph widths inside the 80 x 150 viewBox ("1" is narrower, like the reference) */
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
  const width = NUMBER_WIDTHS[rank];
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

function TopMoviesWeek() {
  const [movies] = useState(getRandomTopMovies);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const rowRef = useRef(null);

  const scrollByPage = (direction) => {
    rowRef.current?.scrollBy({
      left: direction * rowRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="mx-auto my-8 w-full max-w-7xl px-4 sm:px-6 lg:my-12 lg:px-10">
      <div className="mb-3 sm:mb-4">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#00D4C7]">
          Weekly spotlight
        </p>
        <h2 className="mt-1.5 text-xl font-bold text-white sm:text-2xl">
          Top 10 Movies This Week
        </h2>
      </div>

      <div className="group relative">
        <button
          type="button"
          onClick={() => scrollByPage(-1)}
          aria-label="Previous top movies"
          className="absolute left-0 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/80 text-white opacity-0 shadow-lg transition-opacity duration-200 hover:bg-black group-hover:opacity-100"
        >
          <FiChevronLeft size={20} />
        </button>

        <div
          ref={rowRef}
          className="no-scrollbar flex items-end justify-start gap-2 overflow-x-auto px-2 py-6 scroll-smooth sm:gap-3 lg:gap-4"
        >
          {movies.map((movie, index) => (
            <article
              key={`${movie.id}-${index}`}
              className="relative flex shrink-0 items-end"
            >
              <RankNumber rank={index + 1} />

              <div className="relative z-10 -ml-2 shrink-0 sm:-ml-3">
                <MoviesComp
                  {...movie}
                  compact
                  isHovered={hoveredIndex === index}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                />
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollByPage(1)}
          aria-label="Next top movies"
          className="absolute right-0 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/80 text-white opacity-0 shadow-lg transition-opacity duration-200 hover:bg-black group-hover:opacity-100"
        >
          <FiChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}

export default TopMoviesWeek;