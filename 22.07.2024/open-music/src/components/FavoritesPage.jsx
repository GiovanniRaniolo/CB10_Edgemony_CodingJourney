import React from "react";
import { useFavorites } from "../context/FavoriteContext";
import TrackRow from "./TrackRow";
import { trackLabels } from "../data/labels";

function FavoritesPage() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return <p>No favorite tracks.</p>;
  }

  return (
    <div className="flex justify-center">
      <main className="w-[1200px]">
        <div className="p-4">
          <h1 className="text-2xl font-semibold">{trackLabels.favorites}</h1>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-left">
              <tr>
                {Object.keys(trackLabels).map((key) => (
                  <th
                    key={key}
                    className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                  >
                    {trackLabels[key]}
                  </th>
                ))}
                <th className="px-4 py-2"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {favorites.map((track) => (
                <TrackRow key={track.id} track={track} />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default FavoritesPage;