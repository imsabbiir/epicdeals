import React from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Pagination from "./Pagination";
async function AllProduct({ searchParams }) {
  const categorySlug = searchParams?.categorySlug || "all";
  const subCategorySlug = searchParams?.subCategorySlug || "all";
  const page = searchParams?.page || 1;
  const minPrice = searchParams?.minPrice || 0;
  const maxPrice = searchParams?.maxPrice || 999999;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?categorySlug=${categorySlug}&subCategorySlug=${subCategorySlug}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&limit=9`,
    { cache: "no-store" }
  );
  const data = await res.json();
  const products = data.products;
  const pagination = data.pagination;

  return (
    <div>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="col-span-3 text-center">No products found.</p>
        )}
      </div>
      {/* 🟠 Pagination Section */}
      {pagination?.totalPages > 1 && (
        <Pagination
          pagination={pagination}
          categorySlug={categorySlug}
          subCategorySlug={subCategorySlug}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      )}
    </div>
  );
}

export default AllProduct;
