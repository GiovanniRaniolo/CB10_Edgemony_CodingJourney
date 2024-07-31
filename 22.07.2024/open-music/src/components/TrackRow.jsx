import React from "react";
import { NavLink } from "react-router-dom";
import { FaEye, FaExternalLinkAlt } from "react-icons/fa";
import FavoriteButton from "./FavoriteButton"; // Importa il pulsante dei preferiti
import EditTrackButton from "./EditTrackButton";
import { format } from "date-fns"; // Importa la funzione di formattazione

function TrackRow({ track }) {
  const formatDate = (date) => {
    if (!date) return "";
    return format(new Date(date), "yyyy-MM-dd"); // Modifica il formato come necessario
  };

  return (
    <tr>
      <td className="whitespace-nowrap px-4 py-2 font-light text-violet-700">
        {track.title}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-light text-violet-700">
        {track.artist}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-light text-violet-700">
        {track.album}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-light text-violet-700">
        {track.genre}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-light text-violet-700">
        {formatDate(track.releaseDate)}
      </td>
      <td className="whitespace-nowrap px-10 py-2 font-light">
        <a
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-violet-400 hover:text-violet-700"
        >
          <FaExternalLinkAlt size={18} />
        </a>
      </td>
      {/* <td className="whitespace-nowrap pr-5 py-2 text-center font-light">
        {track.duration}
      </td> */}
      <td className="whitespace-nowrap  py-2">
        <NavLink
          to={`/track/${track.id}`}
          className="font-light text-violet-700 btn btn-primary flex items-center bg-violet-200 hover:bg-violet-300 pl-4 py-1 rounded-md"
        >
          <FaEye className="mr-2" />
          View
        </NavLink>
      </td>
      <td className="whitespace-nowrap flex gap-8 px-5 py-2">
        <EditTrackButton trackId={track.id} size={10} />
      </td>
      <td className="whitespace-nowrap px-8 py-2">
        <FavoriteButton track={track} size={10} />
      </td>
    </tr>
  );
}

export default TrackRow;
