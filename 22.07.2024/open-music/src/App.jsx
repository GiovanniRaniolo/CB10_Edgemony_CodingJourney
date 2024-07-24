import { useEffect, useState } from "react";
import { trackLabels } from "./data/labels";
import { getTrackList } from "./api/trackClient";
import TrackRow from "./components/TrackRow";
import SkeletonLoader from "./components/SkeletonLoader";
import ErrorPage from "./components/ErrorPage";
import { useFilter } from "./context/FilterContext";

function App() {
  const [trackList, setTrackList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { filterText } = useFilter();

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

  const filteredTrackList = trackList.filter((track) => {
    const lowercasedFilter = filterText.toLowerCase();
    return (
      track.title.toLowerCase().includes(lowercasedFilter) ||
      track.artist.toLowerCase().includes(lowercasedFilter) ||
      track.album.toLowerCase().includes(lowercasedFilter) ||
      track.genre.toLowerCase().includes(lowercasedFilter)
    );
  });

  useEffect(() => {
    getTracks();
  }, []);

  if (isLoading) return <SkeletonLoader />;
  if (error)
    return <ErrorPage message={`Error loading tracks: ${error.message}`} />;

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
              {filteredTrackList.map((track) => (
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
