import React from "react";
import SkeletonRow from "./SkeletonRow";
import { trackLabels } from "../data/labels";

function SkeletonLoader() {
  const skeletonRows = Array.from({ length: 10 }).map((_, index) => (
    <SkeletonRow key={index} />
  ));

  return (
    <div className="flex justify-center">
      <main className="w-[1400px]">
        <div className="p-4">
          {/* <h1 className="text-2xl font-semibold">Loading...</h1> */}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-left">
              <tr>
                {Object.values(trackLabels).map((label, index) => (
                  <th
                    key={index}
                    className="whitespace-nowrap px-4 py-2 font-semibold text-violet-800"
                  >
                    {label}
                  </th>
                ))}
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
