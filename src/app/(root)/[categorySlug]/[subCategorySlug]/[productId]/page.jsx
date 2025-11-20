"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "@/components/products/ProductCard";

export default function page({ params: paramsPromise }) {
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const params = await paramsPromise;
        const productId = params.productId;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${productId}`,
          { cache: "no-store" }
        );
        const data = await res.json();
        setProduct(data);

        setMainImage(data.images[0]);
        setSelectedSize(data.variants[0]);
        setSelectedColor(data.variants[0].colors[0]);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [paramsPromise]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product) return;
      try {
        let res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?categorySlug=${product.categorySlug}&subCategorySlug=${product.subCategorySlug}`,
          { cache: "no-store" }
        );
        let subProducts = (await res.json()).products.filter(
          (p) => p.id !== product.id
        );

        if (subProducts.length < 3) {
          const needed = 3 - subProducts.length;
          res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?categorySlug=${product.categorySlug}`,
            { cache: "no-store" }
          );
          const catProducts = (await res.json()).products.filter(
            (p) =>
              p.id !== product.id && !subProducts.some((sp) => sp.id === p.id)
          );
          subProducts = [...subProducts, ...catProducts.slice(0, needed)];
        }

        setRelatedProducts(subProducts.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch related products:", err);
      }
    };

    fetchRelatedProducts();
  }, [product]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!product)
    return <div className="text-center py-20">Product not found</div>;

  const handleSizeChange = (variant) => {
    setSelectedSize(variant);
    setSelectedColor(variant.colors[0]);
  };

  return (
    <div className="min-h-screen py-10 bg-gray-50 dark:bg-[#1e1e28]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 px-4 sm:px-6">
        {/* LEFT: Image Gallery */}
        <div>
          <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-white dark:bg-[#2c2c38] rounded-xl shadow overflow-hidden">
            <img
              src={mainImage}
              alt={product.productName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail gallery */}
          <div className="flex gap-2 sm:gap-3 mt-4 overflow-x-auto">
            {product.images.map((img, i) => (
              <div
                key={i}
                className={`w-16 sm:w-20 h-16 sm:h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 cursor-pointer ${
                  mainImage === img
                    ? "border-blue-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
                onClick={() => setMainImage(img)}
              >
                <img
                  src={img}
                  alt={`thumb-${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div className="space-y-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700 dark:text-white">
            {product.productName}
          </h1>

          {/* Price */}
          <div className="flex flex-wrap items-center gap-3">
            {product.discountStatus ? (
              <>
                <p className="text-lg sm:text-xl text-gray-500 line-through">
                  ৳ {product.productPrice}
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">
                  ৳{" "}
                  {Math.round(
                    product.productPrice *
                      (1 - product.productDiscountAmount / 100)
                  )}
                </p>
                <span className="px-2 py-1 text-sm bg-red-500 text-white rounded-md">
                  -{product.productDiscountAmount}%
                </span>
              </>
            ) : (
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                ৳ {product.productPrice}
              </p>
            )}
          </div>

          {/* Key Features */}
          <div className="mt-4 p-4 sm:p-5 bg-white dark:bg-[#2c2c38] rounded-xl shadow">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Key Features
            </h3>
            <ul className="list-disc ml-5 text-gray-600 dark:text-gray-300 space-y-1 text-sm sm:text-base">
              {product.keyFeatures.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          {/* Size Selection */}
          {product.variants && product.variants.some((v) => v.type) && (
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-2">
                Select Size
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {product.variants
                  .filter((v) => v.type)
                  .map((variant, i) => (
                    <button
                      key={i}
                      className={`px-3 sm:px-4 py-1 sm:py-2 rounded-md border ${
                        selectedSize?.type === variant.type
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                          : "border-gray-300 dark:border-gray-600"
                      } hover:bg-gray-200 dark:hover:bg-[#2c2c38] transition`}
                      onClick={() => handleSizeChange(variant)}
                    >
                      {variant.type}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-2">
              Select Color
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {selectedSize.colors.map((color, i) => {
                const isSelected = selectedColor.color === color.color;
                const isOutOfStock = color.stock === 0;

                return (
                  <div key={i} className="relative">
                    <button
                      className={`w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? "border-blue-500 ring-2 ring-blue-300 dark:ring-blue-700"
                          : "border-gray-300 dark:border-gray-600"
                      } ${
                        isOutOfStock
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600"
                      }`}
                      style={{ backgroundColor: color.color.toLowerCase() }}
                      onClick={() => !isOutOfStock && setSelectedColor(color)}
                      disabled={isOutOfStock}
                      title={`Stock: ${color.stock}`}
                    >
                      <span className="text-white text-xs font-bold absolute -top-0 -right-0 bg-green-500 rounded-full w-4 h-4 flex items-center justify-center sm:w-5 sm:h-5">
                        {color.stock}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            className="w-full py-3 sm:py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
            disabled={selectedColor.stock === 0}
          >
            {selectedColor.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="w-full max-w-6xl mx-auto mt-12 px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {relatedProducts.map((related) => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
