// src/components/hero/HeroBanner.jsx
//
// SUBNET Hero Section — featured title banner for the Home page.
// Currently hardcoded to "Dune: Part Two" per the approved reference.

import { useRef, useState } from "react";
import { FiPlay, FiPlus } from "react-icons/fi";

import heroImage from "../../assets/hero/dune-part-two-hero.jpg";
import heroTrailer from "../../assets/hero/dune-part-two-preview.mp4";

const FEATURED = {
  label: "SUBNET ORIGINAL",
  title: "DUNE",
  subtitle: "PART TWO",
  year: "2024",
  rating: "16+",
  duration: "2h 46m",
  quality: "HD",
  audio: "5.1",
  description:
    "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
  genres: ["Action", "Adventure", "Sci-Fi"],
};

function HeroBanner() {
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
      className="relative z-0 mx-5 mt-22 h-[clamp(27rem,calc(100svh-6.5rem),46rem)] w-[calc(50%-2.5rem)] overflow-hidden rounded-2xl border border-[#00D4C7]/35 bg-[#070909] shadow-[0_0_0_1px_rgba(0,212,199,0.08),0_10px_36px_rgba(0,212,199,0.14)] sm:mx-8 sm:mt-26 sm:w-[calc(100%-4rem)]"
    >
      {/* ============================================================
          BACKGROUND LAYER: poster image + trailer video crossfade
          ============================================================ */}
      <img
        src={heroImage}
        alt={`${FEATURED.title}: ${FEATURED.subtitle}`}
        className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
        isHovering ? "opacity-0" : "opacity-100"
     }`}
   />

      <video
         ref={videoRef}
      src={heroTrailer}
      muted
      loop
      playsInline
      preload="none"
      className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
      isHovering ? "opacity-100" : "opacity-0"
    }`}
  />

      {/* Left-to-right scrim so text stays legible over any hero image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #070909 0%, rgba(7,9,9,0.85) 20%, rgba(7,9,9,0.35) 45%, transparent 62%)",
        }}
      />
      {/* Bottom fade so the pagination dots sit on a dark base */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(0deg, #070909 0%, transparent 30%)",
        }}
      />

      {/* ============================================================
          MAIN CONTENT
          ============================================================ */}
      <div className="relative z-10 flex h-full w-full items-end pb-4 sm:pb-6">
        <div className="w-full max-w-lg px-6 sm:px-8 lg:px-12">
          <p className="text-teal-400 text-md sm:text-base font-semibold tracking-[0.25em] mb-1">{FEATURED.label}</p>

          <h1 className="font-title text-white leading-[0.9] text-3xl sm:text-4xl md:text-5xl mb-1">
            {FEATURED.title}
          </h1>
          <p className="text-white/90 font-light tracking-[0.30em] text-base sm:text-lg mb-2">
            {FEATURED.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-white/90 text-xs sm:text-sm mb-2">
            <span>{FEATURED.year}</span>
            <span className="border border-white/50 rounded px-2 py-0.5 text-[10px] sm:text-xs">
              {FEATURED.rating}
            </span>
            <span>{FEATURED.duration}</span>
            <span className="border border-white/50 rounded px-2 py-0.5 text-[10px] sm:text-xs">
              {FEATURED.quality}
            </span>
            <span>{FEATURED.audio}</span>
            {FEATURED.genres.map((genre) => (
              <span key={genre} className="flex items-center gap-2">
                <span className="text-teal-400/70">&bull;</span>
                <span className="text-teal-400">{genre}</span>
              </span>
            ))}
          </div>

          <p className="text-white/85 text-xs sm:text-sm leading-snug max-w-md mb-3 line-clamp-2">
            {FEATURED.description}
          </p>

          <div className="flex items-center gap-3">
            <button className="flex cursor-pointer items-center gap-1 rounded-md bg-teal-500 px-3 py-1.5 text-xs font-semibold text-white shadow-[0_4px_16px_rgba(20,184,166,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-400 hover:shadow-[0_8px_20px_rgba(45,212,191,0.35)]">
              <FiPlay className="h-3.5 w-3.5" />
              Watch Now
            </button>
            <button className="flex cursor-pointer items-center gap-1 rounded-md border border-white/65 bg-[#070909]/45 px-3 py-1.5 text-xs font-semibold text-white shadow-[0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00D4C7] hover:bg-white/10 hover:shadow-[0_8px_20px_rgba(0,212,199,0.2)]">
              <FiPlus className="h-3.5 w-3.5" />
              My List
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================
          PAGINATION DOTS
          ============================================================ */}
      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 sm:bottom-6 sm:right-8 md:right-14 lg:right-18">
        <span className="h-0.5 w-5 rounded-full bg-teal-300 shadow-[0_0_8px_rgba(45,212,191,0.8)] sm:w-4 lg:w-5" />
        <span className="h-0.5 w-4 rounded-full bg-white/65 sm:w-3 lg:w-4" />
        <span className="h-0.5 w-4 rounded-full bg-white/65 sm:w-3 lg:w-4" />
        <span className="h-0.5 w-4 rounded-full bg-white/65 sm:w-3 lg:w-4" />
      </div>
    </section>
  );
}

export default HeroBanner;