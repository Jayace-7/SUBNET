/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import formatPosterTitle from "../movie/formatPosterTitle";

const MyListContext = createContext(null);
const STORAGE_KEY = "subnet-my-list-v1";

// Keep persisted and player-provided numeric values safe for progress math.
function toSafeNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function slugify(value) {
  if (!value) return `title-${Math.random().toString(36).slice(2, 10)}`;
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || `title-${Math.random().toString(36).slice(2, 10)}`;
}

function normalizeSavedItem(item = {}) {
  const uniqueId = item.id ?? item.slug ?? slugify(item.title ?? item.name ?? item.poster ?? item.url ?? "saved-item");

  // Use one predictable shape so older or incomplete saved records remain renderable.
  return {
    id: uniqueId,
    title: formatPosterTitle(item.title ?? item.name ?? "Untitled title"),
    type: item.type ?? "movie",
    poster: item.poster ?? "",
    year: item.year ?? item.releaseYear ?? null,
    status: item.status ?? "watch-later",
    addedAt: item.addedAt ?? new Date().toISOString(),
    playbackPosition: toSafeNumber(item.playbackPosition, 0),
    duration: toSafeNumber(item.duration, 0),
    lastWatchedAt: item.lastWatchedAt ?? null,
  };
}

function readStoredItems() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return [];
    }

    // Normalize and deduplicate stored records so older data cannot show titles twice.
    const itemsById = new Map();
    parsed.forEach((item) => {
      const normalizedItem = normalizeSavedItem(item);
      if (!itemsById.has(normalizedItem.id)) {
        itemsById.set(normalizedItem.id, normalizedItem);
      }
    });

    return Array.from(itemsById.values());
  } catch (error) {
    console.warn("Unable to read saved items from localStorage", error);
    return [];
  }
}

export function MyListProvider({ children }) {
  const [savedItems, setSavedItems] = useState(readStoredItems);

  // Persist the canonical collection whenever a saved title or its progress changes.
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedItems));
  }, [savedItems]);

  const toggleSavedItem = (item) => {
    const normalizedItem = normalizeSavedItem(item);

    // The catalogue ID is the deduplication key: toggling an existing title removes it.
    setSavedItems((currentItems) => {
      const exists = currentItems.some((entry) => entry.id === normalizedItem.id);

      if (exists) {
        return currentItems.filter((entry) => entry.id !== normalizedItem.id);
      }

      return [normalizedItem, ...currentItems];
    });
  };

  const removeSavedItem = (id) => {
    setSavedItems((currentItems) => currentItems.filter((entry) => entry.id !== id));
  };

  const updateSavedItem = (id, updater) => {
    setSavedItems((currentItems) =>
      currentItems.map((entry) => {
        if (entry.id !== id) {
          return entry;
        }

        return { ...entry, ...updater(entry) };
      })
    );
  };

  const recordPlaybackProgress = (id, { position, duration, completed = false }) => {
    if (!id) {
      return;
    }

    const safePosition = toSafeNumber(position, 0);
    const safeDuration = toSafeNumber(duration, 0);

    setSavedItems((currentItems) =>
      currentItems.map((entry) => {
        if (entry.id !== id) {
          return entry;
        }

        const hasMeaningfulProgress = safePosition > 0 || safeDuration > 0;
        // Treat explicit completion or reaching 90% as finished rather than resumable.
        const watchedEnough = completed || (safeDuration > 0 && safePosition >= safeDuration * 0.9 && safePosition > 0);

        if (watchedEnough) {
          return {
            ...entry,
            status: "watch-later",
            playbackPosition: 0,
            duration: safeDuration,
            lastWatchedAt: new Date().toISOString(),
          };
        }

        return {
          ...entry,
          status: hasMeaningfulProgress ? "continue-watching" : entry.status,
          playbackPosition: safePosition,
          duration: safeDuration,
          lastWatchedAt: new Date().toISOString(),
        };
      })
    );
  };

  const hasSavedItem = (id) => savedItems.some((entry) => entry.id === id);

  const getSavedItem = (id) => savedItems.find((entry) => entry.id === id) ?? null;

  const continueWatching = useMemo(
    () =>
      savedItems.filter(
        (item) =>
          // A saved title only belongs here when it has unfinished playback progress.
          item.status === "continue-watching" &&
          item.playbackPosition > 0 &&
          item.playbackPosition < (item.duration || Number.POSITIVE_INFINITY)
      ),
    [savedItems]
  );

  const watchLater = useMemo(
    // Watch Later stays distinct from playback status; adding a title does not imply it was played.
    () => savedItems.filter((item) => item.status === "watch-later"),
    [savedItems]
  );

  const value = {
    savedItems,
    continueWatching,
    watchLater,
    toggleSavedItem,
    removeSavedItem,
    updateSavedItem,
    recordPlaybackProgress,
    hasSavedItem,
    getSavedItem,
  };

  return <MyListContext.Provider value={value}>{children}</MyListContext.Provider>;
}

export function useMyList() {
  const context = useContext(MyListContext);

  if (!context) {
    // Fail clearly when a component is rendered outside the app-level provider.
    throw new Error("useMyList must be used inside MyListProvider.");
  }

  return context;
}
