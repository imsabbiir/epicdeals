"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Filter = ({ showCategory = true, showSubcategory = true, showPrice = true , category, className=""}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: searchParams.get("categorySlug") || category,
    subcategory: searchParams.get("subCategorySlug") || "",
    priceMin: searchParams.get("minPrice") || "",
    priceMax: searchParams.get("maxPrice") || "",
  });

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const selectedCategory = categories.find(cat => cat.slug === filters.category);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      ...(name === "category" ? { subcategory: "" } : {}),
    }));
  };

  const handleApply = () => {
    const params = new URLSearchParams();
    if (filters.category) params.set("categorySlug", filters.category);
    if (filters.subcategory) params.set("subCategorySlug", filters.subcategory);
    if (filters.priceMin) params.set("minPrice", filters.priceMin);
    if (filters.priceMax) params.set("maxPrice", filters.priceMax);

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md mx-auto space-y-4 mt-10 md:mt-0">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Filter Products</h2>

      {showCategory && (
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full p-2 rounded border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
        </div>
      )}

      {showSubcategory && (
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Subcategory</label>
          <select
            name="subcategory"
            value={filters.subcategory}
            onChange={handleChange}
            className="w-full p-2 rounded border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="">All Subcategories</option>
            {selectedCategory?.subcategories?.map(sub => (
              <option key={sub.slug} value={sub.slug}>{sub.name}</option>
            ))}
          </select>
        </div>
      )}

      {showPrice && (
        <div className="flex items-center space-x-2">
          <div className="w-1/2">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Min Price</label>
            <input
              type="number"
              name="priceMin"
              value={filters.priceMin}
              onChange={handleChange}
              className="w-full p-2 rounded border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="৳ Min"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Max Price</label>
            <input
              type="number"
              name="priceMax"
              value={filters.priceMax}
              onChange={handleChange}
              className="w-full p-2 rounded border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="৳ Max"
            />
          </div>
        </div>
      )}

      <div className="pt-4">
        <button
          onClick={handleApply}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
