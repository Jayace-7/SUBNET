import { NavLink } from "react-router-dom";

// Holds navigation for the separate Admin area.
function AdminSidebar() {
  return (
    <aside className="admin-sidebar" aria-label="Admin navigation">
      <p className="admin-sidebar__eyebrow">SUBNET</p>
      <nav>
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `admin-sidebar__link${isActive ? " admin-sidebar__link--active" : ""}`
          }
        >
          Overview
        </NavLink>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
