import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 p-4 text-white flex items-center justify-between">
        <NavLink
          to="/"
          exact
          className={({ isActive }) =>
            isActive ? "text-2xl pl-6 font-bold" : "text-2xl pl-6"
          }
        >
          FakeStore
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive
              ? "text-2xl bg-green-100 rounded-full p-1 mr-6 border-2 border-red-400"
              : "text-2xl bg-slate-200 rounded-full p-1 mr-6"
          }
        >
          🛒
        </NavLink>
      </header>
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
