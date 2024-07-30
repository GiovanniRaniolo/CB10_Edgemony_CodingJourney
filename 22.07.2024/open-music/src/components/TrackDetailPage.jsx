import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTrackById } from "../api/trackByIdClient";
import { trackLabels } from "../data/labels";
import { FaPlus, FaTrash } from "react-icons/fa";
import TrackDetailSkeleton from "./TrackDetailSkeleton";
import ErrorPage from "./ErrorPage";
import FavoriteButton from "./FavoriteButton";
import EditTrackButton from "./EditTrackButton";
import DeleteTrackModal from "./DeleteTrackModal";
import { deleteTrack } from "../api/tracksAddEditDelete";
import { deleteFile, fileExists } from "../api/storageClient";
import { useToast } from "../context/ToastContext";
import AudioPlayer from "./AudioPlayer";

function TrackDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [track, setTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();

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
      if (track && track.audioFile) {
        const fileExistsOnStorage = await fileExists(track.audioFile);
        if (!fileExistsOnStorage) {
          console.warn(
            "File does not exist on storage, proceeding with database deletion only."
          );
        } else {
          await deleteFile(track.audioFile); // Rimuove il file dallo storage
        }
      }
      await deleteTrack(id); // Rimuove la traccia dal database
      showToast("success", "Track deleted successfully"); // Mostra il messaggio di successo
      navigate("/"); // Naviga alla home page dopo la cancellazione
    } catch (error) {
      console.log("Error deleting track:", error);
      showToast("error", "Failed to delete track"); // Mostra il messaggio di errore
    } finally {
      setIsModalOpen(false); // Chiudi la modale dopo la cancellazione
    }
  };

  if (isLoading) return <TrackDetailSkeleton />;
  if (error) return <ErrorPage message={error.message} />;
  if (!track) return <ErrorPage message={"No track found."} />;

  const audioUrl = track.audioFile
    ? `https://firebasestorage.googleapis.com/v0/b/${
        import.meta.env.VITE_STORAGE_BUCKET
      }/o/${encodeURIComponent(track.audioFile)}?alt=media`
    : null;

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-4xl mx-auto bg-violet-100 shadow-md rounded-lg">
      <div className="flex items-center mb-6">
        <img
          src={track.cover}
          alt={track.title}
          className="w-64 h-64 object-cover rounded-lg mr-6"
        />
        <div>
          <h1 className="text-violet-900 text-3xl font-bold mb-4">
            {track.title}
          </h1>
          <p className="text-lg mb-2">
            {trackLabels.trackTableArtist}:{" "}
            <strong className="text-violet-800">{track.artist}</strong>
          </p>
          <p className="text-lg mb-2">
            {trackLabels.trackTableAlbum}:{" "}
            <strong className="text-violet-800">{track.album}</strong>
          </p>
          <p className="text-lg mb-2">
            {trackLabels.trackTableGenre}:{" "}
            <strong className="text-violet-800">{track.genre}</strong>
          </p>
          <p className="text-lg mb-2">
            {trackLabels.trackTableReleaseDate}:{" "}
            <strong className="text-violet-800">{track.releaseDate}</strong>
          </p>
          <p className="text-lg mb-2">
            {trackLabels.trackTableDuration}:{" "}
            <strong className="text-violet-800">{track.duration}</strong>
          </p>
          <p className="text-sm mb-2">
            {trackLabels.trackTableUrl}:{" "}
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
      <div className="w-full mb-8">
        {audioUrl ? (
          <AudioPlayer track={track} className="w-full max-w-4xl" />
        ) : (
          <p>No audio available for this track.</p>
        )}
      </div>
      <div className="flex items-center gap-4 mt-2">
        <FavoriteButton track={track} />
        <button
          onClick={handleAddToChartClick}
          className="p-3 bg-blue-500 text-white rounded-full"
        >
          <FaPlus size={24} />
        </button>
        <EditTrackButton trackId={id} />
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
          onConfirm={handleDeleteConfirm}
          trackId={track.id}
          audioFilePath={track.audioFile} // Passa il percorso del file audio
          coverFilePath={track.cover}
        />
      )}
    </div>
  );
}

export default TrackDetailPage;
