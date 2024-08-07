import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTrackById } from "../api/trackByIdClient";
import { trackLabels } from "../data/labels";
import { FaPlus, FaTrash, FaPlay } from "react-icons/fa"; // Importa l'icona di Play
import TrackDetailSkeleton from "../components/TrackDetailSkeleton";
import ErrorPage from "./ErrorPage";
import FavoriteButton from "../components/FavoriteButton";
import EditTrackButton from "../components/EditTrackButton";
import DeleteTrackModal from "../components/DeleteTrackModal";
import { deleteTrack } from "../api/tracksAddEditDelete";
import { deleteFile, fileExists } from "../api/storageClient";
import { useToast } from "../context/ToastContext";
import { usePlayer } from "../context/PlayerContext"; // Importa il context del Player

function TrackDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [track, setTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();
  const { playTrack } = usePlayer(); // Usa il context del Player per controllare la riproduzione

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

  const handlePlayClick = () => {
    if (track) {
      playTrack(track); // Avvia la riproduzione della traccia selezionata
    }
  };

  if (isLoading) return <TrackDetailSkeleton />;
  if (error) return <ErrorPage message={error.message} />;
  if (!track) return <ErrorPage message={"No track found."} />;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex items-center mb-6">
        <div className="relative mr-6">
          <img
            src={track.cover}
            alt={track.title}
            className="w-80 object-cover rounded-lg "
          />
          <button
            onClick={handlePlayClick}
            className="absolute bottom-2 left-2 p-2 bg-blue-500 text-white rounded-full"
          >
            <FaPlay size={20} className="pl-1" />
          </button>
        </div>
        <div>
          <h1 className="text-violet-900 text-3xl font-bold mb-4">
            {track.title}
          </h1>
          <p className="text-lg mb-2 text-slate-400">
            {trackLabels.trackTableArtist}:{" "}
            <strong className="text-violet-800 font-medium">
              {track.artist}
            </strong>
          </p>
          <p className="text-lg mb-2 text-slate-400">
            {trackLabels.trackTableAlbum}:{" "}
            <strong className="text-violet-800 font-medium">
              {track.album}
            </strong>
          </p>
          <p className="text-lg mb-2 text-slate-400">
            {trackLabels.trackTableGenre}:{" "}
            <strong className="text-violet-800 font-medium">
              {track.genre}
            </strong>
          </p>
          <p className="text-lg mb-3 text-slate-400">
            {trackLabels.trackTableReleaseDate}:{" "}
            <strong className="text-violet-800 font-medium">
              {track.releaseDate}
            </strong>
          </p>
          <p className="text-sm mb-2 text-slate-400">
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
      <div className="flex items-center gap-4 mt-2">
        <FavoriteButton track={track} />
        <button
          onClick={handleAddToChartClick}
          className="p-2 bg-blue-500 text-white rounded-full"
        >
          <FaPlus size={20} />
        </button>
        <EditTrackButton trackId={id} />
        <button
          onClick={handleDeleteClick}
          className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <FaTrash size={20} />
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
