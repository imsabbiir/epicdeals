import { notFound } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";
import Filter from "@/components/Filter/Filter";
import TopSellProducts from "@/components/products/TopSellProducts";
import Pagination from "@/components/products/Pagination";

async function getAllCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

async function getProductsBySubcategory({ categorySlug, subCategorySlug, minPrice = 0, maxPrice = 9999999, page = 1 }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?categorySlug=${categorySlug}&subCategorySlug=${subCategorySlug}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&limit=9`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch products");

  const data = await res.json();
  return data; // return { products, pagination }
}

export default async function SubcategoryPage({ params, searchParams }) {
  const { categorySlug, subCategorySlug } = params;

  const allCategories = await getAllCategories();
  const category = allCategories.find((cat) => cat.slug === categorySlug);
  if (!category) notFound();

  const subcategory = category.subcategories?.find((sub) => sub.slug === subCategorySlug);
  if (!subcategory) notFound();

  const minPrice = searchParams?.minPrice || 0;
  const maxPrice = searchParams?.maxPrice || 9999999;
  const page = searchParams?.page || 1;

  const { products, pagination } = await getProductsBySubcategory({ categorySlug, subCategorySlug, minPrice, maxPrice, page });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1e1e28]">
      {/* 🌄 Subcategory Hero Section */}
      <div className="relative w-full h-64 sm:h-80 lg:h-96 flex items-center justify-center bg-gray-200 dark:bg-[#2c2c38] px-4">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold capitalize text-gray-900 dark:text-white">
            {subcategory.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm sm:text-base">
            Browse our {subcategory.name} collection.
          </p>

          {/* Show all subcategories of this category */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mt-5 text-sm sm:text-base">
            {category.subcategories?.map((sub) => (
              <Link key={sub._id} href={`/${category.slug}/${sub.slug}`}>
                <li className="cursor-pointer list-none hover:underline text-gray-900 dark:text-gray-200">
                  {sub.name}
                </li>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-[95%] sm:w-[90%] mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 lg:gap-10">
          {/* 🟡 Left Sidebar */}
          <div className="lg:col-span-2 space-y-6 order-1 lg:order-1">
            {/* Top selling first */}
            <TopSellProducts />
            <Filter showCategory={false} showSubcategory={false} showPrice={true} />
          </div>

          {/* 🟢 Products & Pagination */}
          <div className="lg:col-span-5 order-2 lg:order-2 mt-6 lg:mt-0">
            {products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination?.totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      pagination={pagination}
                      categorySlug={categorySlug}
                      subCategorySlug={subCategorySlug}
                      minPrice={minPrice}
                      maxPrice={maxPrice}
                    />
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-10">
                No products found in this subcategory.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
