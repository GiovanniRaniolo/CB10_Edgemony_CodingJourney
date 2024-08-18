import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import DefaultLayout from "./components/DefaultLayout";
import TrackDetailPage from "./pages/TrackDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import AddTrackPage from "./pages/AddTrackPage";
import EditTrackPage from "./pages/EditTrackPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage"; // Importa SignUpPage
import { FilterProvider } from "./context/FilterContext";
import { FavoriteProvider } from "./context/FavoriteContext";
import { ToastProvider } from "./context/ToastContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./index.css";

const auth = getAuth();

const ProtectedRoute = ({ element }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? element : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all",
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
        element: <ProtectedRoute element={<AddTrackPage />} />,
      },
      {
        path: "/edit-track/:trackId",
        element: <ProtectedRoute element={<EditTrackPage />} />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />, // Aggiungi la rotta per SignUpPage
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
