# FakeStore

FakeStore is an e-commerce web application built using the following technologies:

- **React.js** for the front-end framework.
- **React Router** for navigation and routing.
- **Tailwind CSS** for styling.
- **React Toastify** for user notifications.

![screenshot](./public/screenshot.png)

## Features

- **Product Browsing**: View a grid of products fetched from an external API.
- **Shopping Cart**: Add products to the cart and view/manage them.
- **Product Details**: View detailed information about a specific product and navigate to previous or next product details.
- **Notifications**: Get informed via toast notifications when actions like adding to the cart are performed.
- **Error Handling**: Display user-friendly error messages for route errors.

## Table of Contents

1.  [Components](#components)
    - [Main.jsx](#mainjsx)
    - [Layout.jsx](#layoutjsx)
    - [Home.jsx](#homexsx)
    - [ProductDetail.jsx](#productdetailjsx)
    - [Cart.jsx](#cartjsx)
    - [ErrorPage.jsx](#errorpagejsx)
2.  [Conclusion](#conclusion)

## Components

### Main.jsx

This is the entry point of the application, where routing is defined and the application is rendered.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
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
      {
        path: "product/:productId",
        element: <ProductDetail />,
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

#### Explanation:

- **Imports**:

  - Core React and ReactDOM libraries.
  - Routing functionalities from React Router.
  - Custom components.
  - ToastContainer from React Toastify for notifications.
  - CSS styles.

- **Router Creation**:

  - Defines the routing structure using `createBrowserRouter`.
  - Specifies the layout and error handling components.
  - Configures child routes for home, cart, and product details.

- **Rendering**:

  - Creates the root of the React application.
  - Uses `RouterProvider` to supply the router configuration.
  - Includes `ToastContainer` to manage global notifications.

### Layout.jsx

Defines the main structure of the application, including the header and the placeholder for child components.

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

#### Explanation:

- **Imports**:

  - React for component creation.
  - `Link` and `Outlet` from React Router for navigation and nested routing.

- **Layout Component**:

  - Defines a header with links to the home page and cart.
  - `Outlet` serves as a placeholder for child components defined in the routes.

### Home.jsx

Displays a grid of product cards fetched from an external API and allows users to add products to the cart.

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

#### Explanation:

- **Imports**:

  - React and hooks (`useState`, `useEffect`).
  - `toast` from React Toastify for notifications.

- **Home Component**:

  - **State Management**: Uses `useState` to store products.
  - **Side Effects**: Uses `useEffect` to fetch products from an API on component mount.
  - **addToCart**:
    - Adds the selected product to the cart stored in `localStorage`.
    - Displays a success notification using `toast`.
  - **Rendering**:
    - Maps the fetched products to a grid of product cards.
    - Each card displays the product image, title, description, price, and an "Add to Cart" button.

### ProductDetail.jsx

Displays detailed information about a specific product and allows navigation to previous or next product details.

```jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [productId]);

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

  if (!product) {
    return <div>Loading...</div>;
  }

  const currentIndex = products.findIndex((p) => p.id === parseInt(productId));
  const prevProduct = currentIndex > 0 ? products[currentIndex - 1] : null;
  const nextProduct =
    currentIndex < products.length - 1 ? products[currentIndex + 1] : null;

  return (
    <div className="p-4">
      <div className="border p-4 rounded shadow flex flex-col items-center px-80 bg-slate-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-56 h-56 object-cover"
        />
        <h2 className="text-2xl text-blue-600 mt-2">{product.title}</h2>
        <p className="text-gray-700">{product.description}</p>
        <div className="flex items-center justify-between gap-10 mt-4">
          <p className="text-2xl font-bold">${product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded self-end"
          >
            Add to Cart
          </button>
        </div>
        <div className="flex justify-between w-full mt-4">
          {prevProduct && (
            <button
              onClick={() => navigate(`/product/${prevProduct.id}`)}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              ← Previous
            </button>
          )}
          {nextProduct && (
            <button
              onClick={() => navigate(`/product/${nextProduct.id}`)}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
```

#### Explanation:

- **Imports**:

  - React and hooks (`useState`, `useEffect`).
  - `useParams` and `useNavigate` from React Router for routing and navigation.
  - `toast` from React Toastify for notifications.

- **ProductDetail Component**:

  - **State Management**: Uses `useState` to store the current product and the list of all products.
  - **Side Effects**:
    - Uses `useEffect` to fetch details of the current product based on `productId` from the URL.
    - Uses another `useEffect` to fetch the list of all products for navigation purposes.
  - **addToCart**:
    - Adds the selected product to the cart stored in `localStorage`.
    - Displays a success notification using `toast`.
  - **Navigation**:
    - Calculates the current, previous, and next product indices.
    - Provides buttons for navigating to the previous and next products.
  - **Rendering**:
    - Displays product details including image, title, description, and price.
    - Provides "Add to Cart" and navigation buttons.

### Cart.jsx

Shows a list of products currently in the cart and allows users to remove items from the cart.

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

#### Explanation:

- **Imports**:

  - React and hooks (`useEffect`, `useState`).

- **Cart Component**:

  - **State Management**: Uses `useState` to store the products in the cart.
  - **Side Effects**: Uses `useEffect` to retrieve cart products from `localStorage` on component mount.
  - **removeFromCart**:
    - Removes a product from the cart based on its index.
    - Updates the cart in the `localStorage`.
  - **Rendering**:
    - Displays a message if the cart is empty.
    - Maps cart products to a grid of product cards.
    - Each card displays the product image, title, price, and a "Remove" button.

### ErrorPage.jsx

Handles route errors and displays a user-friendly error message with a link to return to the home page.

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

#### Explanation:

- **Imports**:

  - `useRouteError` from React Router to get the current route error.

- **ErrorPage Component**:

  - Retrieves the error using `useRouteError`.
  - Logs the error to the console.
  - Displays an error message with details.
  - Provides a link to go back to the home page.

## Conclusion

This e-commerce project demonstrates the capabilities of React.js for building dynamic web applications. By utilizing React Router for navigation, Tailwind CSS for responsive styling, and React Toastify for user notifications, the project effectively integrates modern frontend technologies.

### Key Takeaways:

- **Component Structure**: The interaction between components like Layout, Home, Cart, ProductDetail, and ErrorPage creates a seamless user experience.
- **State Management**: The use of `useState` and `useEffect` hooks for managing local state and interacting with `localStorage` for persistent data storage.
- **Error Handling**: Handling route errors gracefully using `useRouteError` from React Router and providing a fallback page to guide users.

This application serves as a solid foundation for more advanced e-commerce features and showcases effective frontend development practices.
