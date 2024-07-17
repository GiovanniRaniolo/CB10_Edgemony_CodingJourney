// src/components/Layout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 p-4 text-white flex justify-between">
        <Link to="/" className="text-2xl pl-6">
          FakeStore
        </Link>
        <Link
          to="/cart"
          className="text-2xl bg-slate-200 rounded-full p-1 mr-6"
        >
          🛒
        </Link>
      </header>
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
