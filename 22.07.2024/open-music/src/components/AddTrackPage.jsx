import React from "react";
import TrackForm from "./TrackForm";
import { addTrack } from "../api/tracksAddEditDelete";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

const AddTrackPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleAddTrack = async (newTrack) => {
    try {
      await addTrack(newTrack); // Aggiungi la traccia al backend o storage
      showToast("success", "Track added successfully");
      navigate("/"); // Reindirizza alla home o alla pagina delle tracce
    } catch (error) {
      console.error("Error adding track:", error);
      showToast("error", "Failed to add track");
    }
  };

  return (
    <div>
      <h1>Add New Track</h1>
      {/* Se non hai bisogno di `initialTrack`, rimuovilo */}
      <TrackForm onSubmit={handleAddTrack} submitButtonText="Add Track" />
    </div>
  );
};

export default AddTrackPage;
