import React from "react";
import { deleteFile } from "../api/storageClient"; // Funzione di eliminazione dei file
import { deleteTrack } from "../api/tracksAddEditDelete"; // Funzione di eliminazione della traccia

const DeleteTrackModal = ({
  onClose,
  onConfirm,
  trackId,
  audioFilePath,
  coverFilePath,
}) => {
  const handleConfirm = async () => {
    try {
      if (!audioFilePath && !coverFilePath) {
        throw new Error("At least one file path is required");
      }

      // Elimina il file audio associato
      if (audioFilePath) {
        await deleteFile(audioFilePath);
      }

      // Elimina il file di copertina associato
      if (coverFilePath) {
        await deleteFile(coverFilePath);
      }

      // Elimina la traccia dal database
      await deleteTrack(trackId);

      onConfirm();
    } catch (error) {
      console.error("Error in delete track:", error.message);
    }
  };

  return (
    <div
      id="default-modal"
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-300">
            <h3 className="text-xl font-semibold text-gray-900">
              Confirm Delete
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <p className="text-base leading-relaxed text-gray-500">
              Are you sure you want to delete this track? This action cannot be
              undone.
            </p>
          </div>
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
            <button
              type="button"
              className="text-white bg-violet-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={handleConfirm}
            >
              Confirm
            </button>
            <button
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
              onClick={onClose}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTrackModal;
