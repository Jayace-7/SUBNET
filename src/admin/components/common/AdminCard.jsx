// Provides a consistent surface for Admin dashboard sections and metrics.
function AdminCard({ children, className = "", title }) {
  return (
    <section className={`admin-card ${className}`.trim()}>
      <h3 className="admin-card__title">{title}</h3>
      <div className="admin-card__body">{children}</div>
    </section>
  );
}

export default AdminCard;
