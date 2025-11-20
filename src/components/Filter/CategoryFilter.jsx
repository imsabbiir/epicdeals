import { useSearchParams } from 'next/navigation';
import React from 'react'

async function CategoryFilter() {
    const searchParams = useSearchParams();
    
  return (
    <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-1">
          Category
        </label>
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="w-full p-2 rounded border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="">All Categories</option>
          {data?.categories?.map((cat) => (
            <option key={cat._id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
  )
}

export default CategoryFilter