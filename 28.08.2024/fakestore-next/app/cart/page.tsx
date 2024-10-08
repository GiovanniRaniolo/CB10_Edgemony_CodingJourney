"use client";

import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div className="p-4">
      <h2 className="text-2xl text-center mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-xl text-center">Your cart is empty</p>
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
              <h2 className="text-xl mt-2">{product.title}</h2>
              <p className="text-lg font-bold">${product.price}</p>
              <button
                onClick={() => removeFromCart(index)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
