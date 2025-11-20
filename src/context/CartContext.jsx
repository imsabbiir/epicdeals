"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart considering type & color
  const addToCart = (product) => {
    const exists = cart.find(
      (item) =>
        item._id === product._id &&
        item.selectedType === product.selectedType &&
        item.selectedColor === product.selectedColor
    );

    if (!exists) {
      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      setCart(
        cart.map((item) =>
          item._id === product._id &&
          item.selectedType === product.selectedType &&
          item.selectedColor === product.selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    }
  };

  // Remove item considering type & color
  const removeFromCart = (_id, selectedType, selectedColor) => {
  setCart(
    cart.filter(
      (item) =>
        !(
          item._id === _id &&
          item.selectedType === selectedType &&
          item.selectedColor === selectedColor
        )
    )
  );
};


  // Clear all items
  const clearCart = () => setCart([]);

  // Update quantity considering type & color
const updateCartQuantity = (_id, selectedType, selectedColor, quantity) => {
  setCart(
    cart.map((item) =>
      item._id === _id &&
      item.selectedType === selectedType &&
      item.selectedColor === selectedColor
        ? { ...item, quantity }
        : item
    )
  );
};

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, updateCartQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
