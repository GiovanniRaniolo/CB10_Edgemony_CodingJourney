import React from "react";
import TrackForm from "./TrackForm";
import { addTrack } from "../api/tracks";
import { useNavigate } from "react-router-dom";

const AddTrackPage = () => {
  const navigate = useNavigate();

  const handleAddTrack = async (track) => {
    await addTrack(track);
    navigate("/");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Track</h1>
      <TrackForm onSubmit={handleAddTrack} submitButtonText="Add Track" />
    </div>
  );
};

export default AddTrackPage;
