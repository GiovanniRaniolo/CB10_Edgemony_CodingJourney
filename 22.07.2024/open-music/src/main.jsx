import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import DefaultLayout from "./components/DefaultLayout";
import TrackDetailPage from "./components/TrackDetailPage";
import FavoritesPage from "./components/FavoritesPage";
import AddTrackPage from "./components/AddTrackPage";
import EditTrackPage from "./components/EditTrackPage";
import ErrorPage from "./components/ErrorPage";
import { FilterProvider } from "./context/FilterContext";
import { FavoriteProvider } from "./context/FavoriteContext";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <ErrorPage />, // Aggiungi la gestione degli errori qui
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
        <RouterProvider router={router} />
      </FavoriteProvider>
    </FilterProvider>
  </React.StrictMode>
);
