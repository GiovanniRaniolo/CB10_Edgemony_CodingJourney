import React from "react";

function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      <td className="whitespace-nowrap px-4 py-2">
        <div className="h-6 bg-gray-200 rounded-lg w-3/4"></div>
      </td>
      <td className="whitespace-nowrap px-4 py-2">
        <div className="h-6 bg-gray-200 rounded-lg w-3/4"></div>
      </td>
      <td className="whitespace-nowrap px-4 py-2">
        <div className="h-6 bg-gray-200 rounded-lg w-3/4"></div>
      </td>
      <td className="whitespace-nowrap px-4 py-2">
        <div className="h-6 bg-gray-200 rounded-lg w-3/4"></div>
      </td>
      <td className="whitespace-nowrap px-4 py-2">
        <div className="h-6 bg-gray-200 rounded-lg w-1/2"></div>
      </td>
      <td className="whitespace-nowrap px-10 py-2">
        <div className="h-6 bg-gray-200 rounded-lg w-full"></div>
      </td>
      <td className="whitespace-nowrap px-4 py-2">
        <div className="h-6 bg-gray-200 rounded-lg w-full"></div>
      </td>
      <td className="whitespace-nowrap px-4 py-2">
        <div className="h-10 bg-gray-200 rounded-lg w-16"></div>
      </td>
      <td className="whitespace-nowrap px-4 py-2">
        <div className="h-10 bg-gray-200 rounded-lg w-16"></div>
      </td>
      <td className="whitespace-nowrap px-4 py-2">
        <div className="h-10 bg-gray-200 rounded-lg w-16"></div>
      </td>
    </tr>
  );
}

export default SkeletonRow;