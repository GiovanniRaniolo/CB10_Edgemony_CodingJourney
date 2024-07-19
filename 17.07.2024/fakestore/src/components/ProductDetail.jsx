import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CartContext } from "../CartContext";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

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

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.title} added to cart!`, {
      position: "top-center",
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
            onClick={() => handleAddToCart(product)}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded self-end"
          >
            Add to Cart
          </button>
        </div>
        <div className="flex justify-evenly w-full mt-8">
          {prevProduct && (
            <button
              onClick={() => navigate(`/product/${prevProduct.id}`)}
              className="bg-gray-300 text-black text-sm px-4 py-2 rounded"
            >
              ← Previous
            </button>
          )}
          {nextProduct && (
            <button
              onClick={() => navigate(`/product/${nextProduct.id}`)}
              className="bg-gray-300 text-black text-sm px-4 py-2 rounded"
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
