import { useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import MoviesComp from "./MoviesComp";

const MOVIES = [];

function PopularMovies() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const rowRef = useRef(null);
  const scrollByPage = (direction) => rowRef.current?.scrollBy({ left: direction * rowRef.current.clientWidth * 0.9, behavior: "smooth" });

  return (
    <section className="w-full py-9 mt-2">
      <h2 className="mb-3 ml-2 px-4 text-xl font-bold text-white sm:px-6 sm:text-2xl">Popular Movies</h2>
      <div className="group relative w-full">
        <button type="button" onClick={() => scrollByPage(-1)} aria-label="Previous popular movies" className="absolute left-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/75 text-white opacity-0 shadow-lg transition-opacity hover:bg-black/95 group-hover:opacity-100 sm:left-6"><FiChevronLeft size={20} /></button>
        <div ref={rowRef} className="no-scrollbar flex w-full gap-4 overflow-x-auto scroll-smooth px-4 py-4 sm:px-6">
          {MOVIES.map((movie, index) => <MoviesComp key={movie.id} {...movie} isHovered={hoveredIndex === index} onHoverStart={() => setHoveredIndex(index)} onHoverEnd={() => setHoveredIndex(null)} />)}
        </div>
        <button type="button" onClick={() => scrollByPage(1)} aria-label="Next popular movies" className="absolute right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/75 text-white opacity-0 shadow-lg transition-opacity hover:bg-black/95 group-hover:opacity-100 sm:right-6"><FiChevronRight size={20} /></button>
      </div>
    </section>
  );
}

export default PopularMovies;
