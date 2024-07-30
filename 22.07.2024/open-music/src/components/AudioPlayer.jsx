import React, { useReducer, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";

// Riduttore e stato iniziale
const initialState = {
  isPlaying: false,
  progress: 0,
  duration: 0,
  audioUrl: null,
  dragging: false,
  hoverProgress: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_PLAY":
      return { ...state, isPlaying: !state.isPlaying };
    case "SET_PROGRESS":
      return { ...state, progress: action.payload };
    case "SET_DURATION":
      return { ...state, duration: action.payload };
    case "SET_AUDIO_URL":
      return { ...state, audioUrl: action.payload };
    case "SET_DRAGGING":
      return { ...state, dragging: action.payload };
    case "SET_HOVER_PROGRESS":
      return { ...state, hoverProgress: action.payload };
    case "UPDATE_AUDIO_URL":
      return { ...state, audioUrl: action.payload };
    default:
      return state;
  }
}

function AudioPlayer({ track }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    if (track.audioFile) {
      const audioRef = ref(storage, track.audioFile);
      getDownloadURL(audioRef)
        .then((url) => {
          dispatch({ type: "SET_AUDIO_URL", payload: url });
        })
        .catch((error) => {
          console.error("Error fetching audio URL:", error);
        });
    }
  }, [track.audioFile]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (state.isPlaying) {
        audio.play().catch((error) => console.error("Playback error:", error));
      } else {
        audio.pause();
      }
    }
  }, [state.isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && state.audioUrl) {
      audio.src = state.audioUrl;
      audio.load();
      if (state.isPlaying) {
        audio.play().catch((error) => console.error("Playback error:", error));
      }
    }
  }, [state.audioUrl, state.isPlaying]);

  const handlePlayPause = () => {
    dispatch({ type: "TOGGLE_PLAY" });
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && !state.dragging) {
      const progress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      dispatch({ type: "SET_PROGRESS", payload: progress });
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      dispatch({ type: "SET_DURATION", payload: audioRef.current.duration });
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
    dispatch({ type: "SET_PROGRESS", payload: newProgress });
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
    dispatch({ type: "SET_DRAGGING", payload: true });
    updateHoverProgress(event);
  };

  const stopDragging = () => {
    if (state.dragging) {
      dispatch({ type: "SET_DRAGGING", payload: false });
      if (state.hoverProgress !== null && audioRef.current) {
        audioRef.current.currentTime =
          (state.hoverProgress / 100) * audioRef.current.duration;
        dispatch({ type: "SET_PROGRESS", payload: state.hoverProgress });
      }
      dispatch({ type: "SET_HOVER_PROGRESS", payload: null });
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
      dispatch({ type: "SET_HOVER_PROGRESS", payload: newProgress });
    }
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (state.dragging) {
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
  }, [state.dragging, state.hoverProgress]);

  return (
    <div className="flex items-center justify-center bg-violet-100">
      <div className="w-full max-w-2xl flex border-violet-100 dark:bg-violet-950 dark:border-violet-500 border rounded-xl p-4">
        {/* Left Side: Cover and Details */}
        <div className="flex items-center w-1/2 space-x-4">
          <img
            src={track.cover}
            alt={track.title}
            width="100"
            height="100"
            className="rounded-lg bg-violet-100"
            loading="lazy"
          />
          <div className="flex flex-col">
            <p className="text-cyan-500 dark:text-cyan-400 text-sm">
              {track.title}
            </p>
            <h2 className="text-violet-500 dark:text-violet-400 text-sm truncate">
              {track.album}
            </h2>
            <p className="text-violet-900 dark:text-violet-50 text-sm">
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
              aria-label={state.isPlaying ? "Pause" : "Play"}
              onClick={handlePlayPause}
              className="bg-white text-violet-900 dark:bg-violet-100 dark:text-violet-700 w-12 h-12 rounded-full ring-1 ring-violet-950 shadow-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-violet-950"
            >
              {state.isPlaying ? <FaPause size={22} /> : <FaPlay size={22} />}
            </button>
            <button
              type="button"
              aria-label="Skip 10 seconds"
              onClick={handleSkip}
              className="p-3 rounded-full hover:bg-violet-200 dark:hover:bg-violet-700"
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
          >
            <div className="bg-violet-100 dark:bg-violet-700 rounded-full overflow-hidden h-1">
              <div
                className="bg-cyan-500 dark:bg-cyan-400 h-1"
                style={{
                  width: `${
                    state.hoverProgress !== null
                      ? state.hoverProgress
                      : state.progress
                  }%`,
                }}
              ></div>
            </div>
            <div
              className="absolute top-0 -mt-1 w-4 h-4 bg-white border-2 border-cyan-500 rounded-full shadow"
              style={{
                left: `calc(${
                  state.hoverProgress !== null
                    ? state.hoverProgress
                    : state.progress
                }% - 8px)`,
              }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-xs leading-5 font-medium">
            <div className="text-cyan-500 dark:text-violet-100">
              {formatTime(audioRef.current?.currentTime || 0)}
            </div>
            <div className="text-violet-500 dark:text-violet-400">
              {formatTime(state.duration)}
            </div>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => dispatch({ type: "TOGGLE_PLAY" })}
      />
    </div>
  );
}

export default AudioPlayer;
