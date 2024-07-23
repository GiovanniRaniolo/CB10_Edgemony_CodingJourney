import React from "react";

function TrackDetailSkeleton() {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <div className="flex items-center mb-6">
        <div className="w-80 h-80 bg-gray-200 rounded-lg mr-6 animate-pulse"></div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-2/3"></div>
          <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-1/2"></div>
          <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-1/3"></div>
          <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-1/4"></div>
          <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-1/3"></div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gray-200 rounded-full animate-pulse w-12 h-12"></div>
        <div className="p-3 bg-gray-200 rounded-full animate-pulse w-12 h-12"></div>
      </div>
    </div>
  );
}

export default TrackDetailSkeleton;
