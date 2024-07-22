import { trackLabels } from "./data/labels";
import { useEffect, useState } from "react";
import { getTrackList } from "./api/trackClient"; // Modifica per adattare al nuovo client API

function App() {
  const [trackList, setTrackList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTracks = async () => {
    try {
      const data = await getTrackList(); // Modifica per adattare al nuovo client API
      setTrackList(data);
    } catch (error) {
      console.log("Error fetching track list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTracks();
  }, []);

  useEffect(() => {
    console.log(trackList);
  }, [trackList]);

  if (isLoading) return <p>Loading tracks...</p>;

  return (
    <>
      <div className="flex justify-center">
        <main className="w-[1200px] ">
          <div className="p-4 ">
            <h1 className="text-2xl font-semibold">{trackLabels.listTitle}</h1>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {trackLabels.trackTableTitle}
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {trackLabels.trackTableArtist}
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {trackLabels.trackTableAlbum}
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {trackLabels.trackTableGenre}
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {trackLabels.trackTableReleaseDate}
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {trackLabels.trackTableId}
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {trackLabels.trackTableUrl}
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {trackLabels.trackTableDuration}
                  </th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {trackList.map((track) => (
                  <tr key={track.id}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {track.title}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {track.artist}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {track.album}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {track.genre}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {track.releaseDate}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {track.id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <a
                        href={track.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {track.url}
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {track.duration}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <a
                        href="#"
                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
