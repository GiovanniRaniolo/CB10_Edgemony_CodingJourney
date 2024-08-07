import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, set, remove, get } from "firebase/database";

const FavoriteContext = createContext();

export const useFavorites = () => {
  return useContext(FavoriteContext);
};

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const userId = "user1"; // Cambia questo con l'ID dell'utente attuale

  useEffect(() => {
    const fetchFavorites = async () => {
      const dbRef = ref(db, `favorites/${userId}`);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        setFavorites(Object.values(data));
      } else {
        setFavorites([]);
      }
    };

    fetchFavorites();
  }, [userId]);

  const addFavorite = async (track) => {
    try {
      console.log("Adding favorite:", track);
      const favoriteRef = ref(db, `favorites/${userId}/${track.id}`);
      await set(favoriteRef, track);
      setFavorites((prev) => [...prev, track]);
      console.log("Added favorite successfully");
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const removeFavorite = async (id) => {
    try {
      console.log("Removing favorite ID:", id);
      const favoriteRef = ref(db, `favorites/${userId}/${id}`);
      await remove(favoriteRef);
      setFavorites((prev) => prev.filter((track) => track.id !== id));
      console.log("Removed favorite successfully");
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
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
