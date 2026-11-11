// Provides a small, Admin-scoped button primitive for future Admin forms.
function AdminButton({
  children,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      className={`admin-button ${className}`.trim()}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default AdminButton;
