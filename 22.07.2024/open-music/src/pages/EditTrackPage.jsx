import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TrackForm from "../components/TrackForm/TrackForm";
import { getTrackById } from "../api/trackByIdClient";
import { updateTrack } from "../api/tracksAddEditDelete";
import { uploadFile, deleteFile } from "../api/storageClient";
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
        const data = await getTrackById(trackId);
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

  const handleUpdateTrack = async (updatedTrack, newCoverFile) => {
    try {
      let newCoverURL = updatedTrack.cover;

      if (newCoverFile) {
        if (track.cover) {
          await deleteFile(track.cover);
        }

        const coverPath = `covers/${trackId}_${newCoverFile.name}`;
        newCoverURL = await uploadFile(newCoverFile, coverPath);
      }

      await updateTrack(trackId, { ...updatedTrack, cover: newCoverURL });
      showToast("success", "Track updated successfully");
      navigate(`/track/${trackId}`);
    } catch (error) {
      console.error("Error updating track:", error);
      showToast("error", "Failed to update track");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!track) return <div>No track found.</div>;

  return (
    <div className="mt-16">
      <TrackForm
        initialTrack={track}
        onSubmit={handleUpdateTrack}
        submitButtonText="Update Track"
      />
    </div>
  );
};

export default EditTrackPage;
