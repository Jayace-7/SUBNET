import MovieRow from "./MovieRow";

import theWitcher from "../../assets/action series/The Witcher.webp";
import gameOfThrones from "../../assets/action series/Game of thrones.webp";
import vampireDiaries from "../../assets/action series/Vampire Diaries.webp";
import narcos from "../../assets/tvshows/exciting tv shows/Narcos.webp";
import moneyHeist from "../../assets/tvshows/exciting tv shows/money heist.webp";
import vikings from "../../assets/tvshows/exciting tv shows/vikings.webp";
import gentlemen from "../../assets/tvshows/tv comedies/The Gentlemen.webp";
import friends from "../../assets/tvshows/tv comedies/friends.webp";
import modernFamily from "../../assets/sitcom/modern family.webp";
import suits from "../../assets/drama and romance/Suits.webp";
import blacklist from "../../assets/drama and romance/blacklist.webp";
import topBoy from "../../assets/drama and romance/top boy.webp";
import batman from "../../assets/trending/The Batman.webp";
import oppenheimer from "../../assets/trending/Oppenheimer.webp";
import dune from "../../assets/trending/Dune Part Two.webp";
import deadpool from "../../assets/trending/Deadpool & Wolverine.webp";
import onePunchMan from "../../assets/anime/One Punch man.webp";
import attackOnTitan from "../../assets/anime/Attack on titan.webp";
import rickAndMorty from "../../assets/animated shows/rick and morty.webp";
import invincible from "../../assets/animated shows/invincible.webp";
import moana from "../../assets/kids shows/Moana.webp";
import kungFuPanda from "../../assets/kids shows/Kung Fu Panda.webp";
import equalizer from "../../assets/action/The Equalizer 3.webp";
import johnWick from "../../assets/action/John Wick  Chapter 4.webp";
import missionImpossible from "../../assets/action/Mission Impossible  Dead Reckoning.webp";
import towerHeist from "../../assets/comedy/tower heist.webp";
import rushHour from "../../assets/comedy/rush hour.webp";
import barbershop from "../../assets/comedy/Barbershop.webp";
import familyGuy from "../../assets/animated shows/Family guy.webp";
import futurama from "../../assets/animated shows/Futurama.webp";
import dragonBall from "../../assets/anime/Dragonball.webp";
import demonSlayer from "../../assets/anime/Demon Slayer.webp";
import naruto from "../../assets/anime/Naruto.webp";
import onePiece from "../../assets/anime/One Piece.webp";
import avatar from "../../assets/trending/Avatar The Last Airbender.webp";
import captainAmerica from "../../assets/trending/Captain America Brave New World.webp";
import johnnyEnglish from "../../assets/comedy/The hustle.webp";

const COLLECTIONS = [
  {
    title: "Epic Worlds & Fantasy Sagas",
    label: "Big adventures, legendary worlds",
    posters: [theWitcher, gameOfThrones, vampireDiaries, dune, vikings, theWitcher, gameOfThrones, vampireDiaries],
  },
  {
    title: "Crime Bosses & Masterminds",
    label: "Schemes, heists, and high stakes",
    posters: [narcos, moneyHeist, gentlemen, blacklist, batman, equalizer, johnWick, missionImpossible],
  },
  {
    title: "Bingeable Laughs",
    label: "Comedy series for your next marathon",
    posters: [friends, modernFamily, gentlemen, rickAndMorty, towerHeist, rushHour, barbershop, familyGuy],
  },
  {
    title: "Power, Politics & Prestige",
    label: "Ambition changes everything",
    posters: [gameOfThrones, suits, oppenheimer, blacklist, topBoy, narcos, moneyHeist, vikings],
  },
  {
    title: "Animated Worlds Beyond",
    label: "Animation for every kind of fan",
    posters: [onePunchMan, attackOnTitan, rickAndMorty, invincible, familyGuy, futurama, dragonBall, demonSlayer],
  },
];

function TVCollection({ title, posters }) {
  const shows = posters.map((poster, index) => {
    const titleFromFile = poster.split("/").pop().replace(/\.[^/.]+$/, "");
    return {
      id: `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index}`,
      title: titleFromFile.replace(/[-_]/g, " "),
      poster,
      type: "Series",
    };
  });

  return (
    <MovieRow
      title={title}
      movies={shows}
      className="mt-5 w-full py-5"
      ariaLabel={title}
    />
  );
}

export function TVCollections({ start = 0, end = COLLECTIONS.length }) {
  return COLLECTIONS.slice(start, end).map((collection) => <TVCollection key={collection.title} {...collection} />);
}

export function FamilySpotlight() {
  return (
    <TVCollection
      title="Family Watchlist"
      label="Fun picks for everyone"
      posters={[moana, kungFuPanda, modernFamily, friends, avatar, captainAmerica, onePunchMan, futurama]}
    />
  );
}

export function AdventureSpotlight() {
  return (
    <TVCollection
      title="Edge of Your Seat Adventures"
      label="Action packed from episode one"
      posters={[vikings, topBoy, deadpool, narcos, invincible, johnnyEnglish, onePiece, naruto]}
    />
  );
}
