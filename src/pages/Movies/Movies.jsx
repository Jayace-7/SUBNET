import { useRef, useState } from "react";
import { FiChevronDown, FiPlay, FiPlus, FiSearch } from "react-icons/fi";

import TrendingNow from "../../components/movie/TrendingNow";
import PopularMovies from "../../components/movie/PopularMovies";
import Action from "../../components/movie/Action";
import Series from "../../components/movie/Series";
import CrimeThriller from "../../components/movie/Crime & Thriller";
import DramaRomance from "../../components/movie/Drama & Romance";
import ActionSeries from "../../components/movie/Action Series";
import Sitcom from "../../components/movie/sitcom";
import Comedy from "../../components/movie/comedy";
import KoreanTV from "../../components/movie/koreantv";
import Bollywood from "../../components/movie/bollywood";
import Horror from "../../components/movie/Horror";
import AnimatedShows from "../../components/movie/Animated shows";
import Anime from "../../components/movie/Anime";
import KidsShows from "../../components/movie/KidsShows";
import Nollywood from "../../components/movie/Nollywood";
import moviesHeroImage from "../../assets/movies hero/Spider man brand new day.jpg";
import moviesHeroTrailer from "../../assets/movies hero/SPIDER-MAN_ BRAND NEW DAY – Final Trailer (Peter’s Journey) 4K.mp4";
import spiderManPoster from "../../assets/popularmovies/SBND.jpg";

const filters = [
  ["Genre", "All Genres", ["All Genres", "Action", "Comedy", "Drama"]],
  ["Year", "All Years", ["All Years", "2024", "2023", "2022"]],
  ["Rating", "All Ratings", ["All Ratings", "PG", "PG-13", "16+", "18+"]],
  ["Sort by", "Latest", ["Latest", "Popular", "A–Z"]],
];

function Pill({ children, className = "" }) {
  return (
    <span className={`rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white/90 ${className}`}>
      {children}
    </span>
  );
}

function Hero() {
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovering(true);
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <section
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative z-0 mx-5 mt-22 h-[clamp(27rem,calc(100svh-6.5rem),46rem)] w-[calc(100%-2.5rem)] overflow-hidden rounded-2xl border border-[#00D4C7]/35 bg-[#070909] shadow-[0_0_0_1px_rgba(0,212,199,0.08),0_10px_36px_rgba(0,212,199,0.14)] sm:mx-8 sm:mt-26 sm:w-[calc(100%-4rem)]"
    >
      <img
        src={moviesHeroImage}
        alt="Spider-Man: Brand New Day"
        className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ease-in-out ${isHovering ? "opacity-0" : "opacity-100"}`}
      />
      <video
        ref={videoRef}
        src={moviesHeroTrailer}
        poster={spiderManPoster}
        muted
        loop
        playsInline
        preload="none"
        className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ease-in-out ${isHovering ? "opacity-100" : "opacity-0"}`}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(90deg, #070909 0%, rgba(7,9,9,0.85) 20%, rgba(7,9,9,0.35) 45%, transparent 62%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(0deg, #070909 0%, transparent 30%)" }}
      />

      <div className="relative z-10 flex h-full w-full items-end pb-8 sm:pb-10">
        <div className="w-full max-w-lg px-5 sm:px-8 lg:px-12">
          <Pill className="bg-teal-400/20! text-teal-300!">FEATURED MOVIE</Pill>
          <h1 className="mt-4 font-title text-4xl leading-[0.9] text-white sm:text-5xl">SPIDER-MAN</h1>
          <p className="mb-3 mt-2 text-base font-light tracking-[0.25em] text-white/90 sm:text-lg">BRAND NEW DAY</p>
          <p className="mb-5 max-w-md text-xs leading-snug text-white/85 sm:text-sm">
            A new chapter begins for Peter Parker.
          </p>
          <div className="flex items-center gap-3">
            <button className="flex cursor-pointer items-center gap-1 rounded-md bg-teal-500 px-3 py-1.5 text-xs font-semibold text-white shadow-[0_4px_16px_rgba(20,184,166,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-400 hover:shadow-[0_8px_20px_rgba(45,212,191,0.35)]">
              <FiPlay className="h-3.5 w-3.5" /> Watch Now
            </button>
            <button className="flex cursor-pointer items-center gap-1 rounded-md border border-white/65 bg-[#070909]/45 px-3 py-1.5 text-xs font-semibold text-white shadow-[0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00D4C7] hover:bg-white/10 hover:shadow-[0_8px_20px_rgba(0,212,199,0.2)]">
              <FiPlus className="h-3.5 w-3.5" /> My List
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 right-5 z-10 flex items-center gap-1.5 sm:bottom-7 sm:right-8">
        <span className="h-0.5 w-5 rounded-full bg-teal-300 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
        <span className="h-0.5 w-4 rounded-full bg-white/65" />
        <span className="h-0.5 w-4 rounded-full bg-white/65" />
        <span className="h-0.5 w-4 rounded-full bg-white/65" />
      </div>
    </section>
  );
}

