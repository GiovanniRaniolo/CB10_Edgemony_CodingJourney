import { NavLink } from "react-router-dom";
import { navLabels } from "../data/labels";
import Filter from "./Filter";

function Header() {
  return (
    <div className="navbar bg-base-100 flex justify-between items-center px-6 py-2 bg-violet-950 text-violet-100">
      <NavLink to="/" className="text-xl font-bold">
        {navLabels.openMusic}
      </NavLink>
      <div className="flex items-center gap-8">
        <Filter />
        <NavLink
          to="/all"
          className={({ isActive }) =>
            `btn btn-ghost ${isActive ? "font-bold underline" : ""}`
          }
        >
          {navLabels.all}
        </NavLink>
        <NavLink
          to="/playlist"
          className={({ isActive }) =>
            `btn btn-ghost ${isActive ? "font-bold underline" : ""}`
          }
        >
          {navLabels.playlist}
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `btn btn-ghost ${isActive ? "font-bold underline" : ""}`
          }
        >
          {navLabels.favorites}
        </NavLink>
        <NavLink
          to="/add-track"
          className={({ isActive }) =>
            `pl-20 btn btn-ghost ${isActive ? "font-bold underline" : ""}`
          }
        >
          {navLabels.add}
        </NavLink>
      </div>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              className="rounded-full"
              alt="User avatar"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
