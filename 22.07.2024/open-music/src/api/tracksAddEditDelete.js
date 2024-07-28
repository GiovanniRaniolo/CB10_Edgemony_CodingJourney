// Importazioni necessarie da Firebase
import {
  getDatabase,
  ref as dbRef,
  set,
  update,
  remove,
} from "firebase/database";
import { db } from "../firebase";

// Funzione per aggiungere una traccia specifica nel Realtime Database
export const addTrack = async (track) => {
  const trackRef = dbRef(db, "tracks/" + track.id);
  await set(trackRef, track);
};

// Funzione per aggiornare i dettagli di una traccia specifica nel Realtime Database
export const updateTrack = async (trackId, track) => {
  try {
    const trackRef = dbRef(db, `tracks/${trackId}`);
    await update(trackRef, track);
  } catch (error) {
    throw new Error("Error updating track: " + error.message);
  }
};

// Funzione per cancellare una traccia specifica nel Realtime Database
export const deleteTrack = async (trackId) => {
  try {
    const trackRef = dbRef(db, `tracks/${trackId}`);
    await remove(trackRef);
  } catch (error) {
    throw new Error("Error deleting track: " + error.message);
  }
};
