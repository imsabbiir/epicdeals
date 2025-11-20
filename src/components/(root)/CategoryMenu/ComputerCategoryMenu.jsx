"use client";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";

export default function ComputerCategoryMenu({ categories = [] }) {
  const [activeNav, setActiveNav] = useState(categories[0]?.id || "");
  const router = useRouter();

  const handleNavClick = (id) => {
    setActiveNav(id);
  };

  const getSubcategories = () => {
    const category = categories.find((cat) => cat.id === activeNav);
    return category ? category.subcategories : [];
  };

  return (
    <>
      {/* Category buttons */}
      <div className="md:flex justify-between my-5 flex-wrap gap-2">
        {categories?.map((category) => (
          <button
            key={category.id}
            onClick={() => handleNavClick(category.id)}
            className={`md:px-2 lg:px-5 py-1 md:text-sm lg:text-base rounded-full transition-all duration-300 font-semibold capitalize cursor-pointer ${
              activeNav === category.id
                ? "bg-[#0A66C2] text-white"
                : "hover:text-[#0A66C2]"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Carousel for subcategories */}
      <div className="relative">
        <Carousel>
          <CarouselContent className="gap-4">
            {getSubcategories().map((subcategory) => {
              const categoryPageURL = `/category/${encodeURIComponent(
                subcategory.name.trim().toLowerCase().replace(/\s+/g, "-")
              )}`;

              return (
                <CarouselItem
                  key={subcategory.id}
                  className="md:basis-1/2 lg:basis-1/4 cursor-pointer"
                  onClick={() => router.push(categoryPageURL)}
                >
                  <div className="flex justify-between bg-[#E8F0FE] rounded-md p-3 h-full">
                    <div className="flex flex-col justify-between md:w-full">
                      <h2 className="text-sm lg:text-lg font-semibold font-serif">
                        {subcategory.name}
                      </h2>
                      <h4 className="text-xs lg:text-sm text-gray-600">
                        {subcategory.punchline}
                      </h4>
                    </div>
                    <div className="w-full mt-2 h-28">
                      <img
                        src={subcategory.image}
                        alt={subcategory.name}
                        className="w-full h-full object-cover rounded-md"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
}
