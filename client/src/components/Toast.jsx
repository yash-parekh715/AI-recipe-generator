import React from "react";

const Toast = ({ message, type = "info" }) => {
  const bgColor = type === "info" ? "bg-blue-50" : "bg-red-50";
  const iconColor = type === "info" ? "text-blue-500" : "text-red-500";

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 min-w-[250px]">
      <div
        className={`${bgColor} border border-gray-200 rounded-md shadow-lg p-3 flex items-center transition-all`}
      >
        <div className={`${iconColor} mr-2 flex-shrink-0`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="text-gray-700">{message}</div>
        <button className="ml-3 text-gray-400 hover:text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
