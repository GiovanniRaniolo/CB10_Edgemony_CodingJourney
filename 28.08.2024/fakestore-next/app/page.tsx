"use client";

import React, { useEffect, useState } from "react";
import { Product } from "../types";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border p-4 rounded shadow flex flex-col"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover"
          />
          <h2 className="text-xl mt-2">{product.title}</h2>
          <p className="text-lg font-bold">${product.price}</p>
          <a
            href={`/product/${product.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
          >
            View Details
          </a>
        </div>
      ))}
    </div>
  );
};

export default Home;
