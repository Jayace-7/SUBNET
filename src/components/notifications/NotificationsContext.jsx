/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useRef, useState } from "react";
import {
  FiBell,
  FiCheckCircle,
  FiMessageCircle,
  FiPlayCircle,
} from "react-icons/fi";

const NotificationsContext = createContext(null);

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    icon: FiPlayCircle,
    title: "New episode available",
    message: "A new episode is ready to watch.",
    timestamp: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    icon: FiMessageCircle,
    title: "Welcome to SUBNET",
    message: "Your next favorite story is waiting.",
    timestamp: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    icon: FiCheckCircle,
    title: "Your list is ready",
    message: "Titles you save will appear in My List.",
    timestamp: "Yesterday",
    unread: false,
  },
];

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const nextReminderId = useRef(0);

  const toggleMovieReminder = (movieId, movieTitle) => {
    const notificationId = `reminder-${++nextReminderId.current}`;
    const reminder = {
      id: notificationId,
      movieId: String(movieId),
      icon: FiBell,
      title: "Reminder set",
      message: `Reminder for this ${movieTitle} is set.`,
      timestamp: "Just now",
      unread: true,
    };

    setNotifications((current) => {
      const existingReminder = current.find(
        (notification) => notification.movieId === String(movieId),
      );

      if (existingReminder?.unread) {
        return current.filter((notification) => notification.id !== existingReminder.id);
      }

      return [
        reminder,
        ...current.filter((notification) => notification.movieId !== String(movieId)),
      ];
    });
  };

  const markNotificationAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id ? { ...notification, unread: false } : notification,
      ),
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, unread: false })),
    );
  };

  const value = useMemo(
    () => ({
      notifications,
      toggleMovieReminder,
      markNotificationAsRead,
      markAllNotificationsAsRead,
    }),
    [notifications],
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error("useNotifications must be used inside NotificationsProvider.");
  }

  return context;
}
