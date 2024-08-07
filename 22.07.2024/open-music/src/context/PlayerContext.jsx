import React, { createContext, useContext, useState, useEffect } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { getTrackList } from "../api/tracksClient";
import { storage } from "../firebase";

const PlayerContext = createContext();

export const usePlayer = () => {
  return useContext(PlayerContext);
};

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackList, setTrackList] = useState([]);

  useEffect(() => {
    // Load the track list when the component mounts
    const fetchTracks = async () => {
      try {
        const tracks = await getTrackList();
        setTrackList(tracks);
      } catch (error) {
        console.error("Error loading track list:", error);
      }
    };

    fetchTracks();
  }, []);

  const playTrack = async (track) => {
    try {
      if (track.audioFile) {
        const audioRef = ref(storage, track.audioFile);
        const url = await getDownloadURL(audioRef);
        setCurrentTrack({ ...track, url });
        setIsPlaying(true);
      } else {
        console.error("No audio file found for this track.");
      }
    } catch (error) {
      console.error("Error loading track URL:", error);
    }
  };

  const playNextTrack = async () => {
    if (!trackList.length || !currentTrack) {
      return;
    }

    const currentIndex = trackList.findIndex(
      (track) => track.audioFile === currentTrack.audioFile
    );
    if (currentIndex === -1) {
      return;
    }

    const nextIndex = (currentIndex + 1) % trackList.length;
    const nextTrack = trackList[nextIndex];

    if (nextTrack) {
      await playTrack(nextTrack);
    }
  };

  const playPreviousTrack = async () => {
    if (!trackList.length || !currentTrack) {
      return;
    }

    const currentIndex = trackList.findIndex(
      (track) => track.audioFile === currentTrack.audioFile
    );
    if (currentIndex === -1) {
      return;
    }

    const previousIndex =
      currentIndex === 0 ? trackList.length - 1 : currentIndex - 1;
    const previousTrack = trackList[previousIndex];

    if (previousTrack) {
      await playTrack(previousTrack);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playTrack,
        playNextTrack,
        playPreviousTrack,
        togglePlayPause,
        setTrackList,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
