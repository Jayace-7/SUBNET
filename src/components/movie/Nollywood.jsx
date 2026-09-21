import MovieRow from "./MovieRow";

import anikulapoPoster from "../../assets/nollywood movies/Anikulapo.jpg";
import atikoPoster from "../../assets/nollywood movies/Atiko.jpg";
import kingOfBoysPoster from "../../assets/nollywood movies/King of Boys.jpg";
import manPikinPoster from "../../assets/nollywood movies/Man Pikin.jpg";
import blackBookPoster from "../../assets/nollywood movies/The Black Book.jpg";
import partyPoster from "../../assets/nollywood movies/The Party.jpg";
import loveInEveryWordPoster from "../../assets/nollywood movies/Love in every word.jpg";
import loveSpicePoster from "../../assets/nollywood movies/Love spice.jpg";

const MOVIES = [
  { id: "anikulapo", title: "Anikulapo", poster: anikulapoPoster },
  { id: "atiko", title: "Atiko", poster: atikoPoster },
  { id: "king-of-boys", title: "King of Boys", poster: kingOfBoysPoster },
  { id: "man-pikin", title: "Man Pikin", poster: manPikinPoster },
  { id: "the-black-book", title: "The Black Book", poster: blackBookPoster },
  { id: "the-party", title: "The Party", poster: partyPoster },
  { id: "love-in-every-word", title: "Love in Every Word", poster: loveInEveryWordPoster },
  { id: "love-spice", title: "Love Spice", poster: loveSpicePoster },
];

function Nollywood() {
  return <MovieRow title="Nollywood" movies={MOVIES} ariaLabel="Nollywood movies" />;
}

export default Nollywood;
