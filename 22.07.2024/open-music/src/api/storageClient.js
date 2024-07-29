import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../firebase";

// Function to upload a file
export const uploadFile = async (file, filePath) => {
  try {
    const fileRef = ref(storage, filePath); // Corretto: ref() anziché storageRef()
    const snapshot = await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    throw new Error("Error uploading file: " + error.message);
  }
};

// Function to get the download URL of a file
export const getFileURL = async (filePath) => {
  try {
    const fileRef = ref(storage, filePath); // Corretto: ref() anziché storageRef()
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    throw new Error("Error getting file URL: " + error.message);
  }
};

// Funzione per cancellare un file specifico dallo storage
export const deleteFile = async (filePath) => {
  if (!filePath) {
    throw new Error("File path is required");
  }

  try {
    console.log("Deleting file at path:", filePath); // Debug

    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
    console.log("File deleted successfully");
  } catch (error) {
    throw new Error("Error deleting file: " + error.message);
  }
};

// Funzione per controllare se un file esiste
export const fileExists = async (filePath) => {
  try {
    const fileRef = ref(storage, filePath);
    await getDownloadURL(fileRef); // Prova a ottenere l'URL del file
    return true; // Il file esiste
  } catch (error) {
    if (error.code === "storage/object-not-found") {
      return false; // Il file non esiste
    }
    throw error; // Rilancia altri errori
  }
};
