import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AiOutlineClose } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";

function CartSidebar({ setShowCart, setShowCheckout, className }) {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
      className={`fixed right-0 top-0 h-full w-full max-w-[450px]  shadow-xl border-l-2 border-gray-200 p-6 z-50   ${className}`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Cart</h2>
        <button
          className="text-red-500 cursor-pointer hover:text-red-700 mb-6 flex items-center"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineClose className="mr-2" /> Close
        </button>
      </div>
      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty</p>
      ) : (
        <div className="max-h-[calc(100vh-100px)] overflow-y-auto">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-4 p-4 bg-gray-50 rounded-lg shadow-md"
            >
              <div>
                <p className="text-lg font-medium text-gray-700">
                  {item.title}
                </p>
                <p className="text-gray-500">
                  ৳{item.price.toFixed(2)} x {item.quantity}
                </p>
                <button
                  className="text-red-500 cursor-pointer text-md hover:text-red-700 mt-2 flex items-center"
                  onClick={() => removeFromCart(item.id)}
                >
                  <MdDelete className="mr-1" /> Remove
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <FaMinus />
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button
                  className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg shadow-md">
            <p className="text-xl font-bold text-gray-800">
              Total: ৳{total.toFixed(2)}
            </p>
          </div>
          <button
            className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-200"
            onClick={() => setShowCheckout(true)}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default CartSidebar;
