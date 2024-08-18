import { ref as dbRef, set, update, remove, get } from "firebase/database"; // Importa 'get'
import { db, auth } from "../firebase";

// Funzione per aggiungere una traccia specifica nel Realtime Database
export const addTrack = async (track) => {
  const user = auth.currentUser; // Ottieni l'utente corrente
  if (!user) throw new Error("No user is currently signed in");

  const trackWithOwner = { ...track, owner: user.uid };
  const trackRef = dbRef(db, "tracks/" + track.id);
  await set(trackRef, trackWithOwner);
};

// Funzione per aggiornare i dettagli di una traccia specifica nel Realtime Database
export const updateTrack = async (trackId, track) => {
  const user = auth.currentUser; // Ottieni l'utente corrente
  if (!user) throw new Error("No user is currently signed in");

  const trackRef = dbRef(db, `tracks/${trackId}`);
  const snapshot = await get(trackRef); // Usa 'get' per ottenere i dati della traccia

  if (snapshot.exists()) {
    const existingTrack = snapshot.val();
    if (existingTrack.owner !== user.uid && !user.isAdmin) {
      throw new Error("You do not have permission to update this track");
    }
    await update(trackRef, track);
  } else {
    throw new Error("Track not found");
  }
};

// Funzione per cancellare una traccia specifica nel Realtime Database
export const deleteTrack = async (trackId) => {
  const user = auth.currentUser; // Ottieni l'utente corrente
  if (!user) throw new Error("No user is currently signed in");

  const trackRef = dbRef(db, `tracks/${trackId}`);
  const snapshot = await get(trackRef); // Usa 'get' per ottenere i dati della traccia

  if (snapshot.exists()) {
    const existingTrack = snapshot.val();
    if (existingTrack.owner !== user.uid && !user.isAdmin) {
      throw new Error("You do not have permission to delete this track");
    }
    await remove(trackRef);
  } else {
    throw new Error("Track not found");
  }
};
