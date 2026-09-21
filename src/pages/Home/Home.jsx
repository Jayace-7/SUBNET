import HeroBanner from "../../components/hero/HeroBanner";
import TrendingNow from "../../components/movie/TrendingNow";
import Action from "../../components/movie/Action";
import TopMoviesWeek from "../../components/movie/TopMoviesWeek";
import Series from "../../components/movie/Series";
import CrimeThriller from "../../components/movie/Crime & Thriller";
import DramaRomance from "../../components/movie/Drama & Romance";
import ActionSeries from "../../components/movie/Action Series";
import Sitcom from "../../components/movie/sitcom";
import Comedy from "../../components/movie/comedy";
import KoreanTV from "../../components/movie/koreantv";
import Bollywood from "../../components/movie/bollywood";
import Horror from "../../components/movie/Horror";
import AnimatedShows from "../../components/movie/Animated shows";
import Anime from "../../components/movie/Anime";
import KidsShows from "../../components/movie/KidsShows";
import Nollywood from "../../components/movie/Nollywood";
import PopularMovies from "../../components/movie/PopularMovies";

function Home() {
  return (
    <div>
      <HeroBanner />
      <TrendingNow />
      <PopularMovies />
      <Action />
      <TopMoviesWeek />
      <Series />
      <CrimeThriller />
      <DramaRomance />
      <ActionSeries />
      <Sitcom />
      <Comedy />
      <KoreanTV />
      <Bollywood />
      <Horror />
      <AnimatedShows />
      <Anime />
      <KidsShows />
      <Nollywood />
    </div>
  );
}

export default Home;
