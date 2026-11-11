import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

// Provides the private-console page frame for Admin dashboard pages.
function AdminLayout({ children }) {
  return (
    <div className="admin-module admin-shell">
      <AdminSidebar />
      <div className="admin-workspace">
        <AdminHeader />
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
