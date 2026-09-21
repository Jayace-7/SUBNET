import MovieRow from "./MovieRow";

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
  return <MovieRow title="Crime & Thriller" movies={MOVIES} ariaLabel="crime and thriller movies" />;
}

export default CrimeThriller;
