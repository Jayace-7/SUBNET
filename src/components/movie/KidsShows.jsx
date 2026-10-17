import MovieRow from "./MovieRow";

import despicableMePoster from "../../assets/kids shows/Despicable Me.webp";
import toyStoryPoster from "../../assets/kids shows/Toy Story.webp";
import lionKingPoster from "../../assets/kids shows/The Lion King.webp";
import moanaPoster from "../../assets/kids shows/Moana.webp";
import kungFuPandaPoster from "../../assets/kids shows/Kung Fu Panda.webp";
import dragonPoster from "../../assets/kids shows/How to Train Your Dragon.webp";
import frozenPoster from "../../assets/kids shows/frozen 2.webp";
import zootopiaPoster from "../../assets/kids shows/zootopia.webp";

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
  return <MovieRow title="Kids' Shows" movies={MOVIES} ariaLabel="kids' shows" />;
}

export default KidsShows;
