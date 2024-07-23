import React from "react";

// Componente per una singola riga della tabella delle tracce
const TrackRow = ({ track }) => (
  <tr key={track.id}>
    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
      {track.title}
    </td>
    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
      {track.artist}
    </td>
    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{track.album}</td>
    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{track.genre}</td>
    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
      {track.releaseDate}
    </td>
    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{track.id}</td>
    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
      <a href={track.url} target="_blank" rel="noopener noreferrer">
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
);

export default TrackRow;
