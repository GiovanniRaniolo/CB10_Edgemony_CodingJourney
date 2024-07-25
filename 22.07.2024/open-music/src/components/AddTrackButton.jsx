import React from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddTrackButton = ({ size = 32 }) => {
  const navigate = useNavigate();
  const handleAddTrack = () => {
    navigate("/add-track");
  };

  return (
    <button
      onClick={handleAddTrack}
      className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
    >
      <FaPlus size={size} />
    </button>
  );
};

export default AddTrackButton;
