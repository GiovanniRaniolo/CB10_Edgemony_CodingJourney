import React from "react";
import { GrEdit } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const EditTrackButton = ({ trackId, size = 20 }) => {
  const navigate = useNavigate();
  const handleEditTrack = () => {
    navigate(`/edit-track/${trackId}`);
  };

  return (
    <button
      onClick={handleEditTrack}
      className="p-2 rounded-full bg-violet-200 text-violet-800 hover:bg-violet-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <GrEdit size={size} />
    </button>
  );
};

export default EditTrackButton;
