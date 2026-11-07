import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Movies from "../pages/Movies/Movies";
import Tvshows from "../pages/Tvshows/Tvshows";
import Search from "../pages/Search/Search";
import Mylist from "../pages/Mylist/Mylist";
import Watch from "../pages/Watch/Watch";
import Profile from "../pages/Profile/Profile";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import NotFound from "../pages/NotFound/NotFound";
import Settings from "../pages/Settings/Settings";
import BillingLayout from "../pages/Settings/Billing/BillingLayout";
import Billing from "../pages/Settings/Billing/Billing";
import Plans from "../pages/Settings/Billing/Plans";
import PaymentMethods from "../pages/Settings/Billing/PaymentMethods";
import PaymentHistory from "../pages/Settings/Billing/PaymentHistory";
import BillingManagement from "../pages/Settings/Billing/BillingManagement";
import Landing from "../pages/Landing/Landing";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tv-shows" element={<Tvshows />} />
      <Route path="/search" element={<Search />} />
      <Route path="/my-list" element={<Mylist />} />
      <Route path="/watch/:id" element={<Watch />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/settings/billing" element={<BillingLayout />}>
        <Route index element={<Billing />} />
        <Route path="plans" element={<Plans />} />
        <Route path="payment-methods" element={<PaymentMethods />} />
        <Route path="payment-history" element={<PaymentHistory />} />
        <Route path="management" element={<BillingManagement />} />
      </Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;