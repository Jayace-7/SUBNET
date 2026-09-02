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
      className="relative h-screen min-h-160 w-full overflow-hidden bg-[#070909]"
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
          background: "linear-gradient(0deg, #070909 0%, transparent 22%)",
        }}
      />

      {/* ============================================================
          MAIN CONTENT
          ============================================================ */}
      <div className="relative z-10 flex h-full w-full items-start pt-52 sm:pt-56 lg:pt-54">
        <div className="w-full max-w-xl px-6 sm:px-8 lg:px-12">
          <p className="text-teal-400 text-lg sm:text-lg font-semibold tracking-[0.25em] mb-2">{FEATURED.label}</p>

          <h1 className="font-title text-white leading-[0.9] text-5xl sm:text-6xl md:text-7xl mb-1 mt-2">
            {FEATURED.title}
          </h1>
          <p className="text-white/90 font-light tracking-[0.30em] text-lg sm:text-xl md:text-2xl mt-1 mb-4">
            {FEATURED.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-white/90 text-sm sm:text-base mb-5">
            <span>{FEATURED.year}</span>
            <span className="border border-white/50 rounded px-2 py-0.5 text-xs sm:text-sm">
              {FEATURED.rating}
            </span>
            <span>{FEATURED.duration}</span>
            <span className="border border-white/50 rounded px-2 py-0.5 text-xs sm:text-sm">
              {FEATURED.quality}
            </span>
            <span>{FEATURED.audio}</span>
          </div>

          <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-md mb-5">
            {FEATURED.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-teal-400 text-sm sm:text-base font-medium mb-7">
            {FEATURED.genres.map((genre, i) => (
              <span key={genre} className="flex items-center gap-2">
                {i > 0 && <span className="text-teal-400/70">&bull;</span>}
                {genre}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-teal-500 text-white hover:bg-teal-400 transition-colors font-semibold text-sm sm:text-base rounded-md px-6 py-3 mb-7 cursor-pointer">
              <FiPlay className="w-5 h-5" />
              Watch Now
            </button>
            <button className="flex items-center gap-2 bg-transparent border border-white/40 hover:border-white/70 transition-colors text-white font-semibold text-sm sm:text-base rounded-md px-6 py-3 mb-7 cursor-pointer">
              <FiPlus className="w-5 h-5" />
              My List
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================
          PAGINATION DOTS
          ============================================================ */}
      <div className="absolute bottom-10 right-6 z-10 flex items-center gap-2 sm:bottom-12 sm:right-10 md:right-16 lg:right-20">
        <span className="h-1 w-7 rounded-full bg-teal-400" />
        <span className="h-1 w-6 rounded-full bg-white/30" />
        <span className="h-1 w-6 rounded-full bg-white/30" />
        <span className="h-1 w-6 rounded-full bg-white/30" />
      </div>
    </section>
  );
}

export default HeroBanner;
