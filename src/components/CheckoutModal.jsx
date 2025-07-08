import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

function CheckoutModal({ setShowCheckout }) {
  const { clearCart } = useContext(CartContext);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address) {
      setError("All fields are required.");
      return;
    }
    clearCart();
    alert("Order placed successfully!");
    setShowCheckout(false);
  };

  return (
    <div
      className={`fixed inset-0 bg-black  bg-opacity-50 flex items-center justify-center z-50  `}
    >
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-4"
            required
          />
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-4"
            required
          />
          <label className="block mb-2">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-4"
            required
          ></textarea>
          <div className="flex justify-between">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => setShowCheckout(false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutModal;
