import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TrackForm from "./TrackForm";
import { getTrackById } from "../api/trackByIdClient";
import { updateTrack } from "../api/tracksAddEditDelete"; // Supponendo che queste siano le tue funzioni API
import { useToast } from "../context/ToastContext";

const EditTrackPage = () => {
  const { trackId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [track, setTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const data = await getTrackById(trackId); // Ottieni i dati della traccia
        setTrack(data);
      } catch (error) {
        console.error("Error fetching track:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrack();
  }, [trackId]);

  const handleUpdateTrack = async (updatedTrack) => {
    try {
      await updateTrack(trackId, updatedTrack); // Aggiorna la traccia esistente
      showToast("success", "Track updated successfully");
      navigate(`/track/${trackId}`); // Reindirizza alla pagina della traccia aggiornata
    } catch (error) {
      console.error("Error updating track:", error);
      showToast("error", "Failed to update track");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!track) return <div>No track found.</div>;

  return (
    <div>
      <h1>Edit Track</h1>
      <TrackForm
        initialTrack={track}
        onSubmit={handleUpdateTrack}
        submitButtonText="Update Track"
      />
    </div>
  );
};

export default EditTrackPage;
