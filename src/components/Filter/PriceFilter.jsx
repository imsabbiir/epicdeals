import React from 'react'

function PriceFilter() {
  return (
    <div className="flex items-center space-x-2">
        <div className="w-1/2">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Min Price
          </label>
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
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Max Price
          </label>
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
  )
}

export default PriceFilter