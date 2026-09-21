import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import MoviesComp from "./MoviesComp";

const movieFiles = import.meta.glob("../../assets/crime and thriller/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const MOVIES = Object.entries(movieFiles)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, poster]) => {
    const fileName = path.split("/").pop().replace(/\.[^/.]+$/, "");

    return {
      id: fileName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      title: fileName.replace(/[-_]/g, " "),
      poster,
    };
  });

function CrimeThriller() {
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
      <h2 className="mb-3 ml-2 px-4 text-xl font-bold text-white sm:px-6 sm:text-2xl">Crime & Thriller</h2>
      <div className="group relative w-full">
        <button type="button" onClick={() => scrollByPage(-1)} aria-label="Previous crime and thriller" className="absolute left-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/75 text-white opacity-0 shadow-lg transition-opacity hover:bg-black/95 group-hover:opacity-100 sm:left-6"><FiChevronLeft size={20} /></button>
        <div ref={rowRef} onScroll={handleScroll} className="no-scrollbar flex w-full gap-4 overflow-x-auto scroll-smooth px-4 py-4 sm:px-6">
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
        <button type="button" onClick={() => scrollByPage(1)} aria-label="Next crime and thriller" className="absolute right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/75 text-white opacity-0 shadow-lg transition-opacity hover:bg-black/95 group-hover:opacity-100 sm:right-6"><FiChevronRight size={20} /></button>
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

export default CrimeThriller;
