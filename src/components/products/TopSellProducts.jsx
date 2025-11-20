import React from "react";

async function TopSellProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/top-sell`, {
    cache: "no-store",
  });
  const topSellProducts = await res.json();

  return (
    <div className="w-full max-w-md mx-auto mt-8 bg-white dark:bg-[#1e1e28] rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          🔥 Top Selling Products
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {topSellProducts?.length || 0} items
        </span>
      </div>

      {/* Product List */}
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {topSellProducts?.length > 0 ? (
          topSellProducts.map((product) => (
            <div
              key={product?._id}
              className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-[#2c2c38] transition-all duration-200 cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white">
                <img
                  src={product?.images?.[0]}
                  alt={product?.productName}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                  {product?.productName}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {product?.categorySlug || "Uncategorized"}
                </p>
              </div>

              {/* Optional Price / Badge */}
              {/* {product?.price && (
                <span className="text-sm font-bold text-yellow-500">
                  ${product.price}
                </span>
              )} */}
            </div>
          ))
        ) : (
          <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
            No top selling products found.
          </div>
        )}
      </div>
    </div>
  );
}

export default TopSellProducts;
