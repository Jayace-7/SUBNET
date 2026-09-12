// src/components/movie/TrendingNow.jsx
//
// Home page "Trending Now" row. Owns the movie data and the hover state
// that drives the Netflix-style expand + neighbor-push effect; MoviesComp
// stays a dumb presentational card.

import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import MoviesComp from "./MoviesComp";

// NOTE: these filenames contain spaces/an "&" — they must match the
// actual files in src/assets/trending/ exactly (case + spacing).
import avatarPoster from "../../assets/trending/Avatar The Last Airbender.jpg";
import deadpoolPoster from "../../assets/trending/Deadpool & Wolverine.jpg";
import dunePoster from "../../assets/trending/Dune Part Two.png";
import oppenheimerPoster from "../../assets/trending/Oppenheimer.png";
import spidermanPoster from "../../assets/trending/Spider-Man.jpg";
import batmanPoster from "../../assets/trending/The Batman.jpg";

// Placeholder metadata until real movie data exists — swap this for an
// API/DB response later without touching the layout below.
const MOVIES = [
  {
    id: "dune-2",
    title: "Dune: Part Two",
    poster: dunePoster,
    year: "2024",
    rating: "16+",
    duration: "2h 46m",
    quality: "HD",
    genres: ["Action", "Adventure", "Sci-Fi"],
    rank: 1,
  },
  {
    id: "oppenheimer",
    title: "Oppenheimer",
    poster: oppenheimerPoster,
    year: "2023",
    rating: "16+",
    duration: "3h 0m",
    quality: "HD",
    genres: ["Drama", "History"],
    rank: 2,
  },
  {
    id: "deadpool-wolverine",
    title: "Deadpool & Wolverine",
    poster: deadpoolPoster,
    year: "2024",
    rating: "18+",
    duration: "2h 8m",
    quality: "HD",
    genres: ["Action", "Comedy"],
    rank: 3,
    badge: "New",
  },
  {
    id: "spiderman",
    title: "Spider-Man",
    poster: spidermanPoster,
    year: "2023",
    rating: "PG",
    duration: "1h 57m",
    quality: "HD",
    genres: ["Action", "Animation"],
  },
  {
    id: "avatar-tla",
    title: "Avatar: The Last Airbender",
    poster: avatarPoster,
    year: "2024",
    rating: "PG",
    type: "Series",
    quality: "HD",
    genres: ["Adventure", "Fantasy"],
    badge: "Recently Added",
  },
  {
    id: "the-batman",
    title: "The Batman",
    poster: batmanPoster,
    year: "2022",
    rating: "16+",
    duration: "2h 56m",
    quality: "HD",
    genres: ["Action", "Crime"],
  },
];

function TrendingNow() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeDot, setActiveDot] = useState(0);
  const [dotCount, setDotCount] = useState(1);
  const rowRef = useRef(null);

  // Recompute how many "pages" the row has whenever it resizes, so the
  // pagination dots stay accurate instead of a hardcoded guess.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return undefined;

    const updateDotCount = () => {
      const pages = Math.max(1, Math.ceil(row.scrollWidth / row.clientWidth));
      setDotCount(pages);
    };

    updateDotCount();
    window.addEventListener("resize", updateDotCount);
    return () => window.removeEventListener("resize", updateDotCount);
  }, []);

  // Keep the active pagination dot in sync with actual scroll position.
  const handleScroll = () => {
    const row = rowRef.current;
    if (!row) return;
    const page = Math.round(row.scrollLeft / row.clientWidth);
    setActiveDot(page);
  };

  const scrollByPage = (direction) => {
    const row = rowRef.current;
    if (!row) return;
    row.scrollBy({ left: direction * row.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <section className="w-full py-9 mt-2">
      {/* Header row: title + pagination dots, matching the Prime Video
          "See more" pattern but using dots instead of a text link, per
          the approved reference. */}
      <div className="mb-3 ml-2 flex w-full items-center px-4 sm:px-6">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Trending Now
        </h2>
      </div>

      {/* Row wrapper: relative so the prev/next arrows can be absolutely
          positioned at its edges, and group so they only reveal on
          hover of the row itself. */}
      <div className="group relative w-full">
        <button
          type="button"
          onClick={() => scrollByPage(-1)}
          aria-label="Previous"
          className="absolute left-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/75 text-white opacity-0 shadow-lg transition-opacity duration-200 hover:bg-black/95 group-hover:opacity-100 sm:left-6"
        >
          <FiChevronLeft size={20} />
        </button>

        {/* The extra vertical padding gives the lifted/scaled hover card room
            inside the horizontal scroller. Scrollbar hidden via the
            .no-scrollbar utility added to index.css. */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="no-scrollbar flex w-full gap-4 overflow-x-auto scroll-smooth px-4 py-4 sm:px-6"
        >
          {MOVIES.map((movie, index) => (
            <MoviesComp
              key={movie.id}
              {...movie}
              isHovered={hoveredIndex === index}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollByPage(1)}
          aria-label="Next"
          className="absolute right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/75 text-white opacity-0 shadow-lg transition-opacity duration-200 hover:bg-black/95 group-hover:opacity-100 sm:right-6"
        >
          <FiChevronRight size={20} />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        {Array.from({ length: dotCount }).map((_, i) => (
          <span
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === activeDot ? "w-6 bg-[#00D4C7]" : "w-3 bg-white/25"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default TrendingNow;
