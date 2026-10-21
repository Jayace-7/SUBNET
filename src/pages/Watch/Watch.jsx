import { useEffect, useRef, useState } from "react";
import {
  FiBookmark,
  FiCheck,
  FiPause,
  FiPlay,
  FiRotateCcw,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

import previewVideo from "../../assets/hero/dune-part-two-preview.mp4";
import { useMyList } from "../../components/mylist/MyListContext";

// Turns a title ID into a readable title when no saved title name is available.
function formatTitleFromId(id) {
  return decodeURIComponent(id ?? "feature-title")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

// Shows the preview player and saves playback progress for this title.
function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const { getSavedItem, toggleSavedItem, recordPlaybackProgress } = useMyList();
  const savedItem = getSavedItem(id);
  const resolvedTitle = savedItem?.title ?? formatTitleFromId(id);
  const [position, setPosition] = useState(() => savedItem?.playbackPosition ?? 0);
  const [duration, setDuration] = useState(() => savedItem?.duration ?? 1800);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const nextPosition = savedItem?.playbackPosition ?? 0;
    if (Math.abs(video.currentTime - nextPosition) > 0.5) {
      video.currentTime = nextPosition;
    }
  }, [id, savedItem]);

  const progressPercent = duration > 0 ? Math.min((position / duration) * 100, 100) : 0;

  // Adds this title to My List or removes it if it is already saved.
  const handleToggleSaved = () => {
    toggleSavedItem({
      id,
      title: resolvedTitle,
      poster: savedItem?.poster ?? "",
      year: savedItem?.year ?? new Date().getFullYear(),
      type: savedItem?.type ?? "movie",
      status: savedItem?.status ?? "watch-later",
    });
  };

  // Starts or pauses the preview and saves progress when it is paused.
  const handlePlayPause = async () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      recordPlaybackProgress(id, {
        position: video.currentTime,
        duration: video.duration || duration,
        completed: false,
      });
      return;
    }

    if (position > 0 && video.currentTime === 0) {
      video.currentTime = position;
    }

    try {
      await video.play();
      setIsPlaying(true);
    } catch (error) {
      console.warn("Unable to start preview playback", error);
    }
  };

  // Moves playback to the chosen point and saves that position.
  const handleSeek = (event) => {
    const nextPosition = Number(event.target.value);
    const video = videoRef.current;

    if (video) {
      video.currentTime = nextPosition;
    }

    setPosition(nextPosition);
    recordPlaybackProgress(id, {
      position: nextPosition,
      duration: duration || 1800,
      completed: false,
    });
  };

  // Moves playback back to the start and clears its saved progress.
  const handleReset = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
    }

    setPosition(0);
    setIsPlaying(false);
    recordPlaybackProgress(id, {
      position: 0,
      duration: duration || 1800,
      completed: false,
    });
  };

  // Saves the current playback position while the preview is playing.
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    setPosition(video.currentTime);
    setDuration(video.duration || duration);

    recordPlaybackProgress(id, {
      position: video.currentTime,
      duration: video.duration || duration,
      completed: false,
    });
  };

  // Marks the preview as finished when it reaches the end.
  const handleVideoEnd = () => {
    const video = videoRef.current;
    const finalPosition = video?.duration || duration || 0;
    setIsPlaying(false);
    setPosition(finalPosition);
    recordPlaybackProgress(id, {
      position: finalPosition,
      duration: finalPosition,
      completed: true,
    });
  };

  const isSaved = Boolean(savedItem);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-16 pt-28 sm:px-8 lg:px-10">
      <div className="overflow-hidden rounded-[28px] border border-[#00D4C7]/25 bg-[#061011] shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          <video
            ref={videoRef}
            src={previewVideo}
            poster={savedItem?.poster || ""}
            muted
            playsInline
            preload="metadata"
            onLoadedMetadata={() => {
              const video = videoRef.current;
              if (!video) {
                return;
              }

              setDuration(video.duration || duration);
              if (position > 0) {
                video.currentTime = position;
              }
            }}
            onTimeUpdate={handleTimeUpdate}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            onEnded={handleVideoEnd}
            className="h-full w-full object-cover"
          />

          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#070909] via-[#070909]/35 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full border border-[#00D4C7]/40 bg-[#00D4C7]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9dfaf1]">
                Preview playback
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white sm:text-4xl">{resolvedTitle}</h1>
            <p className="mt-2 max-w-xl text-sm text-white/75 sm:text-base">
              This demo keeps playback progress locally in the browser and is ready for a real streaming backend later.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-white/10 bg-[#0c1113] p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#00D4C7]">Progress</p>
              <h2 className="mt-1 text-2xl font-semibold text-white">Resume & continue</h2>
            </div>
            <button
              type="button"
              onClick={navigate.bind(null, "/my-list")}
              className="rounded-full border border-white/12 bg-white/4 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:border-[#00D4C7]/60 hover:text-[#00D4C7]"
            >
              Back to My List
            </button>
          </div>

          <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.12em] text-white/60">
            <span>Playback</span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={duration || 1800}
            step={0.25}
            value={position}
            onChange={handleSeek}
            className="h-2 w-full cursor-pointer accent-[#00D4C7]"
            aria-label="Playback progress"
          />

          <div className="mt-4 flex items-center justify-between text-sm text-white/60">
            <span>{formatTime(position)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handlePlayPause}
              className="inline-flex items-center gap-2 rounded-full bg-[#00D4C7] px-4 py-2.5 text-sm font-semibold text-[#061010] transition-opacity hover:opacity-90"
            >
              {isPlaying ? <FiPause className="h-4 w-4" /> : <FiPlay className="h-4 w-4" />}
              {isPlaying ? "Pause" : position > 0 ? "Resume" : "Play"}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/4 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#00D4C7]/60 hover:text-[#00D4C7]"
            >
              <FiRotateCcw className="h-4 w-4" /> Start over
            </button>
          </div>
        </div>

        <aside className="rounded-2xl border border-white/10 bg-[#0b1011] p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#00D4C7]">Saved state</p>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-white/8 bg-white/3 p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-white/70">In My List</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#00D4C7]/10 px-2 py-1 text-[11px] font-medium text-[#9dfaf1]">
                  {isSaved ? <FiCheck className="h-3.5 w-3.5" /> : <FiBookmark className="h-3.5 w-3.5" />}
                  {isSaved ? "Saved" : "Not saved"}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleToggleSaved}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-colors ${
                isSaved
                  ? "border border-[#00D4C7]/40 bg-[#00D4C7]/10 text-[#9dfaf1] hover:bg-[#00D4C7]/18"
                  : "bg-[#00D4C7] text-[#061010] hover:opacity-90"
              }`}
            >
              {isSaved ? <FiBookmark className="h-4 w-4" /> : <FiCheck className="h-4 w-4" />}
              {isSaved ? "Remove from My List" : "Add to My List"}
            </button>

            <div className="rounded-xl border border-white/8 bg-white/3 p-3 text-sm text-white/70">
              <p className="font-medium text-white">Data model note</p>
              <p className="mt-2 leading-relaxed">
                Progress is stored locally in the browser until a real authenticated backend is connected.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// Shows a playback time as minutes and seconds.
function formatTime(value) {
  if (!Number.isFinite(value) || value <= 0) {
    return "0:00";
  }

  const totalSeconds = Math.floor(value);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export default Watch;