import React from 'react'

function SubCategoryFilter() {
  return (
    <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-1">
          Subcategory
        </label>
        <select
          name="subcategory"
          value={filters.subcategory}
          onChange={handleChange}
          disabled={!selectedCategory}
          className="w-full p-2 rounded border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="">All Subcategories</option>
          {data?.subCategorySlugs?.map((sub) => (
            <option key={sub._id} value={sub.slug}>
              {sub.name}
            </option>
          ))}
        </select>
      </div>
  )
}

export default SubCategoryFilter