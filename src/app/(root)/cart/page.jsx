"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const discounts = [
  { code: "a45c7e", discount: 20 },
  { code: "bz78wx", discount: 25 },
  { code: "hg569a", discount: 10 },
];

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useCart();
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Login state
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      router.push("/user/checkout");
    }
  };

  const updateQty = (item, delta) => {
  const newQty = Math.max(1, item.quantity + delta);
  updateCartQuantity(item._id, item.selectedType, item.selectedColor, newQty);
};


  const handlePromo = () => {
    const found = discounts.find((d) => d.code === promo.trim().toLowerCase());
    if (found) {
      setDiscount(found.discount);
    } else {
      setDiscount(0);
      alert("Invalid promo code");
    }
  };

  useEffect(() => setDiscount(0), [promo]);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/me", { credentials: "include" });
        const data = await res.json();
        setIsLoggedIn(!!data.user);
      } catch {
        setIsLoggedIn(false);
      }
    }
    checkAuth();
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      showLoginModal || showConfirmModal ? "hidden" : "auto";
  }, [showLoginModal, showConfirmModal]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setShowLoginModal(false);
        setShowConfirmModal(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        window.dispatchEvent(new Event("userLogin"));
        setIsLoggedIn(true);
        setShowLoginModal(false);
        router.push("/user/checkout");
      } else {
        setLoginError(data.message || "Login failed");
      }
    } catch {
      setLoginError("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.productPrice * item.quantity,
    0
  );
  const shipping = subtotal >= 5500 ? 0 : 120;
  const totalBeforeDiscount = subtotal + shipping;
  const total = totalBeforeDiscount * (1 - discount / 100);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 md:px-12 lg:px-20">
        <p className="text-lg font-semibold mb-4">Your cart is empty 🛒</p>
        <Link
          href="/"
          className="px-4 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="h-auto px-4 md:px-12 lg:px-20 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-10">
        {/* Cart Section */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Shopping Cart</h2>
            <h3 className="text-gray-600">
              {cart.length} {cart.length === 1 ? "Item" : "Items"}
            </h3>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto border rounded-lg shadow-sm">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-left">Quantity</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Total</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  console.log(item, "cart Items With Products")

                  return (
                    <tr
                      key={item._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.images?.[0]}
                            alt={item.productName}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">{item.productName}</p>
                            <p className="text-sm text-gray-500">
                              {item.category}
                            </p>
                            {item.selectedType && (
                              <p className="text-sm text-gray-600">
                                Type: {item.selectedType}
                              </p>
                            )}
                            {item.selectedColor && (
                              <p className="text-sm text-gray-600">
                                Color: {item.selectedColor}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <button
                            className="px-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                            onClick={() => updateQty(item, -1)}
                          >
                            −
                          </button>
                          <span className="mx-3">{item.quantity}</span>
                          <button
                            className="px-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                            onClick={() => updateQty(item, 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3">{item.productPrice} tk</td>
                      <td className="px-4 py-3 font-semibold">
                        {item.productPrice * item.quantity} tk
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => removeFromCart(item._id, item.selectedType, item.selectedColor)}
                          className="text-red-500 underline text-sm hover:text-red-700 transition"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden grid gap-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-white p-3 rounded-lg shadow-sm flex gap-3"
              >
                <img
                  src={item.images?.[0]}
                  alt={item.productName}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.productName}</p>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  {item.selectedType && (
                    <p className="text-sm text-gray-600">
                      Type: {item.selectedType}
                    </p>
                  )}
                  {item.selectedColor && (
                    <p className="text-sm text-gray-600">
                      Color: {item.selectedColor}
                    </p>
                  )}

                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => updateQty(item._id, -1)}
                      className="px-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                    >
                      −
                    </button>
                    <span className="mx-3">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item._id, 1)}
                      className="px-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                    >
                      +
                    </button>
                  </div>

                  <p className="mt-2 font-semibold">
                    {item.productPrice * item.quantity} tk
                  </p>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-blue-500 underline text-sm mt-1 hover:text-blue-700 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="bg-gray-100 h-fit p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="flex justify-between py-1">
            <span>Items ({cart.length})</span>
            <span>{subtotal.toFixed(2)} tk</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Shipping</span>
            <span>{shipping.toFixed(2)} tk</span>
          </div>

          {/* Promo Code */}
          <div className="my-4">
            <label htmlFor="promo" className="text-sm font-medium">
              Promo Code
            </label>
            <div className="flex mt-1">
              <input
                type="text"
                id="promo"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                className="flex-1 border border-gray-400 px-2 py-1 rounded-l-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                onClick={handlePromo}
                className="bg-red-500 px-3 rounded-r-md text-white hover:bg-red-600 transition"
              >
                Apply
              </button>
            </div>
          </div>

          <div className="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{total.toFixed(2)} tk</span>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Checkout
          </button>

          {cart.length > 0 && (
            <button
              onClick={() => setShowConfirmModal(true)}
              className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>
      <Link
        href="/"
        className="px-4 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition"
      >
        Continue Shopping
      </Link>

      {/* Login Modal */}
      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <h2 className="text-xl font-semibold mb-4">Login Required</h2>
          {loginError && <p className="text-red-500 mb-3">{loginError}</p>}
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <button
            className="w-full bg-gray-300 hover:bg-gray-400 py-2 rounded-md mt-3"
            onClick={() => setShowLoginModal(false)}
          >
            Cancel
          </button>
        </Modal>
      )}

      {/* Clear Cart Modal */}
      {showConfirmModal && (
        <Modal onClose={() => setShowConfirmModal(false)}>
          <h2 className="text-xl font-semibold mb-4 text-center">
            Clear Cart?
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Are you sure you want to remove all items from your cart?
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                clearCart();
                setShowConfirmModal(false);
              }}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
            >
              Yes, Clear
            </button>
            <button
              onClick={() => setShowConfirmModal(false)}
              className="flex-1 bg-gray-300 hover:bg-gray-400 py-2 rounded-md"
            >
              No, Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// Modal wrapper component for reuse
const Modal = ({ children, onClose }) => (
  <div
    className="fixed inset-0 bg-[#000000cb] flex items-center justify-center z-50 px-4"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative max-h-[80vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  </div>
);
