import React from "react";

function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      <td className="whitespace-nowrap px-4 py-2">
        <div className="h-6 bg-gray-200 rounded-lg w-32"></div>
      </td>
      <td className="whitespace-nowrap px-4 py-2">
        <div className="h-6 bg-gray-200 rounded-lg w-32"></div>
      </td>
      <td className="whitespace-nowrap px-4 py-2">
        <div className="h-6 bg-gray-200 rounded-lg w-32"></div>
      </td>
      <td className="whitespace-nowrap px-4 py-2">
        <div className="h-6 bg-gray-200 rounded-lg w-24"></div>
      </td>
      <td className="whitespace-nowrap px-4 py-2">
        <div className="h-6 bg-gray-200 rounded-lg w-20"></div>
      </td>
      <td className="whitespace-nowrap px-10 py-2">
        <div className="flex items-center justify-center">
          <div className="h-6 bg-gray-200 rounded-full w-10"></div>
        </div>
      </td>
      <td className="whitespace-nowrap py-2">
        <div className="h-6 bg-gray-200 rounded-lg w-20"></div>
      </td>
      <td className="whitespace-nowrap flex gap-8 px-5 py-2">
        <div className="h-6 bg-gray-200 rounded-full w-6"></div>
      </td>
      <td className="whitespace-nowrap px-8 py-2">
        <div className="h-6 bg-gray-200 rounded-full w-6"></div>
      </td>
    </tr>
  );
}

export default SkeletonRow;
