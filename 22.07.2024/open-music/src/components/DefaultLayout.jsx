import { Outlet } from "react-router-dom";
import Header from "./Header";
import FooterPlayer from "./FooterPlayer";
import { PlayerProvider } from "../context/PlayerContext";

function DefaultLayout({ onFilterChange }) {
  return (
    <PlayerProvider>
      <Header onFilterChange={onFilterChange} />
      <div className="p-4">
        <Outlet />
      </div>
      <FooterPlayer />
    </PlayerProvider>
  );
}

export default DefaultLayout;
