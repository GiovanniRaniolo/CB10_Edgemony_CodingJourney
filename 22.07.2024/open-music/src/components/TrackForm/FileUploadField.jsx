import React, { useRef } from "react";

const FileUploadField = ({ id, label, onFileSelect, fileName }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-violet-600 focus-within:ring-violet-600"
      >
        <input
          type="file"
          id={id}
          name={id}
          ref={fileInputRef}
          onChange={onFileSelect}
          className="peer sr-only"
        />
        <button
          type="button"
          onClick={handleFileSelect}
          className="text-violet-600 hover:underline"
        >
          {label}
        </button>
        {fileName && (
          <span className="block mt-2 text-sm text-gray-600">{fileName}</span>
        )}
      </label>
    </div>
  );
};

export default FileUploadField;
