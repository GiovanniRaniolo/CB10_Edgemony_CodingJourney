import { ref, get } from "firebase/database";
import { db } from "../firebase";

const getTrackList = async () => {
  try {
    const trackRef = ref(db, "tracks");
    const snapshot = await get(trackRef);

    if (snapshot.exists()) {
      // Ottieni i dati come oggetto
      const data = snapshot.val();

      // Converti l'oggetto in un array
      const trackArray = Object.values(data);

      return trackArray;
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error("Error fetching track list:", error);
    throw error;
  }
};

export { getTrackList };
