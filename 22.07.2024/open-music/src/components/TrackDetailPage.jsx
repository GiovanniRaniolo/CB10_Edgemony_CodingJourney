import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTrackById } from "../api/trackByIdClient";
import { trackLabels } from "../data/labels";
import { FaPlus, FaTrash } from "react-icons/fa";
import TrackDetailSkeleton from "./TrackDetailSkeleton";
import ErrorPage from "./ErrorPage";
import BandcampWidget from "./BandcampWidget";
import FavoriteButton from "./FavoriteButton";
import EditTrackButton from "./EditTrackButton";
import DeleteTrackModal from "./DeleteTrackModal";
import { deleteTrack } from "../api/tracksAddEditDelete";
import { useToast } from "../context/ToastContext"; // Usa il contesto del toast

function TrackDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [track, setTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast(); // Usa il contesto del toast

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const data = await getTrackById(id);
        setTrack(data);
      } catch (error) {
        console.log("Error fetching track:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrack();
  }, [id]);

  const handleAddToChartClick = () => {
    alert("Track added to chart!");
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteTrack(id);
      showToast("success", "Track deleted successfully");
      navigate("/"); // Navigate to home page after successful deletion
    } catch (error) {
      console.log("Error deleting track:", error);
      showToast("error", "Failed to delete track");
    }
  };

  const handleCloseToast = () => {
    setToast({ show: false, message: "", type: "" });
  };

  if (isLoading) return <TrackDetailSkeleton />;
  if (error) return <ErrorPage message={error.message} />;
  if (!track) return <ErrorPage message={"No track found."} />;

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-4xl mx-auto bg-violet-100 shadow-md rounded-lg">
      <div className="flex items-center mb-6">
        <img
          src={track.cover}
          alt={track.title}
          className="w-80 h-80 object-cover rounded-lg mr-6"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{track.title}</h1>
          <p className="text-lg mb-2">
            <strong>{trackLabels.trackTableArtist}:</strong> {track.artist}
          </p>
          <p className="text-lg mb-2">
            <strong>{trackLabels.trackTableAlbum}:</strong> {track.album}
          </p>
          <p className="text-lg mb-2">
            <strong>{trackLabels.trackTableGenre}:</strong> {track.genre}
          </p>
          <p className="text-lg mb-2">
            <strong>{trackLabels.trackTableReleaseDate}:</strong>{" "}
            {track.releaseDate}
          </p>
          <p className="text-lg mb-2">
            <strong>{trackLabels.trackTableDuration}:</strong> {track.duration}
          </p>
          <p className="text-sm mb-2">
            <strong>{trackLabels.trackTableUrl}:</strong>
            <a
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              {track.url}
            </a>
          </p>
        </div>
      </div>
      <div className="w-full pl-20 mb-4">
        <BandcampWidget
          trackId={track.bandcampTrackId}
          className="w-full max-w-4xl"
        />
      </div>
      <div className="flex items-center gap-4 mt-2">
        <FavoriteButton track={track} />
        <button
          onClick={handleAddToChartClick}
          className="p-3 bg-blue-500 text-white rounded-full"
        >
          <FaPlus size={24} />
        </button>
        <EditTrackButton />
        <button
          onClick={handleDeleteClick}
          className="p-3 bg-orange-500 text-white rounded-full hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <FaTrash size={24} />
        </button>
      </div>
      {isModalOpen && (
        <DeleteTrackModal
          onClose={handleModalClose}
          onConfirm={handleDeleteConfirm} // Passa handleDeleteConfirm come onConfirm
        />
      )}
      {isModalOpen && (
        <DeleteTrackModal
          onClose={handleModalClose}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}

export default TrackDetailPage;
