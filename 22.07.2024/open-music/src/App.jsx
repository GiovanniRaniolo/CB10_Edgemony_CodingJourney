import { useEffect, useState } from "react";
import { trackLabels } from "./data/labels";
import { getTrackList } from "./api/trackClient";
import TrackRow from "./components/TrackRow";
import SkeletonLoader from "./components/SkeletonLoader";

function App() {
  const [trackList, setTrackList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTracks = async () => {
    try {
      const data = await getTrackList();
      setTrackList(data);
    } catch (error) {
      console.log("Error fetching track list:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTracks();
  }, []);

  if (isLoading) return <SkeletonLoader />;
  if (error) return <p>Error loading tracks: {error.message}</p>;

  return (
    <div className="flex justify-center">
      <main className="w-[1200px]">
        <div className="p-4">
          <h1 className="text-2xl font-semibold">{trackLabels.listTitle}</h1>
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
              {trackList.map((track) => (
                <TrackRow key={track.id} track={track} />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;
