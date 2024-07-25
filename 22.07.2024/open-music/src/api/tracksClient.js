import { ref, get } from "firebase/database";
import { db } from "../firebase";

const getTrackList = async () => {
  try {
    const trackRef = ref(db, "tracks");
    const snapshot = await get(trackRef);

    if (snapshot.exists()) {
      return snapshot.val();
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
