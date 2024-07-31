import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import DefaultLayout from "./components/DefaultLayout";
import TrackDetailPage from "./pages/TrackDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import AddTrackPage from "./pages/AddTrackPage";
import EditTrackPage from "./pages/EditTrackPage";
import ErrorPage from "./pages/ErrorPage";
import { FilterProvider } from "./context/FilterContext";
import { FavoriteProvider } from "./context/FavoriteContext";
import { ToastProvider } from "./context/ToastContext";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/playlist",
        element: <div>Playlist Page</div>,
      },
      {
        path: "/favorites",
        element: <FavoritesPage />,
      },
      {
        path: "/track/:id",
        element: <TrackDetailPage />,
      },
      {
        path: "/add-track",
        element: <AddTrackPage />,
      },
      {
        path: "/edit-track/:trackId",
        element: <EditTrackPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FilterProvider>
      <FavoriteProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </FavoriteProvider>
    </FilterProvider>
  </React.StrictMode>
);
