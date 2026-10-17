import { useState } from "react";
import MovieRow from "./MovieRow";

const tvFiles = import.meta.glob("../../assets/{action series,tvshows}/**/*.webp", {
  eager: true,
  import: "default",
});

const TV_POSTERS = Object.entries(tvFiles)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, poster]) => {
    const fileName = path.split("/").pop().replace(/\.[^/.]+$/, "");
    return {
      id: fileName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      title: fileName.replace(/[-_]/g, " "),
      poster,
      type: "Series",
    };
  });

function getWeeklyTVShows() {
  return [...TV_POSTERS].sort(() => Math.random() - 0.5).slice(0, 10);
}

function TopTVShowsWeek() {
  const [shows] = useState(getWeeklyTVShows);

  return (
    <MovieRow
      title="Top 10 TV Shows This Week"
      eyebrow="Weekly spotlight"
      movies={shows}
      compact
      ranked
      className="mx-auto my-8 w-full max-w-7xl px-4 sm:px-6 lg:my-12 lg:px-10"
      ariaLabel="top TV shows"
    />
  );
}

export default TopTVShowsWeek;
