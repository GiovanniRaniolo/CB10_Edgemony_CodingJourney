import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { inputLabels } from "../data/labels";
import { useToast } from "../context/ToastContext"; // Importa il contesto del toast

const TrackForm = ({
  initialTrack = {},
  onSubmit,
  submitButtonText = "Add Track",
}) => {
  const [track, setTrack] = useState({
    id: uuidv4(),
    title: "",
    artist: "",
    genre: "",
    album: "",
    releaseDate: new Date(),
    url: "",
    duration: "",
    cover: "",
    bandcampTrackId: "",
  });

  const [errors, setErrors] = useState({});
  const { showToast } = useToast(); // Usa il contesto del toast

  useEffect(() => {
    if (initialTrack.id) {
      setTrack((prevTrack) => ({
        ...prevTrack,
        ...initialTrack,
      }));
    } else {
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

  const validateTrack = () => {
    const newErrors = {};

    Object.keys(track).forEach((key) => {
      if (!track[key] && key !== "id") {
        newErrors[key] = `${inputLabels[key] || key} is required`;
      }
    });

    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (track.url && !urlPattern.test(track.url)) {
      newErrors.url =
        "Invalid URL format. Must be a valid URL (e.g., http://example.com)";
    }

    if (track.cover && !urlPattern.test(track.cover)) {
      newErrors.cover =
        "Invalid cover URL format. Must be a valid URL (e.g., http://example.com/image.jpg)";
    }

    const durationPattern = /^([0-9]{1,2}):([0-5][0-9])$/;
    if (track.duration && !durationPattern.test(track.duration)) {
      newErrors.duration =
        "Invalid duration format. Must be HH:MM (e.g., 03:45)";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateTrack();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast(
        "error",
        "Please correct the following errors before submitting:\n" +
          Object.values(validationErrors).join("\n")
      );
    } else {
      setErrors({});
      onSubmit(track);
      showToast("success", "Track submitted successfully!");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-2 w-1/2 mx-auto">
        {Object.keys(track).map((key) => {
          if (key === "id") return null;
          const isError = !!errors[key];
          return (
            <div key={key} className="relative">
              <label
                htmlFor={key}
                className={`block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm ${
                  isError
                    ? "border-red-600 focus-within:border-red-600 focus-within:ring-red-600"
                    : "focus-within:border-blue-600 focus-within:ring-blue-600"
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
                      portalId="root"
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
                    placeholder={inputLabels[key] || key}
                  />
                )}
                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                  {isError ? `${inputLabels[key]} *` : inputLabels[key]}
                </span>
              </label>
              {isError && (
                <p className="mt-1 text-sm text-red-600">{errors[key]}</p>
              )}
            </div>
          );
        })}
        <button
          type="submit"
          className="w-full px-5 py-3 text-sm font-medium leading-5 text-white bg-violet-600 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 hover:bg-violet-700"
        >
          {submitButtonText}
        </button>
      </form>
    </div>
  );
};

export default TrackForm;
