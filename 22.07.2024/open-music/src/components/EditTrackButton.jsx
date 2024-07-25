import React from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EditTrackButton = ({ trackId, size = 32 }) => {
  const navigate = useNavigate();
  const handleEditTrack = () => {
    navigate(`/edit-track/${trackId}`);
  };

  return (
    <button
      onClick={handleEditTrack}
      className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <FaEdit size={size} />
    </button>
  );
};

export default EditTrackButton;
