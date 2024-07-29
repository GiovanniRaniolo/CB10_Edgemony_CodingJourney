import React, { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaHeart,
} from "react-icons/fa";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";

function AudioPlayer({ track }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    if (track.audioUrl) {
      const audioRef = ref(storage, track.audioUrl);

      getDownloadURL(audioRef)
        .then((url) => {
          setAudioUrl(url);
        })
        .catch((error) => {
          console.error("Error fetching audio URL:", error);
        });
    }
  }, [track.audioUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying && audio) {
      audio.play().catch((error) => console.error("Playback error:", error));
    } else if (audio) {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.src = audioUrl;
      audioRef.current.load();
    }
  }, [audioUrl]);

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-2/3">
        <div className="bg-white border-slate-100 dark:bg-slate-800 dark:border-slate-500 border-b rounded-t-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8 items-center">
          <div className="flex items-center space-x-4">
            <img
              src={track.cover}
              alt={track.title}
              width="88"
              height="88"
              className="flex-none rounded-lg bg-slate-100"
              loading="lazy"
            />
            <div className="min-w-0 flex-auto space-y-1 font-semibold">
              <p className="text-cyan-500 dark:text-cyan-400 text-sm leading-6">
                <abbr title="Track">Track:</abbr> {track.id}
              </p>
              <h2 className="text-slate-500 dark:text-slate-400 text-sm leading-6 truncate">
                {track.title}
              </h2>
              <p className="text-slate-900 dark:text-slate-50 text-lg">
                {track.artist}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div
              className="relative"
              ref={progressBarRef}
              onClick={handleProgressBarClick}
            >
              <div className="bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="bg-cyan-500 dark:bg-cyan-400 h-2"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div
                className="ring-cyan-500 dark:ring-cyan-400 ring-2 absolute left-1/2 top-1/2 w-4 h-4 -mt-2 -ml-2 flex items-center justify-center bg-white rounded-full shadow"
                style={{ left: `${progress}%` }}
              >
                <div className="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full ring-1 ring-inset ring-slate-900/5"></div>
              </div>
            </div>
            <div className="flex justify-between text-sm leading-6 font-medium tabular-nums">
              <div className="text-cyan-500 dark:text-slate-100">
                {formatTime(audioRef.current?.currentTime || 0)}
              </div>
              <div className="text-slate-500 dark:text-slate-400">
                {formatTime(duration)}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 text-slate-500 dark:bg-slate-600 dark:text-slate-200 rounded-b-xl flex items-center">
          <div className="flex-auto flex items-center justify-evenly">
            <button type="button" aria-label="Add to favorites">
              <FaHeart size={24} />
            </button>
            <button
              type="button"
              aria-label="Rewind 10 seconds"
              onClick={handleRewind}
            >
              <FaBackward size={24} />
            </button>
          </div>
          <button
            type="button"
            className="bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={handlePlayPause}
          >
            {isPlaying ? <FaPause size={30} /> : <FaPlay size={30} />}
          </button>
          <div className="flex-auto flex items-center justify-evenly">
            <button
              type="button"
              aria-label="Skip 10 seconds"
              onClick={handleSkip}
            >
              <FaForward size={24} />
            </button>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
    </div>
  );
}

export default AudioPlayer;
