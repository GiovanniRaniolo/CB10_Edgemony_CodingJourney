import React, { useState, useEffect } from "react";
import TrackForm from "./TrackForm";
import { updateTrack } from "../api/tracksAddEditDelete";
import { getTrackById } from "../api/trackByIdClient";
import { useParams, useNavigate } from "react-router-dom";

const EditTrackPage = () => {
  const { trackId } = useParams();
  const navigate = useNavigate();
  const [track, setTrack] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const trackData = await getTrackById(trackId);
        console.log("Fetched track data:", trackData); // Log per verificare i dati
        setTrack(trackData);
      } catch (error) {
        console.error("Error fetching track:", error);
        setError("Failed to load track data.");
      }
    };
    fetchTrack();
  }, [trackId]);

  const handleUpdateTrack = async (updatedTrack) => {
    try {
      await updateTrack(trackId, updatedTrack);
      navigate("/");
    } catch (error) {
      console.error("Error updating track:", error);
      setError("Failed to update track.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Track</h1>
      {error && <p className="text-red-500">{error}</p>}
      {track ? (
        <TrackForm
          initialTrack={track}
          onSubmit={handleUpdateTrack}
          submitButtonText="Update Track"
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditTrackPage;
