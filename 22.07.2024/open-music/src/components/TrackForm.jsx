import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { inputLabels } from "../data/labels";

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
    releaseDate: new Date(), // Usa un oggetto Date per il selettore
    url: "",
    duration: "",
    cover: "",
    bandcampTrackId: "",
  });

  const [errors, setErrors] = useState({});

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

  const handleDateChange = (date) => {
    setTrack((prevTrack) => ({
      ...prevTrack,
      releaseDate: date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(track).forEach((key) => {
      if (!track[key] && key !== "id") {
        newErrors[key] = `${inputLabels[key] || key} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      onSubmit(track);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 w-1/2">
      {Object.keys(track).map((key) => {
        if (key === "id") return null;
        const isError = !!errors[key];
        return (
          <label
            key={key}
            htmlFor={key}
            className={`relative block overflow-hidden rounded-md border px-3 pt-3 shadow-sm focus-within:ring-1 ${
              isError
                ? "border-red-600 focus-within:border-red-600 focus-within:ring-red-600"
                : "border-gray-200 focus-within:border-blue-600 focus-within:ring-blue-600"
            }`}
          >
            {key === "releaseDate" ? (
              <div className="relative">
                <DatePicker
                  selected={track[key]}
                  onChange={handleDateChange}
                  dateFormat="yyyy-MM-dd"
                  className={`peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${
                    isError ? "placeholder-red-600" : "placeholder-gray-500"
                  }`}
                  wrapperClassName="h-8 w-full"
                  popperClassName="z-50"
                  calendarClassName="border border-gray-200 rounded-md shadow-lg"
                  popperPlacement="left-start"
                  portalId="root" // Ensures the DatePicker is rendered inside this element
                />
              </div>
            ) : (
              <input
                type="text"
                id={key}
                name={key}
                value={track[key]}
                onChange={handleChange}
                className={`peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${
                  isError ? "placeholder-red-600" : "placeholder-gray-500"
                }`}
              />
            )}
            <span className="absolute left-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
              {isError ? `${inputLabels[key]} *` : inputLabels[key]}
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
