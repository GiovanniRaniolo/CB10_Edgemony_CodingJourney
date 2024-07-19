import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "./Modal";
import { CartContext } from "../CartContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border p-4 rounded shadow flex flex-col justify-between items-center bg-slate-100 h-full"
          onClick={() => setSelectedProduct(product)}
        >
          <img
            src={product.image}
            alt={product.title}
            className=" w-36 h-70 object-cover"
          />
          <div className="flex-grow flex flex-col justify-around">
            <h2 className="text-xl font-bold mt-2 text-center">
              {product.title}
            </h2>
            <p className="text-gray-700 text-center">{product.description}</p>
          </div>
          <div className="flex items-center gap-14 mt-4 pt-4 border-t border-gray-300">
            <p className="text-lg font-bold">${product.price}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded"
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
                onClick={() => handleAddToCart(selectedProduct)}
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
