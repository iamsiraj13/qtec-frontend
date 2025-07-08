import { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import { CartContext } from "../context/CartContext";
import axios from "axios";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container max-w-7xl mx-auto p-4 flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        {products.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="border-0 bg-gradient-to-br from-yellow-50 to-gray-100 rounded-xl p-4 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
          >
            <div className="p-2">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover rounded-lg mb-4 transform hover:scale-110 transition-transform duration-300"
              />
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                {product.title}
              </h2>
              <p className="text-gray-600 font-medium mb-4">
                ৳{product.price.toFixed(2)}
              </p>
            </div>
            <button
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
            >
              Add to Cart
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
