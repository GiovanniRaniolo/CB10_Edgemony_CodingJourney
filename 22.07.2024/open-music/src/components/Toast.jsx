import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Toast = ({ type, message, onClose, duration = 5000 }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!show) return null;

  let bgColor, textColor, iconPath;

  switch (type) {
    case "success":
      bgColor = "bg-green-100 dark:bg-green-800";
      textColor = "text-green-500 dark:text-green-200";
      iconPath =
        "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z";
      break;
    case "error":
      bgColor = "bg-red-100 dark:bg-red-800";
      textColor = "text-red-500 dark:text-red-200";
      iconPath =
        "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z";
      break;
    case "warning":
      bgColor = "bg-orange-100 dark:bg-orange-700";
      textColor = "text-orange-500 dark:text-orange-200";
      iconPath =
        "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z";
      break;
    default:
      bgColor = "bg-gray-100 dark:bg-gray-800";
      textColor = "text-gray-500 dark:text-gray-200";
      iconPath =
        "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z";
      break;
  }

  return ReactDOM.createPortal(
    <div
      className={`fixed bottom-4 right-4 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 rounded-lg shadow ${bgColor} ${textColor} transition-opacity duration-300 ease-in-out opacity-100`}
      role="alert"
      style={{ opacity: show ? 1 : 0, transition: "opacity 0.5s" }}
    >
      <div
        onClick={onClose}
        aria-label="Close"
        className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${bgColor} ${textColor}`}
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d={iconPath} />
        </svg>
        <span className="sr-only">Icon</span>
      </div>
      <div className="ms-3 text-sm font-normal">{message}</div>
    </div>,
    document.body
  );
};

export default Toast;
