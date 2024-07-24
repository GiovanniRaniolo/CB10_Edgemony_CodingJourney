import { createContext, useContext, useEffect, useState } from "react";

const FavoriteContext = createContext();

export const useFavorites = () => {
  return useContext(FavoriteContext);
};

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (track) => {
    setFavorites((prev) => [...prev, track]);
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((track) => track.id !== id));
  };

  const isFavorite = (id) => {
    return favorites.some((track) => track.id === id);
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