function FilterDropdown({ label, initialValue, options }) {
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeoutRef = useRef(null);
  const menuId = `filter-${label.toLowerCase().replace(/\s+/g, "-")}`;

  const openMenu = () => {
    clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = null;
    setIsOpen(true);
  };

  const closeMenu = () => {
    clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = null;
    setIsOpen(false);
  };

  const scheduleMenuClose = () => {
    clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(closeMenu, 120);
  };

  const handleTriggerKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openMenu();
    }
    if (event.key === "Escape") closeMenu();
  };

  return (
    <div
      onMouseLeave={scheduleMenuClose}
      className={`group relative flex h-14 min-w-0 flex-col justify-center gap-1 rounded-xl border bg-[#0d131b] px-4 transition-colors ${
        isOpen
          ? "z-40 border-[#00D4C7]/70 ring-2 ring-[#00D4C7]/15"
          : "border-white/10 hover:border-white/20 focus-within:border-[#00D4C7]/70 focus-within:ring-2 focus-within:ring-[#00D4C7]/15"
      }`}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/45 transition-colors group-focus-within:text-[#00D4C7]">
        {label}
      </span>
      <div className="flex w-full items-center">
        <button
          type="button"
          aria-label={`${label}: ${selectedValue}`}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-controls={menuId}
          onClick={() => setIsOpen((open) => !open)}
          onKeyDown={handleTriggerKeyDown}
          className="min-w-0 flex-1 truncate py-1 pl-1 text-left text-sm font-medium text-white outline-none"
        >
          {selectedValue}
        </button>
        <button
          type="button"
          aria-label={`${isOpen ? "Close" : "Open"} ${label} options`}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-controls={menuId}
          onMouseEnter={openMenu}
          onClick={() => setIsOpen((open) => !open)}
          onKeyDown={handleTriggerKeyDown}
          className="ml-1 grid h-8 w-8 shrink-0 place-items-center rounded-md text-white/50 transition-colors hover:bg-white/5 hover:text-[#00D4C7] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#00D4C7]"
        >
          <FiChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </div>
      {isOpen && (
        <div
          id={menuId}
          role="menu"
          aria-label={`${label} options`}
          onMouseEnter={openMenu}
          onMouseLeave={scheduleMenuClose}
          className="absolute left-0 right-0 top-full z-50 max-h-56 overflow-y-auto rounded-lg border border-white/10 bg-[#111923] p-1.5 shadow-xl shadow-black/40"
        >
          {options.map((option) => (
            <button
              key={option}
              type="button"
              role="menuitemradio"
              aria-checked={option === selectedValue}
              onClick={() => {
                setSelectedValue(option);
                closeMenu();
              }}
              className={`block w-full rounded-md px-3 py-2.5 text-left text-sm transition-colors hover:bg-white/8 focus-visible:bg-white/8 focus-visible:outline-none ${
                option === selectedValue ? "font-semibold text-[#00D4C7]" : "text-white/85"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Filters() {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-[minmax(15rem,1.6fr)_repeat(4,minmax(8rem,1fr))]">
      <label className="group col-span-2 flex h-14 items-center gap-3 rounded-xl border border-white/10 bg-[#0d131b] px-5 transition-colors hover:border-white/20 focus-within:border-[#00D4C7]/70 focus-within:ring-2 focus-within:ring-[#00D4C7]/15 md:col-span-1">
        <FiSearch className="h-4 w-4 shrink-0 text-white/45 transition-colors group-focus-within:text-[#00D4C7]" />
        <input
          type="search"
          placeholder="Search movies..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
        />
      </label>
      {filters.map(([label, value, options]) => (
        <FilterDropdown
          key={label}
          label={label}
          initialValue={value}
          options={options}
        />
      ))}
    </div>
  );
}

function Movies() {
  return (
    <div className="min-h-screen bg-[#070909] font-sans text-white">
      <Hero />
      <main className="mx-auto max-w-350 px-4 pb-16 pt-4 md:px-8">
        <Filters />
        <TrendingNow />
        <PopularMovies />
        <Action />
        <Series />
        <CrimeThriller />
        <DramaRomance />
        <ActionSeries />
        <Sitcom />
        <Comedy />
        <KoreanTV />
        <Bollywood />
        <Horror />
        <AnimatedShows />
        <Anime />
        <KidsShows />
        <Nollywood />
      </main>
    </div>
  );
}

export default Movies;