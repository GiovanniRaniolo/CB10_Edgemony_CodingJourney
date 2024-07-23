import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTrackById } from "../api/simulatedTrackClient"; // Importa la funzione simulata per ottenere i dettagli della traccia
import { trackLabels } from "../data/labels"; // Importa le etichette
import { FaHeart, FaPlus } from "react-icons/fa"; // Importa icone da react-icons
import TrackDetailSkeleton from "./TrackDetailSkeleton"; // Importa lo skeleton loader

function TrackDetailPage() {
  const { id } = useParams(); // Ottieni l'ID dalla URL
  const [track, setTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

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

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleAddToChartClick = () => {
    // Simula l'aggiunta alla chart (in futuro apriremo una modale)
    alert("Track added to chart!");
  };

  if (isLoading) return <TrackDetailSkeleton />;
  if (error) return <p>Error loading track details: {error.message}</p>;

  if (!track) return <p>No track found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
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
            <strong>{trackLabels.trackTableId}:</strong> {track.id}
          </p>
          <p className="text-lg mb-2">
            <strong>{trackLabels.trackTableUrl}:</strong>{" "}
            <a
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              {track.url}
            </a>
          </p>
          <p className="text-lg mb-2">
            <strong>{trackLabels.trackTableDuration}:</strong> {track.duration}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={handleFavoriteClick}
          className={`p-3 rounded-full ${
            isFavorite ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          <FaHeart size={24} />
        </button>
        <button
          onClick={handleAddToChartClick}
          className="p-3 bg-blue-500 text-white rounded-full"
        >
          <FaPlus size={24} />
        </button>
      </div>
    </div>
  );
}

export default TrackDetailPage;
