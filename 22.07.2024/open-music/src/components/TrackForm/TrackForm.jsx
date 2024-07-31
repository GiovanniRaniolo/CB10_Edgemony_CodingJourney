import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "../../context/ToastContext";
import { validateTrack } from "../../utils/validation";
import { uploadFile } from "../../utils/fileUpload";
import InputField from "./InputField";
import DatePickerField from "./DatePickerField";
import FileUploadField from "./FileUploadField";
import { FaSpinner } from "react-icons/fa";
import { inputLabels } from "../../data/labels";

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
    // duration: initialTrack.duration || "",
    audioFile: null,
    coverFile: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const validationErrors = validateTrack(track);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast(
        "error",
        "Please correct the following errors before submitting:\n" +
          Object.values(validationErrors).join("\n")
      );
      setIsLoading(false);
      return;
    }

    setErrors({});

    let audioFileUrl = initialTrack.audioFile || "";
    let coverFileUrl = initialTrack.cover || "";

    try {
      if (track.audioFile && track.audioFile instanceof File) {
        audioFileUrl = await uploadFile(track.audioFile, `audio/${track.id}`);
      }

      if (track.coverFile && track.coverFile instanceof File) {
        coverFileUrl = await uploadFile(track.coverFile, `covers/${track.id}`);
      }

      const formattedDate = track.releaseDate.toISOString().split("T")[0];

      const updatedTrack = {
        ...track,
        releaseDate: formattedDate,
        audioFile: audioFileUrl || "",
        cover: coverFileUrl || "",
      };

      await onSubmit(updatedTrack);
      showToast("success", "Track submitted successfully!");
    } catch (error) {
      console.error("Error submitting track:", error);
      showToast("error", "Failed to submit track.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-2 w-1/2 mx-auto">
        <InputField
          id="title"
          label={inputLabels.title}
          value={track.title}
          onChange={handleChange}
          error={errors.title}
        />
        <InputField
          id="artist"
          label={inputLabels.artist}
          value={track.artist}
          onChange={handleChange}
          error={errors.artist}
        />
        <InputField
          id="genre"
          label={inputLabels.genre}
          value={track.genre}
          onChange={handleChange}
          error={errors.genre}
        />
        <InputField
          id="album"
          label={inputLabels.album}
          value={track.album}
          onChange={handleChange}
          error={errors.album}
        />
        <DatePickerField
          selected={track.releaseDate}
          onChange={handleDateChange}
          error={errors.releaseDate}
          label={inputLabels.releaseDate}
        />
        <InputField
          id="url"
          label={inputLabels.url}
          value={track.url}
          onChange={handleChange}
          error={errors.url}
        />
        {/* <InputField
          id="duration"
          label={inputLabels.duration}
          value={track.duration}
          onChange={handleChange}
          error={errors.duration}
        /> */}
        <FileUploadField
          id="audioFile"
          label={inputLabels.file}
          onFileSelect={handleChange}
          fileName={track.audioFile && track.audioFile.name}
        />
        <FileUploadField
          id="coverFile"
          label={inputLabels.cover}
          onFileSelect={handleChange}
          fileName={track.coverFile && track.coverFile.name}
        />
        <button
          type="submit"
          className={`relative w-full inline-flex items-center justify-center rounded-md border border-transparent bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 ${
            isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
          ) : (
            submitButtonText
          )}
        </button>
      </form>
    </div>
  );
};

export default TrackForm;
