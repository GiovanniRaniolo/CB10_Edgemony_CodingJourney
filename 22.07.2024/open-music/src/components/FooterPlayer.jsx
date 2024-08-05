import React, { useEffect, useRef, useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import { FaPlay, FaPause } from "react-icons/fa";

const FooterPlayer = () => {
  const { currentTrack, isPlaying, togglePlayPause } = usePlayer();
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hoverProgress, setHoverProgress] = useState(null);
  const [visible, setVisible] = useState(false);
  const [autoHideTimeout, setAutoHideTimeout] = useState(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentTrack?.url) {
      audio.src = currentTrack.url;
      audio.load();
      if (isPlaying) {
        audio
          .play()
          .catch((error) =>
            console.error("Error on file audio reproduction:", error)
          );
        setVisible(true);
        if (autoHideTimeout) {
          clearTimeout(autoHideTimeout);
        }
        setAutoHideTimeout(setTimeout(() => setVisible(false), 2000));
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
    }
  }, [audioRef.current?.src]);

  const handleTimeUpdate = () => {
    if (audioRef.current && !dragging) {
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressBarClick = (event) => {
    const { offsetWidth, offsetLeft } = progressBarRef.current;
    const clickPosition = event.clientX - offsetLeft;
    const newProgress = (clickPosition / offsetWidth) * 100;
    audioRef.current.currentTime =
      (newProgress / 100) * audioRef.current.duration;
    setProgress(newProgress);
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
      setHoverProgress(null);
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
      if (window.innerHeight - event.clientY < 50) {
        setVisible(true);
        if (autoHideTimeout) {
          clearTimeout(autoHideTimeout);
        }
        setAutoHideTimeout(setTimeout(() => setVisible(false), 2000));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (autoHideTimeout) {
        clearTimeout(autoHideTimeout);
      }
    };
  }, [autoHideTimeout]);

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      className={`fixed bottom-0 w-full h-[40px] bg-violet-100 dark:bg-violet-950 flex items-center justify-between px-80 border-t border-gray-200 dark:border-violet-700 transition-transform duration-500 ease-in-out ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {currentTrack && (
        <>
          <div className="flex items-center">
            <div className="flex flex-row items-center gap-2">
              <span className="font-bold text-violet-700 dark:text-violet-100">
                {currentTrack.title}
              </span>
              <span className="text-sm text-violet-500 dark:text-violet-300">
                | {currentTrack.artist}
              </span>
            </div>
            <button onClick={togglePlayPause} className="ml-10">
              {isPlaying ? (
                <FaPause className="text-violet-700 dark:text-violet-100" />
              ) : (
                <FaPlay className="text-violet-700 dark:text-violet-100" />
              )}
            </button>
          </div>
          <div className="flex-1 mx-4">
            <div
              className="relative w-full h-1 bg-violet-200 dark:bg-violet-700 cursor-pointer rounded-full"
              ref={progressBarRef}
              onClick={handleProgressBarClick}
              onMouseDown={startDragging}
              style={{ overflow: "visible" }}
            >
              <div
                className="absolute w-3 h-3 bg-white border-2 border-cyan-500 rounded-full shadow"
                style={{
                  top: "-4px",
                  left: `calc(${
                    hoverProgress !== null ? hoverProgress : progress
                  }% - 2px)`,
                }}
              ></div>
              <div
                className="absolute h-1 bg-cyan-500 dark:bg-cyan-400"
                style={{
                  width: `${
                    hoverProgress !== null ? hoverProgress : progress
                  }%`,
                }}
              ></div>
            </div>
          </div>
          <div className="text-violet-700 dark:text-violet-100 text-xs">
            {formatTime(audioRef.current?.currentTime || 0)} /{" "}
            {formatTime(duration)}
          </div>
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={togglePlayPause}
          >
            <source src={currentTrack.url} type="audio/mpeg" />
            <p>Your browser does not support the audio element.</p>
          </audio>
        </>
      )}
    </div>
  );
};

export default FooterPlayer;
