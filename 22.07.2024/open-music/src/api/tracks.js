import { getDatabase, ref, set, update } from "firebase/database";
import { db } from "../firebase";

export const addTrack = async (track) => {
  const db = getDatabase();
  const trackRef = ref(db, "tracks/" + track.id);
  await set(trackRef, track);
};

// Funzione per aggiornare i dettagli di una traccia specifica nel Realtime Database
export const updateTrack = async (trackId, track) => {
  try {
    const trackRef = ref(db, `tracks/${trackId}`);
    await update(trackRef, track);
  } catch (error) {
    throw new Error("Error updating track: " + error.message);
  }
};
