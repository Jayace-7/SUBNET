import { useState } from "react";
import MovieRow from "./MovieRow";

const movieFiles = import.meta.glob("../../assets/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const getGenresFromPath = (path) => {
  const category = path.split("/").at(-2);
  if (!category) return [];

  return category
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
};

const MOVIE_POSTERS = Object.entries(movieFiles)
  .filter(([path]) => !/(\/hero\/|\/logo\/|\/icons\/|\/videos\/)/i.test(path))
  .map(([path, poster]) => {
    const fileName = path.split("/").pop().replace(/\.[^/.]+$/, "");

    return {
      id: fileName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      title: fileName.replace(/[-_]/g, " "),
      poster,
      genres: getGenresFromPath(path),
    };
  });

function getRandomTopMovies() {
  return [...MOVIE_POSTERS]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);
}

function TopMoviesWeek() {
  const [movies] = useState(getRandomTopMovies);

  return (
    <MovieRow
      title="Top 10 Movies This Week"
      eyebrow="Weekly spotlight"
      movies={movies}
      compact
      ranked
      className="mx-auto my-8 w-full max-w-7xl px-4 sm:px-6 lg:my-12 lg:px-10"
      ariaLabel="top movies"
    />
  );
}

export default TopMoviesWeek;