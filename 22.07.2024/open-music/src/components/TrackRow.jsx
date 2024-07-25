import React from "react";
import { NavLink } from "react-router-dom";
import { FaEye, FaExternalLinkAlt } from "react-icons/fa";
import FavoriteButton from "./FavoriteButton"; // Importa il pulsante dei preferiti
import EditTrackButton from "./EditTrackButton";

function TrackRow({ track }) {
  return (
    <tr>
      <td className="whitespace-nowrap px-4 py-2">{track.title}</td>
      <td className="whitespace-nowrap px-4 py-2">{track.artist}</td>
      <td className="whitespace-nowrap px-4 py-2">{track.album}</td>
      <td className="whitespace-nowrap px-4 py-2">{track.genre}</td>
      <td className="whitespace-nowrap px-4 py-2">{track.releaseDate}</td>
      {/* <td className="whitespace-nowrap px-4 py-2">{track.id}</td> */}
      <td className="whitespace-nowrap px-10 py-2">
        <a
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          <FaExternalLinkAlt size={20} />
        </a>
      </td>
      <td className="whitespace-nowrap pr-5 py-2 text-center">
        {track.duration}
      </td>
      <td className="whitespace-nowrap  py-2">
        <NavLink
          to={`/track/${track.id}`}
          className="btn btn-primary flex items-center bg-violet-200 pl-3 py-1 rounded-md"
        >
          <FaEye className="mr-2" />
          View
        </NavLink>
      </td>
      <td className="whitespace-nowrap flex gap-8 px-4 py-2">
        <EditTrackButton trackId={track.id} size={10} />
      </td>
      <td className="whitespace-nowrap px-6 py-2">
        <FavoriteButton track={track} size={10} />
      </td>
    </tr>
  );
}

export default TrackRow;
