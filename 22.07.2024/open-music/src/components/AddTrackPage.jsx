import React from "react";
import TrackForm from "./TrackForm";
import { addTrack } from "../api/tracksAddEditDelete";
import { useNavigate } from "react-router-dom";

const AddTrackPage = () => {
  const navigate = useNavigate();

  const handleAddTrack = async (track) => {
    await addTrack(track);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center mt-6">
      <TrackForm onSubmit={handleAddTrack} submitButtonText="Add Track" />
    </div>
  );
};

export default AddTrackPage;
