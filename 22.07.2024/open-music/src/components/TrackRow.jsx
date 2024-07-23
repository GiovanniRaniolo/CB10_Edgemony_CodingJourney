import { NavLink } from "react-router-dom";
import { FaEye } from "react-icons/fa";

function TrackRow({ track }) {
  return (
    <tr>
      <td className="whitespace-nowrap px-4 py-2">{track.title}</td>
      <td className="whitespace-nowrap px-4 py-2">{track.artist}</td>
      <td className="whitespace-nowrap px-4 py-2">{track.album}</td>
      <td className="whitespace-nowrap px-4 py-2">{track.genre}</td>
      <td className="whitespace-nowrap px-4 py-2">{track.releaseDate}</td>
      <td className="whitespace-nowrap px-4 py-2">{track.id}</td>
      <td className="whitespace-nowrap px-4 py-2">{track.url}</td>
      <td className="whitespace-nowrap px-4 py-2">{track.duration}</td>
      <td className="whitespace-nowrap px-4 py-2">
        <NavLink
          to={`/track/${track.id}`}
          className="btn btn-primary flex items-center"
        >
          <FaEye className="mr-2" />
          View
        </NavLink>
      </td>
    </tr>
  );
}

export default TrackRow;
