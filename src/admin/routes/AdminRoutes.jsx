import { Route, Routes } from "react-router-dom";

import AdminDashboard from "../pages/AdminDashboard";
import AdminAuth from "../pages/AdminAuth";
import AdminProfile from "../pages/AdminProfile";
import AdminSettings from "../pages/AdminSettings";
import "../styles/admin.css";

// Keeps Admin page definitions separate; administrator authorization is not implemented.
function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<AdminAuth />} />
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="profile" element={<AdminProfile />} />
      <Route path="settings" element={<AdminSettings />} />
    </Routes>
  );
}

export default AdminRoutes;
