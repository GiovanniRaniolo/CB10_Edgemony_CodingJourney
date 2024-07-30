import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";

function AudioPlayer({ track }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [hoverProgress, setHoverProgress] = useState(null);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    if (track.audioFile) {
      const audioRef = ref(storage, track.audioFile);
      getDownloadURL(audioRef)
        .then((url) => {
          setAudioUrl(url);
        })
        .catch((error) => {
          console.error("Error fetching audio URL:", error);
        });
    }
  }, [track.audioFile]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.play().catch((error) => console.error("Playback error:", error));
      } else {
        audio.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && audioUrl) {
      audio.src = audioUrl;
      audio.load();
      if (isPlaying) {
        audio.play().catch((error) => console.error("Playback error:", error));
      }
    }
  }, [audioUrl, isPlaying]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === undefined || time === null) {
      return "00:00";
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleProgressBarClick = (event) => {
    const { offsetWidth, offsetLeft } = progressBarRef.current;
    const clickPosition = event.clientX - offsetLeft;
    const newProgress = (clickPosition / offsetWidth) * 100;
    audioRef.current.currentTime =
      (newProgress / 100) * audioRef.current.duration;
    setProgress(newProgress);
  };

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - 10,
        0
      );
    }
  };

  const handleSkip = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 10,
        audioRef.current.duration
      );
    }
  };

  const startDragging = (event) => {
    event.preventDefault();
    setDragging(true);
    updateHoverProgress(event);
  };

  const stopDragging = () => {
    if (dragging) {
      setDragging(false);
      if (hoverProgress !== null && audioRef.current) {
        audioRef.current.currentTime =
          (hoverProgress / 100) * audioRef.current.duration;
        setProgress(hoverProgress);
      }
    }
  };

  const updateHoverProgress = (event) => {
    if (progressBarRef.current) {
      const { offsetWidth, offsetLeft } = progressBarRef.current;
      const clickPosition = event.clientX - offsetLeft;
      const newProgress = Math.min(
        Math.max((clickPosition / offsetWidth) * 100, 0),
        100
      );
      setHoverProgress(newProgress);
    }
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (dragging) {
        updateHoverProgress(event);
      }
    };

    const handleMouseUp = () => {
      stopDragging();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, hoverProgress]);

  return (
    <div className="flex items-center justify-center bg-violet-100">
      <div className="w-full max-w-2xl flex border-slate-100 dark:bg-slate-800 dark:border-slate-500 border rounded-xl p-4">
        {/* Left Side: Cover and Details */}
        <div className="flex items-center w-1/2 space-x-4">
          <img
            src={track.cover}
            alt={track.title}
            width="100"
            height="100"
            className="rounded-lg bg-slate-100"
            loading="lazy"
          />
          <div className="flex flex-col">
            <p className="text-cyan-500 dark:text-cyan-400 text-sm">
              {track.title}
            </p>
            <h2 className="text-slate-500 dark:text-slate-400 text-sm truncate">
              {track.album}
            </h2>
            <p className="text-slate-900 dark:text-slate-50 text-sm">
              {track.artist}
            </p>
          </div>
        </div>

        {/* Right Side: Controls */}
        <div className="flex flex-col w-1/2 mt-3 space-y-1 px-2">
          {/* Control Buttons */}
          <div className="flex items-center justify-around space-x-2 pb-1">
            <button
              type="button"
              aria-label="Rewind 10 seconds"
              onClick={handleRewind}
              className="p-3 rounded-full dark:hover:bg-violet-700"
            >
              <FaBackward size={18} className="text-white" />
            </button>
            <button
              type="button"
              aria-label={isPlaying ? "Pause" : "Play"}
              onClick={handlePlayPause}
              className="bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 w-12 h-12 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
            >
              {isPlaying ? <FaPause size={22} /> : <FaPlay size={22} />}
            </button>
            <button
              type="button"
              aria-label="Skip 10 seconds"
              onClick={handleSkip}
              className="p-3 rounded-full hover:bg-slate-200 dark:hover:bg-violet-700"
            >
              <FaForward size={18} className="text-white" />
            </button>
          </div>

          {/* Progress Bar */}
          <div
            className="relative"
            ref={progressBarRef}
            onClick={handleProgressBarClick}
            onMouseDown={startDragging}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
          >
            <div className="bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="bg-cyan-500 dark:bg-cyan-400 h-1"
                style={{ width: `${progress}%` }}
              ></div>
              {hoverProgress !== null && (
                <div
                  className="absolute top-0 left-0 h-full bg-cyan-200 dark:bg-cyan-600"
                  style={{ width: `${hoverProgress}%` }}
                ></div>
              )}
            </div>
            {hoverProgress !== null && (
              <div
                className="ring-cyan-500 dark:ring-cyan-400 ring-2 absolute top-1/2 w-4 h-4 -mt-2 flex items-center justify-center bg-white rounded-full shadow"
                style={{
                  left: `${hoverProgress}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <div className="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full ring-1 ring-inset ring-slate-900/5"></div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs leading-5 font-medium">
            <div className="text-cyan-500 dark:text-slate-100">
              {formatTime(audioRef.current?.currentTime || 0)}
            </div>
            <div className="text-slate-500 dark:text-slate-400">
              {formatTime(duration)}
            </div>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}

export default AudioPlayer;
