"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
const slides = [
    "https://i.ibb.co.com/ZfWQvwc/haircare.webp",
    "https://i.ibb.co.com/T8psy3L/skincare.webp",
    "https://i.ibb.co.com/8P6zbwY/electronics.webp",
    "https://i.ibb.co.com/V20Wr5n/baby.webp",
    "https://i.ibb.co.com/Zm8Vd8M/banner.webp",
    "https://i.ibb.co.com/NsH2pQX/zdrop-01.webp",
    "https://i.ibb.co.com/28Y10hk/zdrop-02.webp"
  ]
export default function BannerSlider() {
  const autoplay = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );
  return (
    <div className="relative w-9/10 mx-auto my-5 rounded-xl overflow-hidden">
      <Carousel
        plugins={[autoplay.current]}
        className="w-full"
        opts={{ loop: true }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full">
                <Image
                  src={slide}
                  alt="EpicDeals"
                  width={2500}
                  height={2000}
                  className="w-full h-72 object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white text-black rounded-full w-10 h-10 flex items-center justify-center cursor-pointer" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white text-black rounded-full w-10 h-10 flex items-center justify-center cursor-pointer" />
      </Carousel>
    </div>
  );
}
