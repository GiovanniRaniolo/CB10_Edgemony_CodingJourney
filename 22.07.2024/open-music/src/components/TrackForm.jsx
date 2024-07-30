import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { inputLabels } from "../data/labels";
import { useToast } from "../context/ToastContext";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../firebase";

const TrackForm = ({
  initialTrack = {},
  onSubmit,
  submitButtonText = "Add Track",
}) => {
  const [track, setTrack] = useState({
    id: initialTrack.id || uuidv4(),
    title: initialTrack.title || "",
    artist: initialTrack.artist || "",
    genre: initialTrack.genre || "",
    album: initialTrack.album || "",
    releaseDate: initialTrack.releaseDate
      ? new Date(initialTrack.releaseDate)
      : new Date(),
    url: initialTrack.url || "",
    duration: initialTrack.duration || "",
    audioFile: null,
    coverFile: null,
  });

  const [errors, setErrors] = useState({});
  const { showToast } = useToast();
  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  useEffect(() => {
    if (initialTrack.id && initialTrack.id !== track.id) {
      setTrack((prevTrack) => ({
        ...prevTrack,
        ...initialTrack,
        id: initialTrack.id,
      }));
    }
  }, [initialTrack, track.id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "audioFile") {
      setTrack((prevTrack) => ({
        ...prevTrack,
        audioFile: files[0] || prevTrack.audioFile,
      }));
    } else if (name === "coverFile") {
      setTrack((prevTrack) => ({
        ...prevTrack,
        coverFile: files[0] || prevTrack.coverFile,
      }));
    } else {
      setTrack((prevTrack) => ({
        ...prevTrack,
        [name]: value,
      }));
    }
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
      if (
        !track[key] &&
        key !== "id" &&
        key !== "audioFile" &&
        key !== "coverFile"
      ) {
        newErrors[key] = `${inputLabels[key] || key} is required`;
      }
    });

    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (track.url && !urlPattern.test(track.url)) {
      newErrors.url =
        "Invalid URL format. Must be a valid URL (e.g., http://example.com)";
    }

    const durationPattern = /^([0-9]{1,2}):([0-5][0-9])$/;
    if (track.duration && !durationPattern.test(track.duration)) {
      newErrors.duration =
        "Invalid duration format. Must be HH:MM (e.g., 03:45)";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateTrack();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast(
        "error",
        "Please correct the following errors before submitting:\n" +
          Object.values(validationErrors).join("\n")
      );
      return;
    }

    setErrors({});

    let audioFileUrl = initialTrack.audioFile || "";
    let coverFileUrl = initialTrack.cover || "";

    // Carica l'audio se è stato selezionato un nuovo file
    if (track.audioFile && track.audioFile instanceof File) {
      const fileExtension = track.audioFile.name.split(".").pop();
      const audioRef = storageRef(
        storage,
        `audio/${track.id}.${fileExtension}`
      );

      try {
        await uploadBytes(audioRef, track.audioFile);
        audioFileUrl = await getDownloadURL(audioRef);
      } catch (error) {
        console.error("Error uploading audio file:", error);
        showToast("error", "Failed to upload audio file.");
        return;
      }
    }

    // Carica la copertura se è stato selezionato un nuovo file
    if (track.coverFile && track.coverFile instanceof File) {
      const fileExtension = track.coverFile.name.split(".").pop();
      const coverRef = storageRef(
        storage,
        `covers/${track.id}.${fileExtension}`
      );

      try {
        await uploadBytes(coverRef, track.coverFile);
        coverFileUrl = await getDownloadURL(coverRef);
      } catch (error) {
        console.error("Error uploading cover file:", error);
        showToast("error", "Failed to upload cover file.");
        return;
      }
    }

    const formattedDate = track.releaseDate.toISOString().split("T")[0];

    // Prepara l'oggetto da inviare per l'aggiornamento
    const updatedTrack = {
      ...track,
      releaseDate: formattedDate,
      audioFile: audioFileUrl || initialTrack.audioFile,
      cover: coverFileUrl || initialTrack.cover,
    };

    console.log("Updating track with:", updatedTrack); // Log per il debug

    try {
      await onSubmit(updatedTrack); // Assumendo che onSubmit sia una funzione async
      showToast("success", "Track submitted successfully!");
    } catch (error) {
      console.error("Error submitting track:", error);
      showToast("error", "Failed to submit track.");
    }
  };

  const handleFileSelect = (type) => {
    if (type === "audio") {
      fileInputRef.current.click();
    } else if (type === "cover") {
      coverInputRef.current.click();
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-2 w-1/2 mx-auto">
        {Object.keys(track).map((key) => {
          if (key === "id" || key === "audioFile" || key === "coverFile")
            return null;
          const isError = !!errors[key];
          return (
            <div key={key} className="relative">
              <label
                htmlFor={key}
                className={`block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm ${
                  isError
                    ? "border-red-600 focus-within:border-red-600 focus-within:ring-red-600"
                    : "focus-within:border-violet-600 focus-within:ring-violet-600"
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
              {isError && <p className="text-sm text-red-600">{errors[key]}</p>}
            </div>
          );
        })}
        <div className="relative">
          <button
            type="button"
            onClick={() => handleFileSelect("audio")}
            className="block w-full border rounded-md border-gray-200 bg-gray-100 p-2 text-left text-gray-700"
          >
            {track.audioFile ? track.audioFile.name : "Select Audio File"}
          </button>
          <input
            type="file"
            name="audioFile"
            ref={fileInputRef}
            onChange={handleChange}
            accept="audio/*"
            className="hidden"
          />
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={() => handleFileSelect("cover")}
            className="block w-full border rounded-md border-gray-200 bg-gray-100 p-2 text-left text-gray-700"
          >
            {track.coverFile ? track.coverFile.name : "Select Cover Image"}
          </button>
          <input
            type="file"
            name="coverFile"
            ref={coverInputRef}
            onChange={handleChange}
            accept="image/*"
            className="hidden"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md border border-transparent bg-violet-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
        >
          {submitButtonText}
        </button>
      </form>
    </div>
  );
};

export default TrackForm;
