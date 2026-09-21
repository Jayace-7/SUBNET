import MovieRow from "./MovieRow";

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
  return <MovieRow title="Kids' Shows" movies={MOVIES} ariaLabel="kids' shows" />;
}

export default KidsShows;
