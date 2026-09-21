// src/components/movie/TrendingNow.jsx
//
// Home page "Trending Now" row. Owns the movie data and the hover state
// that drives the Netflix-style expand + neighbor-push effect; MoviesComp
// stays a dumb presentational card.

import MovieRow from "./MovieRow";

// NOTE: these filenames contain spaces/an "&" — they must match the
// actual files in src/assets/trending/ exactly (case + spacing).
import avatarPoster from "../../assets/trending/Avatar The Last Airbender.jpg";
import deadpoolPoster from "../../assets/trending/Deadpool & Wolverine.jpg";
import dunePoster from "../../assets/trending/Dune Part Two.png";
import oppenheimerPoster from "../../assets/trending/Oppenheimer.png";
import spidermanPoster from "../../assets/trending/Spider-Man.jpg";
import batmanPoster from "../../assets/trending/The Batman.jpg";
import avatarFireAndAshPoster from "../../assets/trending/Avatar Fire And Ash.jpg";
import captainAmericaPoster from "../../assets/trending/Captain America Brave New World.jpg";

// Placeholder metadata until real movie data exists — swap this for an
// API/DB response later without touching the layout below.
const MOVIES = [
  {
    id: "dune-2",
    title: "Dune: Part Two",
    poster: dunePoster,
    year: "2024",
    rating: "16+",
    duration: "2h 46m",
    quality: "HD",
    genres: ["Action", "Adventure", "Sci-Fi"],
    rank: 1,
  },
  {
    id: "oppenheimer",
    title: "Oppenheimer",
    poster: oppenheimerPoster,
    year: "2023",
    rating: "16+",
    duration: "3h 0m",
    quality: "HD",
    genres: ["Drama", "History"],
    rank: 2,
  },
  {
    id: "deadpool-wolverine",
    title: "Deadpool & Wolverine",
    poster: deadpoolPoster,
    year: "2024",
    rating: "18+",
    duration: "2h 8m",
    quality: "HD",
    genres: ["Action", "Comedy"],
    rank: 3,
    badge: "New",
  },
  {
    id: "spiderman",
    title: "Spider-Man",
    poster: spidermanPoster,
    year: "2023",
    rating: "PG",
    duration: "1h 57m",
    quality: "HD",
    genres: ["Action", "Animation"],
  },
  {
    id: "avatar-tla",
    title: "Avatar: The Last Airbender",
    poster: avatarPoster,
    year: "2024",
    rating: "PG",
    type: "Series",
    quality: "HD",
    genres: ["Adventure", "Fantasy"],
    badge: "Recently Added",
  },
  {
    id: "the-batman",
    title: "The Batman",
    poster: batmanPoster,
    year: "2022",
    rating: "16+",
    duration: "2h 56m",
    quality: "HD",
    genres: ["Action", "Crime"],
  },
  {
    id: "avatar-fire-and-ash",
    title: "Avatar: Fire and Ash",
    poster: avatarFireAndAshPoster,
  },
  {
    id: "captain-america-brave-new-world",
    title: "Captain America: Brave New World",
    poster: captainAmericaPoster,
  },
];

function TrendingNow() {
  return <MovieRow title="Trending Now" movies={MOVIES} className="mt-2 w-full py-9" ariaLabel="Trending" />;
}

export default TrendingNow;
