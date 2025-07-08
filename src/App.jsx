import { Routes, Route, Link } from "react-router";
import { useContext, useState } from "react";
import { CartContext } from "./context/CartContext";
import HomePage from "./components/HomePage";
import ProductDetailPage from "./components/ProductDetailPage";
import CartSidebar from "./components/CartSidebar";
import CheckoutModal from "./components/CheckoutModal";

function App() {
  const { cart } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <div>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between">
          <Link to="/" className="text-2xl font-bold">
            E-Shop
          </Link>
          <button
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setShowCart(true)}
          >
            Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </button>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
      {showCart && (
        <CartSidebar
          setShowCart={setShowCart}
          setShowCheckout={setShowCheckout}
          className={`transition-all bg-white duration-300 ${
            showCart ? "translate-x-0" : "translate-x-full"
          } `}
        />
      )}
      {showCheckout && <CheckoutModal setShowCheckout={setShowCheckout} />}
    </div>
  );
}

export default App;
