"use client";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";
import React, { useState } from "react";
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";

function ProductCard({ product }) {
  const [selectedType, setSelectedType] = useState(
    product.variants?.[0]?.type || ""
  );
  const [selectedColor, setSelectedColor] = useState(
    product.variants?.[0]?.colors?.[0]?.color || ""
  );
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart, cart } = useCart();

  const isInWishlist = wishlist.some((item) => item._id === product._id);
  const isInCart = cart.some(
  (item) =>
    item._id === product._id &&
    item.selectedType === selectedType &&
    item.selectedColor === selectedColor
);


  // Selected type & color state
  

  const handleAddToCart = () => {
  const itemToAdd = {
    _id: product._id,
    productName: product.productName,
    productPrice: product.productPrice,
    category: product.category,
    images: product.images,
    selectedType,
    selectedColor,
    quantity: 1,
  };
  addToCart(itemToAdd);
};


  return (
    <div className="border rounded-xl shadow-sm bg-white hover:shadow-md transition-all duration-300 p-3">
      {/* Product Image */}
      <Link
        href={`/${product?.categorySlug}/${product?.subCategorySlug}/${product?._id}`}
      >
        <div className="w-full h-[220px] bg-gray-100 flex justify-center items-center rounded-lg overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.productName}
            loading="lazy"
            className="h-[180px] w-4/5 object-contain"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="px-1 pt-3">
        <div className="mb-2">
          {product?.subCategory?.map((subCategoryitem, index) => (
            <span key={index} className="pr-2 uppercase text-xs text-gray-600">
              {subCategoryitem}
            </span>
          ))}
        </div>

        <h3 className="font-semibold line-clamp-1 text-gray-900">
          {product.productName}
        </h3>

        <p className="text-[16px] pb-2 text-gray-800 font-bold">
          {product.productPrice} tk
        </p>

        <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
          <p className="flex gap-1 items-center">
            <FaStar className="text-yellow-500" />
            {product.rating}
          </p>
          <p>({product.variants?.[0]?.colors?.[0]?.sold}) Sold</p>
        </div>

        {/* Type & Color Selectors */}
        <div className="flex justify-between mb-3">
          {product.variants && product.variants[0].type !== "" && (
            <div className="flex gap-2 items-center">
              <span className="text-sm font-medium">Type:</span>
              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  const firstColor =
                    product.variants.find((v) => v.type === e.target.value)
                      ?.colors?.[0]?.color || "";
                  setSelectedColor(firstColor);
                }}
                className="border px-2 py-1 rounded"
              >
                {product.variants.map((variant, idx) => (
                  <option key={idx} value={variant.type}>
                    {variant.type}
                  </option>
                ))}
              </select>
            </div>
          )}

          {product.variants?.find((v) => v.type === selectedType)?.colors[0].color !== "" && (
            <div className="flex gap-2 items-center">
              <span className="text-sm font-medium">Color:</span>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="border px-2 py-1 rounded"
              >
                {product.variants
                  .find((v) => v.type === selectedType)
                  ?.colors.map((colorObj, idx) => (
                    <option key={idx} value={colorObj.color}>
                      {colorObj.color}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          {/* Add to Cart */}
          <button
            className={`flex-1 py-2 rounded-lg flex justify-center items-center gap-2 transition cursor-pointer ${
              isInCart
                ? "bg-green-600 text-white"
                : "bg-black text-white hover:bg-gray-900"
            }`}
            onClick={handleAddToCart}
          >
            <FaShoppingCart />
            {isInCart ? "Added" : "Add to Cart"}
          </button>

          {/* Wishlist */}
          <button
            className={`w-12 h-11 rounded-lg border cursor-pointer flex justify-center items-center transition ${
              isInWishlist
                ? "bg-red-50 border-red-500 text-red-500"
                : "border-[#666] text-[#666]"
            }`}
            onClick={() => toggleWishlist(product)}
          >
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
