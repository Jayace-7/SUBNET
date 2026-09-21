import MovieRow from "./MovieRow";

const movieFiles = import.meta.glob("../../assets/popularmovies/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const POPULAR_GENRES = {
  doomsday: ["Action", "Sci-Fi"],
  "f1 movie": ["Sport", "Drama"],
  f4: ["Action", "Thriller"],
  micheal: ["Drama", "Biography"],
  mm: ["Drama", "Romance"],
  odessy: ["Adventure", "Drama"],
  rrt: ["Action", "Comedy"],
  sbnd: ["Action", "Thriller"],
};

const MOVIES = Object.entries(movieFiles)
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
  .map(([path, poster]) => {
    const fileName = path.split("/").pop().replace(/\.[^/.]+$/, "");

    return {
      id: fileName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      title: fileName.replace(/[-_]/g, " "),
      poster,
      genres: POPULAR_GENRES[fileName.toLowerCase()] ?? [],
      badge: /doomsday/i.test(fileName) ? "COMING SOON" : undefined,
    };
  });

function PopularMovies() {
  return <MovieRow title="Popular Movies" movies={MOVIES} className="mt-2 w-full py-9" ariaLabel="popular movies" />;
}

export default PopularMovies;
