"use client";
import React, { useState, useEffect, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { CartContext } from "../../../context/CartContext";
import { Product } from "../../../types";

const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart } = useContext(CartContext);

  // Verifica che productId sia una stringa
  const id = Array.isArray(productId) ? productId[0] : productId;

  // Tipizza lo stato product e products
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  if (!product) return <div>Loading...</div>;

  const currentIndex = products.findIndex((p) => p.id === parseInt(id));
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
        <h2 className="text-3xl font-bold mt-4">{product.title}</h2>
        <p className="text-lg mt-2">${product.price}</p>
        <button
          onClick={() => addToCart(product)}
          className="bg-green-600 text-white px-4 py-2 rounded mt-4"
        >
          Add to Cart
        </button>
        <p className="text-lg mt-4">{product.description}</p>
        <div className="flex mt-4">
          {prevProduct && (
            <button
              onClick={() => router.push(`/product/${prevProduct.id}`)}
              className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
            >
              Previous
            </button>
          )}
          {nextProduct && (
            <button
              onClick={() => router.push(`/product/${nextProduct.id}`)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
