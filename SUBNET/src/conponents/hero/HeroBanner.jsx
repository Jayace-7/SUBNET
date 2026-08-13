import heroImage from "../../assets/hero/dune-part-two-hero.jpg";
import heroTrailer from "../../assets/hero/dune-part-two-preview.mp4";


function HeroBanner() {
  return (
      <section className="hero-banner">
        <img src={heroImage} alt="Dune Part Two" className="hero-image" />
        <div className="hero-trailer">
          <video src={heroTrailer} controls muted loop />
        </div>
      </section>
  );
}

export default HeroBanner;