import BannerSlider from "@/components/(root)/BannerSlider";
import CategoryMenu from "@/components/(root)/CategoryMenu/CategoryMenu";
import SingleBanner from "@/components/(root)/SingleBanner";
import Filter from "@/components/Filter/Filter";
import AllProduct from "@/components/products/AllProduct";
import TopSellProducts from "@/components/products/TopSellProducts";
import { Suspense } from "react";

export default function Home({ searchParams }) {
  return (
    <div>
      {/* Banner Section */}
      <BannerSlider />

      <Suspense fallback={<div>Loading menu...</div>}>
        <CategoryMenu />
      </Suspense>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-6 md:gap-10">
          
          {/* Sidebar */}
          <div className="md:col-span-2 flex flex-col-reverse md:flex-col gap-5">
            
            <Suspense fallback={<div>Loading filters...</div>}>
              <Filter showCategory={true} showSubcategory={true} showPrice={true} />
            </Suspense>

            <Suspense fallback={<div>Loading top sellers...</div>}>
              <TopSellProducts />
            </Suspense>
          </div>

          {/* Products */}
          <div className="md:col-span-5">
            <Suspense fallback={<div>Loading products...</div>}>
              <AllProduct searchParams={searchParams} />
            </Suspense>
          </div>

        </div>
      </div>
    </div>
  );
}
