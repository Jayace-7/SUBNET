import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiSearch, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const posterFiles = import.meta.glob("../../assets/**/*.webp", {
  eager: true,
  import: "default",
});

const DETAILS = {
  "Dune Part Two": { year: "2024", genres: ["Adventure", "Drama"] },
  Oppenheimer: { year: "2023", genres: ["Drama", "Thriller"] },
  "Deadpool & Wolverine": { year: "2024", genres: ["Action", "Comedy"] },
  "Spider-Man": { year: "2023", genres: ["Action", "Adventure"] },
  "Avatar The Last Airbender": {
    year: "2024",
    genres: ["Adventure", "Drama"],
  },
  "The Batman": { year: "2022", genres: ["Action", "Thriller"] },
  "Avatar Fire And Ash": { year: "2025", genres: ["Action", "Adventure"] },
  "Captain America Brave New World": {
    year: "2025",
    genres: ["Action", "Thriller"],
  },
};

const TV_FOLDERS = new Set([
  "action series",
  "animated shows",
  "korean tv",
  "kids shows",
  "series",
  "sitcom",
  "tvshows",
]);

const CATALOG = Object.entries(posterFiles)
  .filter(
    ([path]) => !/(^|\/)(trending|hero|logo|icons|videos)(\/|$)/i.test(path),
  )
  .map(([path, poster]) => {
    const pathParts = path.split("/");
    const title = pathParts.pop().replace(/\.webp$/i, "");
    const folders = pathParts.slice(3);
    const category = folders[0] || "";
    const type = TV_FOLDERS.has(category.toLowerCase()) ? "TV Show" : "Movie";
    const details = DETAILS[title] || {};
    const categoryFolders = folders.length > 1 ? folders.slice(1) : folders;
    const genres = details.genres || [
      ...new Set(
        categoryFolders.flatMap(normalize).map((word) => word.charAt(0).toUpperCase() + word.slice(1)),
      ),
    ];

    return {
      id: path,
      title,
      type,
      poster,
      year: details.year || "",
      genres,
    };
  });

function normalize(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

// Full titles and genres, like Netflix's "More to explore" row
const EXPLORE_TERMS = [
  ...new Set([
    ...CATALOG.map((item) => item.title),
    ...CATALOG.flatMap((item) => item.genres),
  ]),
];

function ResultCard({ item, onSelect }) {
  const card = (
    <article className="trend-glow search-result-glow group relative aspect-video overflow-hidden rounded-lg bg-[#111414] transition duration-300 hover:z-10">
      {item.poster ? (
        <img
          src={item.poster}
          alt={`${item.title} poster`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
      ) : null}
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/45 to-transparent px-3 pb-3 pt-10">
        <h2 className="truncate text-sm font-semibold text-white sm:text-base">
          {item.title}
        </h2>
        <p className="text-xs text-white/55">
          {item.year ? `${item.year} · ` : ""}
          {item.type}
        </p>
      </div>
    </article>
  );

  const itemId = normalize(item.title).join("-");
  return (
    <Link
      to={`/watch/${encodeURIComponent(itemId)}`}
      onClick={onSelect}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B8A9]"
    >
      {card}
    </Link>
  );
}

function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const triggerRef = useRef(null);
  const searchRef = useRef(null);
  const queryWords = normalize(text);
  const hasQuery = isOpen && queryWords.length > 0;

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!hasQuery) return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
    };
  }, [hasQuery]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (
        searchRef.current?.contains(event.target) ||
        event.target.closest("#subnet-search-results")
      ) {
        return;
      }

      setText("");
      setIsOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setText("");
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const results = hasQuery
    ? CATALOG.filter((item) => {
        const searchableWords = [
          ...normalize(item.title),
          ...item.genres.flatMap(normalize),
        ];
        return queryWords.every((queryWord) =>
          searchableWords.some((word) => word.startsWith(queryWord)),
        );
      })
    : [];

  const exploreTerms = hasQuery
    ? EXPLORE_TERMS.filter((term) =>
        queryWords.some((queryWord) =>
          normalize(term).some((word) => word.startsWith(queryWord)),
        ),
      )
    : [];

  const closeSearch = () => {
    setText("");
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const resultsPage = hasQuery
    ? createPortal(
        <div
          id="subnet-search-results"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeSearch();
          }}
          className="fixed inset-0 z-40 overflow-y-auto bg-[#070909] pt-23 text-white [scrollbar-color:#6b7280_#111414] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#111414] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#6b7280]"
        >
          <main className="mx-auto max-w-367.5 px-4 pb-16 sm:px-6 lg:px-8">
            {exploreTerms.length > 0 && (
              <section
                className="mb-7 flex flex-wrap items-center gap-y-2 text-sm"
                aria-label="More to explore"
              >
                <span className="mr-2 text-white/55">More to explore:</span>
                {exploreTerms.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setText(term);
                      inputRef.current?.focus();
                    }}
                    className="border-r border-white/20 px-3 text-white/70 transition-colors last:border-r-0 hover:text-[#00D4C7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B8A9]"
                  >
                    {term}
                  </button>
                ))}
              </section>
            )}

            {results.length > 0 ? (
              <section
                aria-label="Search results"
                aria-live="polite"
                className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              >
                {results.map((item) => (
                  <ResultCard
                    key={item.id}
                    item={item}
                    onSelect={closeSearch}
                  />
                ))}
              </section>
            ) : (
              <p className="py-12 text-white/55" aria-live="polite">
                No results for &quot;{text}&quot;.
              </p>
            )}
          </main>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <div
        ref={searchRef}
        className="relative z-60 flex h-11 w-11 items-center justify-end"
      >
        <button
          ref={triggerRef}
          type="button"
          aria-label="Open search"
          aria-expanded={isOpen}
          tabIndex={isOpen ? -1 : 0}
          onClick={() => setIsOpen(true)}
          className={`absolute right-0 grid h-11 w-11 place-items-center rounded-full text-white transition-opacity duration-200 hover:text-[#00D4C7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B8A9] ${
            isOpen ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <FiSearch aria-hidden="true" size={21} />
        </button>

        <form
          role="search"
          aria-label="Search SUBNET"
          onSubmit={(event) => event.preventDefault()}
          className={`absolute right-0 flex h-11 items-center overflow-hidden rounded-full border transition-[width,border-color,background-color] duration-400 ease-in-out ${
            isOpen
              ? "w-[min(24rem,calc(100vw-8rem))] border-white/30 bg-black focus-within:border-[#00D4C7]"
              : "pointer-events-none w-11 border-transparent bg-transparent"
          }`}
        >
          <FiSearch
            aria-hidden="true"
            className={`ml-3 h-5 w-5 shrink-0 text-white transition-opacity duration-200 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          />
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            aria-label="Search titles, people, and genres"
            aria-controls="subnet-search-results"
            placeholder="Titles, people, genres"
            autoComplete="off"
            tabIndex={isOpen ? 0 : -1}
            className={`h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/40 transition-opacity duration-200 ${
              isOpen ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          />
          <button
            type="button"
            aria-label="Close search"
            tabIndex={isOpen ? 0 : -1}
            onClick={closeSearch}
            className={`mr-2 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/20 text-white transition-colors duration-200 hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B8A9] ${
              isOpen ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <FiX aria-hidden="true" size={14} />
          </button>
        </form>
      </div>
      {resultsPage}
    </>
  );
}

export default Search;