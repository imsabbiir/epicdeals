"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";

function MobileCategoryMenu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
          { cache: "no-store" }
        );
        const data = await res.json();
        setCategories(data);

        // Set the first category as active
        if (data.length) setActiveCategoryId(data[0]._id || data[0].id);
      } catch (err) {
        console.error("Header Load Error:", err);
      }
    };

    fetchCategories();
  }, []);

  const toggleDrawer = () => setIsOpen(!isOpen);

  const handleCategoryClick = (id) => setActiveCategoryId(id);

  const handleSubcategoryClick = (subcategory) => {
    const categoryPageURL = `/category/${encodeURIComponent(
      subcategory.name.trim().toLowerCase().replace(/\s+/g, "-")
    )}`;
    router.push(categoryPageURL);
    setIsOpen(false); // close drawer after click
  };

  const activeCategory = categories.find(
    (category) =>
      category._id === activeCategoryId || category.id === activeCategoryId
  );

  return (
    <>
      {/* Categories Button */}
      <button
        onClick={toggleDrawer}
        className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm"
      >
        Categories
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={toggleDrawer}
        ></div>
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[85%] bg-white dark:bg-[#1e1e28] z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } shadow-lg flex flex-col`}
      >
        {/* Header with Close Button */}
        <div className="flex justify-between items-center px-3 py-2 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
            Categories
          </h2>
          <button
            onClick={toggleDrawer}
            className="text-gray-800 dark:text-gray-200 hover:text-red-600"
          >
            <IoClose size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 overflow-hidden">
          {/* Categories */}
          <div className="col-span-3 border-r border-gray-200 dark:border-gray-700 overflow-y-auto text-sm">
            {categories.map((category) => (
              <button
                key={category._id || category.id}
                onClick={() =>
                  handleCategoryClick(category._id || category.id)
                }
                className={`w-full text-left px-3 py-2 border-b border-gray-200 dark:border-gray-700 ${
                  (category._id || category.id) === activeCategoryId
                    ? "bg-blue-600 text-white"
                    : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Subcategories */}

          <div className="col-span-4 p-2 overflow-y-auto text-xs">
            {activeCategory?.subcategories?.length ? (
              <div className="grid grid-cols-2 gap-2">
                {activeCategory.subcategories.map((subcategory) => (
                  <div
                    key={subcategory._id || subcategory.id}
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => handleSubcategoryClick(subcategory)}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <img
                        src={subcategory.image}
                        alt={subcategory.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <span className="mt-2 text-xs text-center truncate">
                      {subcategory.name}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 mt-4">
                Select a category
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileCategoryMenu;
