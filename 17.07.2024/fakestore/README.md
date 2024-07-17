# FakeStore

This project is an e-commerce web application built using

- React.js,
- React Router,
- Tailwind CSS,
- React Toastify.

It allows users to browse through a list of products fetched from an external API, add products to a shopping cart, and manage cart items. The application includes error handling for route errors and displays notifications using _React Toastify_.

![screenshot](./public/screenshot.png)

The main components of the project include:

- **Layout**: Defines the main structure of the application, including navigation links and a placeholder for child components.
- **Home**: Displays a grid of product cards fetched from an external API. Users can add products to the cart, which are stored locally using `localStorage`. Notifications are displayed using React Toastify when a product is added to the cart.
- **Cart**: Shows a list of products currently in the cart. Users can remove items from the cart, which updates the local storage and reflects changes immediately.
- **ErrorPage**: Handles route errors and displays a user-friendly error message with a link to return to the home page.

The project leverages Tailwind CSS for styling, providing a responsive and visually appealing user interface. React Router manages navigation within the application, ensuring seamless transitions between pages. React Toastify enhances user experience with informative notifications for cart actions.

## Table of Contents

- [Components](#components)
  - [Main.jsx](#mainjsx)
  - [Layout.jsx](#layoutjsx)
  - [Home.jsx](#homejsx)
  - [Cart.jsx](#cartjsx)
  - [ErrorPage.jsx](#errorpagejsx)
- [Conclusion](#conclusion)

## Components

### Main.jsx

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Cart from "./components/Cart";
import ErrorPage from "./components/ErrorPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  </React.StrictMode>
);
```

**Explanation:**

- **Imports:**

  - React and ReactDOM to handle rendering of React components.
  - `createBrowserRouter` and `RouterProvider` from React Router for routing.
  - Custom components: `Layout`, `Home`, `Cart`, `ErrorPage`.
  - `ToastContainer` from `react-toastify` to display notifications.
  - Basic and `react-toastify` stylesheets.

- **Router Creation:**

  - `createBrowserRouter` creates a router with route configuration.
  - The main route (`/`) uses the `Layout` component.
  - On error, `ErrorPage` will be displayed.
  - `Home` is the default component for the main route.
  - The `/cart` route uses the `Cart` component.

- **Rendering:**

  - `ReactDOM.createRoot` creates an entry point for the React application.
  - `RouterProvider` supplies the created router to the application.
  - `ToastContainer` manages global notifications.

---

### Layout.jsx

```jsx
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
```

**Explanation:**

- **Imports:**

  - React to create components.
  - `Link` and `Outlet` from React Router to navigate between pages and display child components.

- **Layout Component:**

  - Defines the main structure of the application with a header and a main section.
  - Header:
    - Contains a link to the store logo redirecting to home (`/`).
    - Contains a link to the cart (`/cart`).
  - Main:
    - `Outlet` is a placeholder for child components specified in the routes.

---

### Home.jsx

```jsx
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`${product.title} added to cart!`, {
      position: "bottom-center",
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border p-4 rounded shadow flex flex-col bg-slate-100"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover"
          />
          <h2 className="text-xl mt-2">{product.title}</h2>
          <p className="text-gray-700 flex-grow">{product.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded self-end"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
```

**Explanation:**

- **Imports:**

  - React, useState, and useEffect to manage state and side effects.
  - `toast` from `react-toastify` for notifications.

- **Home Component:**

  - `products` state to store the products.
  - `useEffect` to fetch product data from the API on the first render.
  - `addToCart`:
    - Adds a product to the cart saved in `localStorage`.
    - Displays a success notification.

- **Rendering:**

  - Maps products to create a grid of product cards.
  - Each card displays an image, title, description, price, and an "Add to Cart" button.

### Cart.jsx

```jsx
import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (index) => {
    let updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div>
      <h2 className="text-2xl text-center mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-xl text-center m-60">Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cart.map((product, index) => (
            <div
              key={index}
              className="border p-4 rounded shadow flex flex-col"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="flex-grow">
                <h2 className="text-xl mt-2">{product.title}</h2>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-lg font-bold">${product.price}</p>
                <button
                  onClick={() => removeFromCart(index)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
```

**Explanation:**

- **Imports:**

  - React, useEffect, and useState to manage state and side effects.

- **Cart Component:**

  - `cart` state to store the products in the cart.
  - `useEffect` to retrieve cart products from `localStorage` on the first render.
  - `removeFromCart`:
    - Removes a product from the cart and updates `localStorage`.

- **Rendering:**

  - Displays a message if the cart is empty.
  - Maps cart products to create a grid of product cards.
  - Each card displays an image, title, price, and a "Remove" button.

---

### ErrorPage.jsx

```jsx
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 text-red-700">
      <h1 className="text-4xl">Oops!</h1>
      <p className="text-lg mt-4">Sorry, an unexpected error has occurred.</p>
      <p className="text-sm mt-2">
        <i>{error.statusText || error.message}</i>
      </p>
      <a href="/" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Go to Home
      </a>
    </div>
  );
};

export default ErrorPage;
```

**Explanation:**

- **Imports:**

  - `useRouteError` from React Router to get the current route error.

- **ErrorPage Component:**

  - Retrieves the error using `useRouteError`.
  - Displays an error message with details.
  - Provides a link to go back to the home page.

## Conclusion

In conclusion, this e-commerce project showcases the capabilities of React.js for building dynamic web applications. By utilizing React Router for navigation, Tailwind CSS for responsive styling, and React Toastify for user notifications, the project demonstrates effective integration of modern frontend technologies.

Throughout the README, you've gained insights into:

- **Component Structure**: How components like `Layout`, `Home`, `Cart`, and `ErrorPage` interact to create a seamless user experience.
- **State Management**: The use of `useState` and `useEffect` hooks to manage local state and interact with `localStorage` for persistent data storage.
- **Error Handling**: Handling route errors gracefully using `useRouteError` from React Router and providing a fallback page to guide users.
