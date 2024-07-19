import { NavLink, Outlet } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../CartContext";

const Layout = () => {
  const { cart } = useContext(CartContext);
  const cartItemCount = cart.length;

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
        <div className="relative">
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "text-2xl bg-green-100 rounded-full p-1 mr-6 border-2 border-orange-500"
                : "text-2xl bg-slate-200 rounded-full p-1 mr-6"
            }
          >
            🛒
          </NavLink>
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-16 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white bg-orange-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
              {cartItemCount}
            </span>
          )}
        </div>
      </header>
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
