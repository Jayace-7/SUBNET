import AdminLayout from "../components/layout/AdminLayout";

function AdminSettings() {
  return (
    <AdminLayout title="Settings">
      <section className="admin-card admin-settings" id="subscriptions" aria-labelledby="admin-settings-title">
        <p className="admin-eyebrow">ADMINISTRATION</p>
        <h2 id="admin-settings-title">Admin settings</h2>
        <p>
          Settings controls are not connected yet. This page is a placeholder for the future
          administrator settings experience.
        </p>
      </section>
    </AdminLayout>
  );
}

export default AdminSettings;
