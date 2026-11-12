import { useState } from "react";

import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { MOCK_NOTIFICATIONS } from "../../data/mockAnalytics";

// Provides the private-console page frame for Admin dashboard pages.
function AdminLayout({ children, title = "Dashboard", contentClassName = "" }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const unreadCount = notifications.filter((notification) => notification.unread).length;

  function markNotificationRead(notificationId) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === notificationId ? { ...notification, unread: false } : notification,
      ),
    );
  }

  function markAllNotificationsRead() {
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, unread: false })),
    );
  }

  return (
    <div className="admin-module admin-shell">
      <AdminSidebar
        isOpen={isSidebarOpen}
        onNavigate={() => setIsSidebarOpen(false)}
        unreadCount={unreadCount}
      />
      <div className="admin-workspace">
        <AdminHeader
          isSidebarOpen={isSidebarOpen}
          notifications={notifications}
          onMarkAllNotificationsRead={markAllNotificationsRead}
          onMarkNotificationRead={markNotificationRead}
          onMenuToggle={() => setIsSidebarOpen((open) => !open)}
          title={title}
        />
        <main className={`admin-content ${contentClassName}`.trim()}>{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
