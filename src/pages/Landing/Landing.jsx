import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import Logo from "../../components/common/Logo";
import "./Landing.css";
import landingBackground from "../../assets/landing page/Landing page.jpg";

function Landing() {
  return (
    <section className="public-landing" aria-label="Welcome to SUBNET">
      <img className="landing-background" src={landingBackground} alt="" aria-hidden="true" />
      <div className="landing-cinematic-shade" aria-hidden="true" />

      <header className="landing-header">
        <Link to="/" aria-label="SUBNET landing page" className="landing-brand">
          <Logo height={300} />
        </Link>
        <nav className="landing-auth" aria-label="Account">
          <Link className="landing-button landing-button--outline landing-button--header" to="/signin">
            Sign In
          </Link>
          <Link className="landing-button landing-button--solid landing-button--header" to="/signup">
            Sign Up
          </Link>
        </nav>
      </header>

      <div className="landing-content">
        <p className="landing-welcome">Welcome to</p>
        <div className="landing-wordmark">
          <img
            className="landing-wordmark__icon"
            src="/favicon.png"
            alt=""
            aria-hidden="true"
          />
          <h1>SUBNET</h1>
        </div>
        <p className="landing-tagline">
          <span>Stream.</span>{" "}
          <span className="landing-tagline__accent">Enjoy. Anytime. Anywhere.</span>
        </p>
        <p className="landing-description">
          Discover a world of movies, TV shows and original content with premium
          quality and endless entertainment.
        </p>
        <div className="landing-actions">
          <Link className="landing-button landing-button--solid landing-button--primary" to="/signup">
            Sign Up for Free <FiArrowRight aria-hidden="true" />
          </Link>
          <Link className="landing-button landing-button--outline landing-button--primary" to="/signin">
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Landing;
