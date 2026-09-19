import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import MoviesComp from "./MoviesComp";

import despicableMePoster from "../../assets/kids shows/Despicable Me.jpg";
import toyStoryPoster from "../../assets/kids shows/Toy Story.jpg";
import lionKingPoster from "../../assets/kids shows/The Lion King.jpg";
import moanaPoster from "../../assets/kids shows/Moana.jpg";
import kungFuPandaPoster from "../../assets/kids shows/Kung Fu Panda.jpg";
import dragonPoster from "../../assets/kids shows/How to Train Your Dragon.jpg";
import frozenPoster from "../../assets/kids shows/frozen 2.jpg";
import zootopiaPoster from "../../assets/kids shows/zootopia.jpg";

const MOVIES = [
  { id: "despicable-me", title: "Despicable Me", poster: despicableMePoster },
  { id: "toy-story", title: "Toy Story", poster: toyStoryPoster },
  { id: "the-lion-king", title: "The Lion King", poster: lionKingPoster },
  { id: "moana", title: "Moana", poster: moanaPoster },
  { id: "kung-fu-panda", title: "Kung Fu Panda", poster: kungFuPandaPoster },
  { id: "how-to-train-your-dragon", title: "How to Train Your Dragon", poster: dragonPoster },
  { id: "frozen-2", title: "Frozen 2", poster: frozenPoster },
  { id: "zootopia", title: "Zootopia", poster: zootopiaPoster },
];

function KidsShows() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeDot, setActiveDot] = useState(0);
  const [dotCount, setDotCount] = useState(1);
  const rowRef = useRef(null);

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

  const handleScroll = () => {
    const row = rowRef.current;
    if (!row) return;
    setActiveDot(Math.round(row.scrollLeft / row.clientWidth));
  };

  const scrollByPage = (direction) => rowRef.current?.scrollBy({ left: direction * rowRef.current.clientWidth, behavior: "smooth" });

  return (
    <section className="mt-0 w-full py-4">
      <h2 className="mb-3 ml-2 px-4 text-xl font-bold text-white sm:px-6 sm:text-2xl">Kids' Shows</h2>
      <div className="group relative w-full">
        <button type="button" onClick={() => scrollByPage(-1)} aria-label="Previous kids' shows" className="absolute left-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/75 text-white opacity-0 shadow-lg transition-opacity hover:bg-black/95 group-hover:opacity-100 sm:left-6"><FiChevronLeft size={20} /></button>
        <div ref={rowRef} onScroll={handleScroll} className="no-scrollbar flex w-full gap-4 overflow-x-auto scroll-smooth px-4 py-4 sm:px-6">
          {MOVIES.map((movie, index) => <MoviesComp key={movie.id} {...movie} isHovered={hoveredIndex === index} onHoverStart={() => setHoveredIndex(index)} onHoverEnd={() => setHoveredIndex(null)} />)}
        </div>
        <button type="button" onClick={() => scrollByPage(1)} aria-label="Next kids' shows" className="absolute right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/75 text-white opacity-0 shadow-lg transition-opacity hover:bg-black/95 group-hover:opacity-100 sm:right-6"><FiChevronRight size={20} /></button>
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        {Array.from({ length: dotCount }).map((_, index) => (
          <span
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === activeDot ? "w-6 bg-[#00D4C7]" : "w-3 bg-white/25"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default KidsShows;
