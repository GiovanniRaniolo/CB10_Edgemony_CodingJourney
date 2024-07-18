import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "./Modal";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
          onClick={() => setSelectedProduct(product)}
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
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded self-end"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
      {selectedProduct && (
        <Modal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        >
          <div className="flex flex-col items-center">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="w-48 h-48 object-cover"
            />
            <h2 className="text-xl mt-2">{selectedProduct.title}</h2>
            <p className="text-gray-700">{selectedProduct.description}</p>
            <p className="text-lg font-bold">${selectedProduct.price}</p>
            <div className="flex mt-4">
              <Link
                to={`/product/${selectedProduct.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
              >
                View Details
              </Link>
              <button
                onClick={() => addToCart(selectedProduct)}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Home;
