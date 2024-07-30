import { inputLabels } from "../data/labels";

export const validateTrack = (track) => {
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
    newErrors.duration = "Invalid duration format. Must be HH:MM (e.g., 03:45)";
  }

  return newErrors;
};
