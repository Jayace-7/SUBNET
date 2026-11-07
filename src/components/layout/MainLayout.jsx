import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

function MainLayout({ children }) {
  const { pathname } = useLocation();
  const isPublicLanding = pathname === "/";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <>
      {!isPublicLanding && <Navbar />}

      <main>
        {children}
      </main>

      {!isPublicLanding && <Footer />}
    </>
  );
}

export default MainLayout;