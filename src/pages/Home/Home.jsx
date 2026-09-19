import HeroBanner from "../../components/hero/HeroBanner";
import TrendingNow from "../../components/movie/TrendingNow";
import Action from "../../components/movie/Action";
import KidsShows from "../../components/movie/KidsShows";
import Nollywood from "../../components/movie/Nollywood";

function Home() {
  return (
    <div>
      <HeroBanner />
      <TrendingNow />
      <Action />
      <KidsShows />
      <Nollywood />
    </div>
  );
}

export default Home;
