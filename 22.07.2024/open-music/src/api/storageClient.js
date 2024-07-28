import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../firebase";

// Function to upload a file
export const uploadFile = async (file, filePath) => {
  try {
    const fileRef = storageRef(storage, filePath);
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
    const fileRef = storageRef(storage, filePath);
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    throw new Error("Error getting file URL: " + error.message);
  }
};

// Function to delete a file
export const deleteFile = async (filePath) => {
  try {
    const fileRef = storageRef(storage, filePath);
    await deleteObject(fileRef);
  } catch (error) {
    throw new Error("Error deleting file: " + error.message);
  }
};
