import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Movies from "../pages/Movies/Movies";
import Tvshows from "../pages/Tvshows/Tvshows";
import Search from "../pages/Search/Search";
import Mylist from "../pages/Mylist/Mylist";
import Watch from "../pages/Watch/Watch";
import Profile from "../pages/Profile/Profile";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NotFound from "../pages/NotFound/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tv-shows" element={<Tvshows />} />
      <Route path="/search" element={<Search />} />
      <Route path="/my-list" element={<Mylist />} />
      <Route path="/watch/:id" element={<Watch />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;