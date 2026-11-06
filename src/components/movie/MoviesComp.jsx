// src/components/movie/MoviesComp.jsx
//
// Single trending-row card. Receives all movie data as props from
// TrendingNow — this component has no knowledge of the movie list itself,
// only how to render one entry plus its Netflix-style hover-expand state.

import { useEffect, useRef, useState } from "react";
import {
  FiBell,
  FiCheck,
  FiPlay,
  FiPlus,
  FiThumbsUp,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { useNotifications } from "../notifications/NotificationsContext";
import { useMyList } from "../mylist/MyListContext";
import formatPosterTitle from "./formatPosterTitle";

function MoviesComp({
  id,
  title,
  poster,
  year = "2024",
  rating = "16+",
  duration = "2h",
  quality = "HD",
  type = "Movie",
  genres = [],
  badge,
  compact = false,
  isHovered,
  onHoverStart,
  onHoverEnd,
}) {
  const navigate = useNavigate();
  const { toggleSavedItem, hasSavedItem } = useMyList();
  const { notifications, toggleMovieReminder } = useNotifications();
  const audioContextRef = useRef(null);
  const [isLiked, setIsLiked] = useState(false);
  const [bellAnimationKey, setBellAnimationKey] = useState(0);
  const [likeAnimationKey, setLikeAnimationKey] = useState(0);
  const displayTitle = formatPosterTitle(title);
  const isSaved = hasSavedItem(id ?? title);
  const reminder = notifications.find(
    (notification) => notification.movieId === String(id ?? title),
  );
  const isReminderSet = Boolean(reminder?.unread);

  useEffect(() => () => {
    audioContextRef.current?.close();
  }, []);

  const playButtonSound = (sound) => {
    const AudioContextClass = window.AudioContext;
    if (!AudioContextClass) return;

    const audioContext = audioContextRef.current ?? new AudioContextClass();
    audioContextRef.current = audioContext;
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const volume = audioContext.createGain();
    oscillator.connect(volume);
    volume.connect(audioContext.destination);

    if (sound === "ring") {
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, now);
      volume.gain.setValueAtTime(0.0001, now);
      volume.gain.exponentialRampToValueAtTime(0.16, now + 0.015);
      volume.gain.exponentialRampToValueAtTime(0.0001, now + 0.48);
      oscillator.start(now);
      oscillator.stop(now + 0.5);

      const overtone = audioContext.createOscillator();
      const overtoneVolume = audioContext.createGain();
      overtone.type = "sine";
      overtone.frequency.setValueAtTime(1320, now);
      overtone.connect(overtoneVolume);
      overtoneVolume.connect(audioContext.destination);
      overtoneVolume.gain.setValueAtTime(0.0001, now);
      overtoneVolume.gain.exponentialRampToValueAtTime(0.045, now + 0.015);
      overtoneVolume.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
      overtone.start(now);
      overtone.stop(now + 0.34);
      return;
    }

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(520, now);
    oscillator.frequency.exponentialRampToValueAtTime(180, now + 0.12);
    volume.gain.setValueAtTime(0.0001, now);
    volume.gain.exponentialRampToValueAtTime(0.2, now + 0.008);
    volume.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
    oscillator.start(now);
    oscillator.stop(now + 0.15);
  };

  const handlePlay = (event) => {
    event.stopPropagation();
    const itemId = id ?? title;
    if (itemId) {
      navigate(`/watch/${encodeURIComponent(itemId)}`);
    }
  };

  const handleToggleSaved = (event) => {
    event.stopPropagation();
    const itemId = id ?? title;
    toggleSavedItem({
      id: itemId,
      title: displayTitle,
      poster,
      year,
      type,
      rating,
      duration,
      quality,
      genres,
    });
  };

  const handleReminder = (event) => {
    event.stopPropagation();
    playButtonSound("ring");
    setBellAnimationKey((current) => current + 1);
    toggleMovieReminder(id ?? title, displayTitle);
  };

  const handleLike = (event) => {
    event.stopPropagation();
    playButtonSound("pop");
    if (!isLiked) {
      setLikeAnimationKey((current) => current + 1);
    }
    setIsLiked((current) => !current);
  };

  return (
    <div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onTouchStart={onHoverStart}
      className={`trend-glow relative shrink-0 cursor-pointer overflow-hidden rounded-lg bg-[#151918] ${
        compact ? "w-28 sm:w-28 md:w-28 lg:w-36" : "w-36 sm:w-44"
      } ${
        isHovered ? "trend-glow--active z-10" : "z-0"
      }`}
    >
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-lg bg-[#111414]">
        <img
          src={poster}
          alt={displayTitle}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover transition-transform duration-300 ease-out ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />

        {badge && (
          <span className="absolute bottom-2 left-2 rounded bg-[#00B8A9] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            {badge}
          </span>
        )}

        <div
          className={`absolute inset-x-0 bottom-0 bg-linear-to-t from-[#0b0d0d] via-[#0b0d0d]/95 to-transparent px-3 pb-3 pt-14 transition-all duration-300 ease-out ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <div className="mb-1.5 flex flex-wrap items-center gap-2 text-[11px] text-white">
            {year && <span>{year}</span>}
            {rating && (
              <span className="rounded border border-[#00D4C7]/70 px-1.5 py-0.5 font-semibold leading-none text-white">
                {rating}
              </span>
            )}
            {duration && <span>{duration}</span>}
            {type && <span>{type}</span>}
            {quality && (
              <span className="rounded border border-white/40 px-1.5 py-0.5 font-semibold leading-none text-white">
                {quality}
              </span>
            )}
          </div>

          {genres.length > 0 && (
            <p className="mb-2 text-[11px] font-medium text-white">
              {genres.join(" \u2022 ")}
            </p>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={`Play ${displayTitle}`}
              onClick={handlePlay}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-black transition-colors duration-150 hover:bg-[#00D4C7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4C7]"
            >
              <FiPlay size={14} />
            </button>
            <button
              type="button"
              aria-label={isReminderSet ? `Remove reminder for ${displayTitle}` : `Set reminder for ${displayTitle}`}
              aria-pressed={isReminderSet}
              onClick={handleReminder}
              className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4C7] ${
                isReminderSet
                  ? "border-[#00D4C7] bg-[#00D4C7] text-[#061110]"
                  : "border-white/50 text-white hover:border-[#00D4C7] hover:bg-[#00D4C7]/15 hover:text-[#00D4C7]"
              }`}
            >
              <FiBell
                key={bellAnimationKey}
                size={14}
                className={bellAnimationKey ? "animate-[subnet-bell-shake_450ms_ease-in-out]" : ""}
              />
            </button>
            <button
              type="button"
              aria-pressed={isSaved}
              aria-label={isSaved ? `Remove ${displayTitle} from My List` : `Add ${displayTitle} to My List`}
              onClick={handleToggleSaved}
              className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4C7] ${
                isSaved
                  ? "border-[#00D4C7] bg-[#00D4C7] text-[#071111]"
                  : "border-white/50 text-white hover:border-[#00D4C7] hover:bg-[#00D4C7]/15 hover:text-[#00D4C7]"
              }`}
            >
              {isSaved ? <FiCheck size={14} /> : <FiPlus size={14} />}
            </button>
            <button
              type="button"
              aria-label={isLiked ? `Unlike ${displayTitle}` : `Like ${displayTitle}`}
              aria-pressed={isLiked}
              onClick={handleLike}
              className={`relative flex h-8 w-8 cursor-pointer items-center justify-center overflow-visible rounded-full border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4C7] ${
                isLiked
                  ? "border-[#00D4C7] bg-[#00D4C7] text-[#061110]"
                  : "border-white/50 text-white hover:border-[#00D4C7] hover:bg-[#00D4C7]/15 hover:text-[#00D4C7]"
              }`}
            >
              <FiThumbsUp size={14} />
              {likeAnimationKey > 0 && (
                <span key={likeAnimationKey} aria-hidden="true" className="like-confetti">
                  {Array.from({ length: 8 }, (_, index) => (
                    <span key={index} />
                  ))}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviesComp;
