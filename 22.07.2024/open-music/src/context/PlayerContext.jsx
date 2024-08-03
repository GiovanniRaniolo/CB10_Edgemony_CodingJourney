import React, { createContext, useContext, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";

const PlayerContext = createContext();

export const usePlayer = () => {
  return useContext(PlayerContext);
};

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = async (track) => {
    try {
      if (track.audioFile) {
        const audioRef = ref(storage, track.audioFile);
        const url = await getDownloadURL(audioRef);
        setCurrentTrack({ ...track, url });
        setIsPlaying(true);
      } else {
        console.error("Nessun file audio trovato per questo track.");
      }
    } catch (error) {
      console.error("Errore nel caricamento dell'URL del track:", error);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <PlayerContext.Provider
      value={{ currentTrack, isPlaying, playTrack, togglePlayPause }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
