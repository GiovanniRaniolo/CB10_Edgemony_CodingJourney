import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const TrackForm = ({
  initialTrack = {},
  onSubmit,
  submitButtonText = "Add Track",
}) => {
  const [track, setTrack] = useState({
    id: uuidv4(), // Genera un ID solo quando il form è inizializzato
    title: "",
    artist: "",
    genre: "",
    album: "",
    releaseDate: "",
    url: "",
    duration: "",
    cover: "",
    bandcampTrackId: "",
  });

  useEffect(() => {
    if (initialTrack.id) {
      // Se l'ID esiste nell'iniziale, non rigenerare l'ID
      setTrack((prevTrack) => ({
        ...prevTrack,
        ...initialTrack,
      }));
    } else {
      // Altrimenti, genera un nuovo ID
      setTrack((prevTrack) => ({
        ...prevTrack,
        ...initialTrack,
        id: uuidv4(),
      }));
    }
  }, [initialTrack]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrack((prevTrack) => ({
      ...prevTrack,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(track);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 w-1/2">
      {Object.keys(track).map((key) => {
        if (key === "id") return null;
        return (
          <label
            key={key}
            htmlFor={key}
            className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              type="text"
              id={key}
              name={key}
              value={track[key]}
              onChange={handleChange}
              placeholder={key}
              className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />
            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
          </label>
        );
      })}
      <button
        type="submit"
        className="w-full px-5 py-3 text-sm font-medium leading-5 text-white bg-violet-600 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 hover:bg-violet-700"
      >
        {submitButtonText}
      </button>
    </form>
  );
};

export default TrackForm;
