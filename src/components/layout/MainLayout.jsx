import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

function MainLayout({ children }) {
  const { pathname } = useLocation();
  const isPublicLanding = pathname === "/";
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <>
      {!isPublicLanding && !isAdminRoute && <Navbar />}

      {isAdminRoute ? children : <main>{children}</main>}

      {!isPublicLanding && !isAdminRoute && <Footer />}
    </>
  );
}

export default MainLayout;