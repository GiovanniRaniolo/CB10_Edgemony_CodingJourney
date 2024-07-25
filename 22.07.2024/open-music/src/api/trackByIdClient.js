import { ref, get } from "firebase/database";
import { db } from "../firebase";

// Funzione per ottenere i dettagli di una traccia specifica dal Realtime Database
export const getTrackById = async (id) => {
  try {
    const trackRef = ref(db, "tracks");
    const snapshot = await get(trackRef);

    if (snapshot.exists()) {
      const tracks = snapshot.val();
      const trackArray = Object.values(tracks);
      const track = trackArray.find((track) => track.id === id);

      if (track) {
        return track;
      } else {
        throw new Error("Track not found");
      }
    } else {
      throw new Error("No tracks available");
    }
  } catch (error) {
    throw new Error("Error fetching track: " + error.message);
  }
};
