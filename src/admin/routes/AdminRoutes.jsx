import { Route, Routes } from "react-router-dom";

import AdminDashboard from "../pages/AdminDashboard";
import AdminAuth from "../pages/AdminAuth";
import "../styles/admin.css";

// Keeps Admin page definitions separate; administrator authorization is not implemented.
function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<AdminAuth />} />
      <Route path="dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default AdminRoutes;
