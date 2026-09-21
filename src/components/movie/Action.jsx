import MovieRow from "./MovieRow";

import avengersEndgamePoster from "../../assets/action/Avengers Endgame.jpg";
import johnWickPoster from "../../assets/action/John Wick  Chapter 4.jpg";
import madMaxPoster from "../../assets/action/Mad Max Fury Road.jpg";
import missionImpossiblePoster from "../../assets/action/Mission Impossible  Dead Reckoning.jpg";
import equalizerPoster from "../../assets/action/The Equalizer 3.jpg";
import topGunPoster from "../../assets/action/Top Gun Maverick.jpg";
import shazamPoster from "../../assets/action/shazam.jpg";
import transformersPoster from "../../assets/action/Transformers the last knight.jpg";

const MOVIES = [
  { id: "avengers-endgame", title: "Avengers: Endgame", poster: avengersEndgamePoster },
  { id: "john-wick-chapter-4", title: "John Wick: Chapter 4", poster: johnWickPoster },
  { id: "mad-max-fury-road", title: "Mad Max: Fury Road", poster: madMaxPoster },
  { id: "mission-impossible-dead-reckoning", title: "Mission: Impossible - Dead Reckoning", poster: missionImpossiblePoster },
  { id: "the-equalizer-3", title: "The Equalizer 3", poster: equalizerPoster },
  { id: "top-gun-maverick", title: "Top Gun: Maverick", poster: topGunPoster },
  { id: "shazam", title: "Shazam!", poster: shazamPoster },
  { id: "transformers-the-last-knight", title: "Transformers: The Last Knight", poster: transformersPoster },
];

function Action() {
  return <MovieRow title="Action" movies={MOVIES} ariaLabel="Action movies" />;
}

export default Action;
