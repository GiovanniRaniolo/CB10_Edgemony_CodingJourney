import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../firebase";

export const uploadFile = async (file, path) => {
  const fileExtension = file.name.split(".").pop();
  const fileRef = storageRef(storage, `${path}.${fileExtension}`);

  await uploadBytes(fileRef, file);
  const fileUrl = await getDownloadURL(fileRef);

  return fileUrl;
};
