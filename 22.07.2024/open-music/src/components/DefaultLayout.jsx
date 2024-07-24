import { Outlet } from "react-router-dom";
import Header from "./Header";

function DefaultLayout({ onFilterChange }) {
  return (
    <div>
      <Header onFilterChange={onFilterChange} />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default DefaultLayout;
