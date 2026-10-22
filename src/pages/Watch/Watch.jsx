import { useEffect, useRef, useState } from "react";
import {
  FiBookmark,
  FiCast,
  FiCheck,
  FiMaximize,
  FiMinimize,
  FiMoreVertical,
  FiPlay,
  FiPlus,
  FiRotateCcw,
  FiRotateCw,
  FiVolume2,
  FiVolumeX,
  FiX,
} from "react-icons/fi";
import { MdOutlineClosedCaption } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

import previewVideo from "../../assets/hero/dune-part-two-preview.mp4";
import spiderManTrailer from "../../assets/movies hero/SPIDER-MAN_ BRAND NEW DAY – Final Trailer (Peter’s Journey) 4K.mp4";
import breakingBadTrailer from "../../assets/tvshows/Breaking Bad - Full Series Trailer.mp4";
import { useMyList } from "../../components/mylist/MyListContext";

const subtitleTracks = [];
const playbackRates = [1, 1.25, 1.5, 2, 0.5];
const featuredTrailers = {
  "dune-part-two": previewVideo,
  "spider-man-brand-new-day": spiderManTrailer,
  "breaking-bad": breakingBadTrailer,
};

function formatTitleFromId(id) {
  return decodeURIComponent(id ?? "feature-title")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatRate(rate) {
  return `${Number.isInteger(rate) ? rate.toFixed(1) : rate}x`;
}

function Watch() {
  const { id } = useParams();

  return <WatchPlayer key={id} id={id} />;
}

function WatchPlayer({ id }) {
  const navigate = useNavigate();
  const playerRef = useRef(null);
  const videoRef = useRef(null);
  const controlsHideTimeoutRef = useRef(null);
  const cursorHideTimeoutRef = useRef(null);

  const { getSavedItem, toggleSavedItem, recordPlaybackProgress } = useMyList();
  const savedItem = getSavedItem(id);
  const resolvedTitle = savedItem?.title ?? formatTitleFromId(id);
  const [position, setPosition] = useState(() => savedItem?.playbackPosition ?? 0);
  const [duration, setDuration] = useState(() => savedItem?.duration ?? 0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCursorVisible, setIsCursorVisible] = useState(true);
  const [areTopControlsVisible, setAreTopControlsVisible] = useState(false);
  const [areBottomControlsVisible, setAreBottomControlsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [captionsOn, setCaptionsOn] = useState(false);
  const [rateIndex, setRateIndex] = useState(0);
  const [playbackError, setPlaybackError] = useState("");
  const isSaved = Boolean(savedItem);
  const playbackRate = playbackRates[rateIndex];

  useEffect(() => {
    const updateFullscreenState = () => {
      setIsFullscreen(document.fullscreenElement === playerRef.current);
    };

    document.addEventListener("fullscreenchange", updateFullscreenState);
    return () => document.removeEventListener("fullscreenchange", updateFullscreenState);
  }, []);

  useEffect(
    () => () => {
      clearTimeout(controlsHideTimeoutRef.current);
      clearTimeout(cursorHideTimeoutRef.current);
    },
    []
  );

  const progressPercent = duration > 0 ? Math.min((position / duration) * 100, 100) : 0;
  const displayVolume = isMuted ? 0 : volume;

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

  const handlePlayPause = async () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (!video.paused) {
      video.pause();
      return;
    }

    setPlaybackError("");
    try {
      await video.play();
    } catch (error) {
      console.warn("Unable to start preview playback", error);
      setPlaybackError("Playback could not be started. Try again or check the video source.");
    }
  };

  const handleSeek = (event) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) {
      return;
    }

    const nextPosition = Math.max(0, Math.min(Number(event.target.value), video.duration));
    video.currentTime = nextPosition;
    setPosition(nextPosition);
    recordPlaybackProgress(id, {
      position: nextPosition,
      duration: video.duration,
      completed: false,
    });
  };

  const handleSkip = (seconds) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) {
      return;
    }

    video.currentTime = Math.max(0, Math.min(video.currentTime + seconds, video.duration));
    setPosition(video.currentTime);
  };

  const handleVolumeChange = (event) => {
    const nextVolume = Number(event.target.value);
    const video = videoRef.current;
    setVolume(nextVolume);
    setIsMuted(nextVolume === 0);

    if (video) {
      video.volume = nextVolume;
      video.muted = nextVolume === 0;
    }
  };

  const handleToggleMute = () => {
    const video = videoRef.current;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (video) {
      video.muted = nextMuted;
      if (!nextMuted && volume === 0) {
        video.volume = 1;
        setVolume(1);
      }
    }
  };

  const handleCycleRate = () => {
    const nextIndex = (rateIndex + 1) % playbackRates.length;
    setRateIndex(nextIndex);
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRates[nextIndex];
    }
  };

  const handleToggleCaptions = () => {
    const nextValue = !captionsOn;
    setCaptionsOn(nextValue);

    const tracks = videoRef.current?.textTracks;
    if (tracks) {
      for (const track of tracks) {
        track.mode = nextValue ? "showing" : "hidden";
      }
    }
  };

  const handleToggleFullscreen = async () => {
    setPlaybackError("");
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (playerRef.current?.requestFullscreen) {
        await playerRef.current.requestFullscreen();
      } else {
        setPlaybackError("Fullscreen is not supported by this browser.");
      }
    } catch (error) {
      console.warn("Unable to change fullscreen mode", error);
      setPlaybackError("Fullscreen could not be changed. Try your browser's fullscreen controls.");
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const videoDuration = Number.isFinite(video.duration) ? video.duration : 0;
    setDuration(videoDuration);

    const savedPosition = savedItem?.playbackPosition ?? 0;
    const startingPosition = savedPosition > 0 && savedPosition < videoDuration ? savedPosition : 0;
    video.currentTime = startingPosition;
    setPosition(startingPosition);
    setIsLoading(false);
    setPlaybackError("");
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    setPosition(video.currentTime);
    if (Number.isFinite(video.duration)) {
      setDuration(video.duration);
      recordPlaybackProgress(id, {
        position: video.currentTime,
        duration: video.duration,
        completed: false,
      });
    }
  };

  const handleVideoEnd = () => {
    const video = videoRef.current;
    const finalPosition = video?.duration ?? duration;
    setIsPlaying(false);
    setPosition(finalPosition);
    recordPlaybackProgress(id, {
      position: finalPosition,
      duration: finalPosition,
      completed: true,
    });
  };

  const handleVideoError = () => {
    const errorCode = videoRef.current?.error?.code;
    const message = {
      2: "A network error interrupted the preview.",
      3: "The preview could not be decoded.",
      4: "This video format is not supported by your browser.",
    }[errorCode] ?? "The preview could not be loaded.";

    setIsLoading(false);
    setIsPlaying(false);
    setPlaybackError(message);
  };

  const handleClose = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate("/my-list", { replace: true });
    }
  };

  const showControls = () => {
    clearTimeout(controlsHideTimeoutRef.current);
    setAreTopControlsVisible(true);
    setAreBottomControlsVisible(true);
    controlsHideTimeoutRef.current = setTimeout(() => {
      setAreTopControlsVisible(false);
      setAreBottomControlsVisible(false);
    }, 2500);
  };

  const handlePlayerMouseMove = () => {
    showControls();
    setIsCursorVisible(true);
    clearTimeout(cursorHideTimeoutRef.current);
    cursorHideTimeoutRef.current = setTimeout(() => {
      setIsCursorVisible(false);
    }, 5000);
  };

  const iconButton =
    "inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 hover:text-[#9dfaf1]";

  return (
    <main className="px-3 pb-3 pt-24 sm:px-6 sm:pb-6">
      <section
        ref={playerRef}
        className={`overflow-hidden bg-black ${
          isFullscreen
            ? "h-full w-full"
            : "h-[calc(100dvh-7rem)] min-h-80 rounded-2xl border border-[#00D4C7]/20 shadow-[0_18px_60px_rgba(0,0,0,0.45)] sm:rounded-3xl"
        }`}
        aria-label={`Video player for ${resolvedTitle}`}
        onMouseMove={handlePlayerMouseMove}
        onMouseLeave={() => {
          clearTimeout(cursorHideTimeoutRef.current);
          setIsCursorVisible(true);
        }}
        onTouchStart={showControls}
      >
        <div className={`relative h-full w-full overflow-hidden bg-black ${isCursorVisible ? "" : "cursor-none"}`}>
          <video
            ref={videoRef}
            src={featuredTrailers[id] ?? previewVideo}
            poster={savedItem?.poster || undefined}
            playsInline
            preload="metadata"
            onClick={handlePlayPause}
            onLoadedMetadata={handleLoadedMetadata}
            onLoadedData={() => setIsLoading(false)}
            onWaiting={() => setIsLoading(true)}
            onCanPlay={() => setIsLoading(false)}
            onPlaying={() => {
              setIsPlaying(true);
              setIsLoading(false);
              setPlaybackError("");
            }}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnd}
            onError={handleVideoError}
            className="h-full w-full object-contain"
          >
            {subtitleTracks.map((track) => (
              <track
                key={track.src}
                kind="subtitles"
                src={track.src}
                srcLang={track.language}
                label={track.label}
              />
            ))}
          </video>

          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/85 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-black/90 to-transparent" />

          {isLoading && !playbackError && (
            <div className="absolute inset-0 z-10 flex items-center justify-center" role="status">
              <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/25 border-t-[#00D4C7]" />
              <span className="sr-only">Loading preview</span>
            </div>
          )}

          {playbackError && (
            <div
              className="absolute inset-0 z-10 flex items-center justify-center bg-black/75 px-6 text-center"
              role="alert"
            >
              <div className="max-w-md">
                <p className="text-lg font-semibold text-white">Preview unavailable</p>
                <p className="mt-2 text-sm text-white/70">{playbackError}</p>
              </div>
            </div>
          )}

          {/* Top bar */}
          <div
            onFocusCapture={showControls}
            className={`absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-3 px-4 py-3 transition-all duration-500 ease-in-out sm:px-6 sm:py-4 ${
              areTopControlsVisible
                ? "translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-3 opacity-0"
            } [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              {isFullscreen && (
                <>
                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close player"
                    title="Close player"
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-white transition-colors hover:text-[#9dfaf1]"
                  >
                    <FiX className="h-7 w-7" />
                  </button>
                  <span className="h-10 w-px shrink-0 bg-white/20" />
                </>
              )}
              <div className="min-w-0">
                <h1 className="truncate text-base font-bold leading-tight text-white sm:text-xl">
                  {resolvedTitle}
                </h1>
                <p className="mt-0.5 truncate text-xs text-white/60 sm:text-sm">
                  <span className="font-semibold text-white/80">Preview</span>
                  <span className="ml-2">Bundled sample footage</span>
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={handleToggleCaptions}
                aria-label={captionsOn ? "Turn subtitles off" : "Turn subtitles on"}
                aria-pressed={captionsOn}
                title="Subtitles"
                className={`${iconButton} ${captionsOn ? "text-[#00D4C7]" : ""}`}
              >
                <MdOutlineClosedCaption className="h-7 w-7" />
              </button>

              <div
                className="flex items-center"
                onMouseEnter={() => setIsVolumeOpen(true)}
                onMouseLeave={() => setIsVolumeOpen(false)}
                onFocus={() => setIsVolumeOpen(true)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setIsVolumeOpen(false);
                }}
              >
                <button
                  type="button"
                  onClick={handleToggleMute}
                  onTouchStart={() => setIsVolumeOpen((open) => !open)}
                  aria-label={isMuted ? "Unmute preview" : "Mute preview"}
                  title={isMuted ? "Unmute" : "Mute"}
                  className={iconButton}
                >
                  {displayVolume === 0 ? (
                    <FiVolumeX className="h-6 w-6" />
                  ) : (
                    <FiVolume2 className="h-6 w-6" />
                  )}
                </button>

                <div
                  className={`flex items-center overflow-hidden rounded-lg border bg-black/70 transition-all duration-200 ${
                    isVolumeOpen
                      ? "ml-1 max-w-60 border-white/20 px-3 py-2 opacity-100"
                      : "pointer-events-none max-w-0 border-transparent px-0 py-2 opacity-0"
                  }`}
                >
                  <span className="relative flex h-5 w-32 shrink-0 items-center sm:w-40">
                    <span className="absolute inset-x-0 h-1 overflow-hidden rounded-full bg-white/25">
                      <span
                        className="block h-full rounded-full bg-[#00D4C7]"
                        style={{ width: `${displayVolume * 100}%` }}
                      />
                    </span>
                    <span
                      className="absolute h-4 w-4 rounded-full bg-white"
                      style={{ left: `${displayVolume * 100}%`, transform: "translateX(-50%)" }}
                    />
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={displayVolume}
                      onChange={handleVolumeChange}
                      aria-label="Volume"
                      aria-valuetext={`${Math.round(displayVolume * 100)}%`}
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    />
                  </span>
                  <span
                    className="ml-3 min-w-6 text-right text-xs tabular-nums text-white"
                    aria-live="polite"
                  >
                    {Math.round(displayVolume * 100)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                aria-label="Cast to device"
                title="Cast"
                className={`${iconButton} hidden sm:inline-flex`}
              >
                <FiCast className="h-6 w-6" />
              </button>

              <button
                type="button"
                onClick={handleToggleFullscreen}
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                className={iconButton}
              >
                {isFullscreen ? <FiMinimize className="h-6 w-6" /> : <FiMaximize className="h-6 w-6" />}
              </button>

              <button
                type="button"
                onClick={handleCycleRate}
                aria-label={`Playback speed ${formatRate(playbackRate)}`}
                title="Playback speed"
                className="inline-flex h-10 min-w-11 items-center justify-center rounded-lg px-1 text-sm font-semibold text-white transition-colors hover:bg-white/10 hover:text-[#9dfaf1] sm:text-base"
              >
                {formatRate(playbackRate)}
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsMenuOpen((open) => !open)}
                  aria-label="More options"
                  aria-expanded={isMenuOpen}
                  title="More"
                  className={iconButton}
                >
                  <FiMoreVertical className="h-6 w-6" />
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 top-full z-40 mt-2 w-52 rounded-xl border border-white/15 bg-[#111]/95 p-1.5 shadow-xl">
                    <button
                      type="button"
                      onClick={() => {
                        handleToggleSaved();
                        setIsMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-white transition-colors hover:bg-white/10 hover:text-[#9dfaf1]"
                    >
                      {isSaved ? <FiCheck className="h-4 w-4" /> : <FiBookmark className="h-4 w-4" />}
                      {isSaved ? "Remove from My List" : "Add to My List"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom controls */}
          <div
            onFocusCapture={showControls}
            className={`absolute inset-x-0 bottom-0 z-30 px-4 pb-3 transition-all duration-500 ease-in-out sm:px-6 sm:pb-5 ${
              areBottomControlsVisible
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-3 opacity-0"
            } [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative flex h-5 items-center">
              <span className="absolute inset-x-0 h-1 overflow-hidden rounded-full bg-white/20">
                <span
                  className="block h-full rounded-full bg-[#00D4C7]"
                  style={{ width: `${progressPercent}%` }}
                />
              </span>
              <span
                className="absolute h-4 w-4 rounded-full bg-[#00D4C7]"
                style={{ left: `${progressPercent}%`, transform: "translateX(-50%)" }}
              />
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={Math.min(position, duration || 0)}
                onChange={handleSeek}
                disabled={!duration}
                aria-label="Playback progress"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
              />
            </div>

            <div className="mt-1 flex items-center justify-between text-sm tabular-nums text-white sm:text-base">
              <span>{formatTime(position)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="mt-1 grid grid-cols-[1fr_auto_1fr] items-center">
              <span />
              <div className="flex items-center gap-6 sm:gap-10">
                <button
                  type="button"
                  onClick={() => handleSkip(-10)}
                  aria-label="Back 10 seconds"
                  title="Back 10 seconds"
                  disabled={!duration}
                  className="relative inline-flex h-11 w-11 items-center justify-center text-white transition-colors hover:text-[#9dfaf1] disabled:opacity-40"
                >
                  <FiRotateCcw className="h-11 w-11" strokeWidth={1.5} />
                  <span className="absolute text-[11px] font-semibold">10</span>
                </button>

                <button
                  type="button"
                  onClick={handlePlayPause}
                  aria-label={isPlaying ? "Pause preview" : "Play preview"}
                  title={isPlaying ? "Pause" : "Play"}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#00D4C7]/40 bg-[#0d1a1a] text-white shadow-[0_0_24px_rgba(0,212,199,0.25)] transition-transform hover:scale-105 sm:h-18 sm:w-18"
                >
                  {isPlaying ? (
                    <span className="flex gap-1.5">
                      <span className="h-6 w-1.5 rounded-sm bg-white sm:h-7 sm:w-2" />
                      <span className="h-6 w-1.5 rounded-sm bg-white sm:h-7 sm:w-2" />
                    </span>
                  ) : (
                    <FiPlay className="ml-1 h-7 w-7" fill="currentColor" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleSkip(10)}
                  aria-label="Forward 10 seconds"
                  title="Forward 10 seconds"
                  disabled={!duration}
                  className="relative inline-flex h-11 w-11 items-center justify-center text-white transition-colors hover:text-[#9dfaf1] disabled:opacity-40"
                >
                  <FiRotateCw className="h-11 w-11" strokeWidth={1.5} />
                  <span className="absolute text-[11px] font-semibold">10</span>
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleToggleSaved}
                  aria-label={isSaved ? "Remove from My List" : "Add to My List"}
                  aria-pressed={isSaved}
                  title={isSaved ? "Remove from My List" : "Add to My List"}
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#00D4C7] text-[#00D4C7] transition-colors hover:bg-[#00D4C7]/20 ${
                    isSaved ? "bg-[#00D4C7]/10" : ""
                  }`}
                >
                  {isSaved ? <FiCheck className="h-5 w-5" /> : <FiPlus className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function formatTime(value) {
  if (!Number.isFinite(value) || value <= 0) {
    return "0:00";
  }

  const totalSeconds = Math.floor(value);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    : `${totalMinutes}:${String(seconds).padStart(2, "0")}`;
}

export default Watch;