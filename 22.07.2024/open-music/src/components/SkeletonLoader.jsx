import React from "react";
import SkeletonRow from "./SkeletonRow";

function SkeletonLoader() {
  const skeletonRows = Array.from({ length: 10 }).map((_, index) => (
    <SkeletonRow key={index} />
  ));

  return (
    <div className="flex justify-center">
      <main className="w-[1200px]">
        <div className="p-4">
          <h1 className="text-2xl font-semibold">Loading...</h1>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-left">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Title
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Artist
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Album
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Genre
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Release Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  URL
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Duration
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  View
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Edit
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Favorite
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">{skeletonRows}</tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default SkeletonLoader;
