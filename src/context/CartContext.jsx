/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get("https://qtec-backend-ten.vercel.app/api/cart")
      .then((response) => setCart(response.data))
      .catch((error) => console.error("Error fetching cart:", error));
  }, []);

  const addToCart = (product) => {
    axios
      .post("https://qtec-backend-ten.vercel.app/api/cart", product)
      .then((response) => setCart(response.data))
      .catch((error) => console.error("Error adding to cart:", error));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity >= 1) {
      axios
        .put(`https://qtec-backend-ten.vercel.app/api/cart/${id}`, { quantity })
        .then((response) => setCart(response.data))
        .catch((error) => console.error("Error updating cart:", error));
    }
  };

  const removeFromCart = (id) => {
    axios
      .delete(`https://qtec-backend-ten.vercel.app/api/cart/${id}`)
      .then((response) => setCart(response.data))
      .catch((error) => console.error("Error removing from cart:", error));
  };
  const clearCart = () => {
    axios
      .delete("https://qtec-backend-ten.vercel.app/api/cart")
      .then(() => setCart([]))
      .catch((error) => console.error("Error clearing cart:", error));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, clearCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
