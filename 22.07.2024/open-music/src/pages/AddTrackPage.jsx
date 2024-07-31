import React from "react";
import TrackForm from "../components/TrackForm/TrackForm";
import { addTrack } from "../api/tracksAddEditDelete";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

const AddTrackPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleAddTrack = async (newTrack) => {
    try {
      await addTrack(newTrack);
      showToast("success", "Track added successfully");
      navigate("/");
    } catch (error) {
      console.error("Error adding track:", error);
      showToast("error", "Failed to add track");
    }
  };

  return (
    <div className="mt-16">
      {/* <h1>Add New Track</h1> */}
      <TrackForm onSubmit={handleAddTrack} submitButtonText="Add Track" />
    </div>
  );
};

export default AddTrackPage;
