import { FaHeart } from "react-icons/fa";
import { useFavorites } from "../context/FavoriteContext";

const FavoriteButton = ({ track, size = 32 }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const handleFavoriteClick = () => {
    if (isFavorite(track.id)) {
      removeFavorite(track.id);
    } else {
      addFavorite(track);
    }
  };

  return (
    <button
      onClick={handleFavoriteClick}
      className={`p-2 rounded-full ${
        isFavorite(track.id) ? "bg-red-500 text-white" : "bg-gray-300"
      }`}
    >
      <FaHeart size={size} />
    </button>
  );
};

export default FavoriteButton;
