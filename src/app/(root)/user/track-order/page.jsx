"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function TrackOrderPage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openOrder, setOpenOrder] = useState(null);

  const statusSteps = ["pending", "confirmed", "shipped", "delivered"];

  const getProgressIndex = (status) =>
    statusSteps.indexOf(status) === -1 ? 0 : statusSteps.indexOf(status);

  // Fetch current user
  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch(() => setUser(null));
  }, []);

  // Fetch orders for user
  useEffect(() => {
    if (!user?._id) return;

    setLoading(true);
    fetch(`/api/orders/${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders);
      })
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-gray-600 dark:text-gray-200">
        Loading...
      </div>
    );

  if (!user)
    return (
      <div className="text-center h-screen flex items-center justify-center text-gray-700 dark:text-gray-200">
        Please log in to view your orders.
      </div>
    );

  if (!orders.length)
    return (
      <div className="text-center h-screen flex items-center justify-center text-gray-700 dark:text-gray-200">
        You haven’t placed any orders yet.
      </div>
    );

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gray-50 dark:bg-[#1e1e28]">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100">
        Your Orders
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {orders.map((order) => {
          const progress = ((getProgressIndex(order.status) + 1) / 4) * 100;
          const isOpen = openOrder === order._id;

          return (
            <div
              key={order._id}
              className="bg-[#f2f2f2] dark:bg-[#2c2c38] shadow-sm rounded-2xl p-4 sm:p-6 transition-all duration-300"
            >
              {/* -------- CLOSED HEADER -------- */}
              <div
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer"
                onClick={() => setOpenOrder(isOpen ? null : order._id)}
              >
                <div className="space-y-1 sm:space-y-2">
                  <h2 className="text-gray-900 dark:text-gray-100 font-semibold break-all">
                    Order ID: {order._id}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-800 dark:text-gray-200 font-medium mt-1">
                    Total:{" "}
                    <span className="font-bold">{order.totalAmount} BDT</span>
                  </p>
                </div>

                <span
                  className={`mt-2 sm:mt-0 px-3 py-1 text-sm rounded-lg font-medium whitespace-nowrap ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "confirmed"
                      ? "bg-blue-100 text-blue-700"
                      : order.status === "shipped"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* -------- EXPANDING AREA -------- */}
              <div
                className={`transition-all duration-500 overflow-hidden mt-4 ${
                  isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {/* Items */}
                <div className="space-y-4 pt-4 border-t border-gray-300 dark:border-gray-600">
                  {order.items.map((item, i) => {
                    console.log(item, "orders form track order page");
                    return (
                      <div
                        key={i}
                        className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 border-b pb-3 sm:pb-4 border-gray-300 dark:border-gray-600"
                      >
                        <div className="relative flex-shrink-0 ">
                          <img
                            src={item.image}
                            alt={item.title}
                            width={500}
                            height={500}
                            className="rounded-lg object-contain w-[70px] h-[60px]"
                          />
                        </div>

                        <div className="flex-1">
                          <p className="text-gray-800 dark:text-gray-100 font-medium">
                            {item.title}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">
                            {item.quantity} × {item.price} BDT
                          </p>
                        </div>

                        <p className="text-gray-800 dark:text-gray-100 font-semibold">
                          {(item.quantity * item.price).toFixed(2)} BDT
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Progress */}
                <div className="mt-6">
                  <div className="flex justify-between text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                    {statusSteps.map((step) => (
                      <span key={step} className="capitalize whitespace-nowrap">
                        {step}
                      </span>
                    ))}
                  </div>

                  <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-500 dark:bg-yellow-400 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
