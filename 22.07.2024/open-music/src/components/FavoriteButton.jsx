import { FaHeart } from "react-icons/fa";
import { useFavorites } from "../context/FavoriteContext";

const FavoriteButton = ({ track, size = 24 }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const handleFavoriteClick = () => {
    console.log("Track ID:", track.id); // Verifica il valore dell'ID
    if (track.id) {
      if (isFavorite(track.id)) {
        removeFavorite(track.id);
      } else {
        addFavorite(track);
      }
    } else {
      console.error("Track ID is undefined or null");
    }
  };

  return (
    <button
      onClick={handleFavoriteClick}
      className={`p-3 rounded-full  hover:bg-gray-400 ${
        isFavorite(track.id) ? "bg-red-500 text-white" : "bg-gray-300"
      }`}
    >
      <FaHeart size={size} />
    </button>
  );
};

export default FavoriteButton;
