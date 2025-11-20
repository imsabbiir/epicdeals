import React from "react";
import ComputerCategoryMenu from "./ComputerCategoryMenu";
import MobileCategoryMenu from "./MobileCategoryMenu";
const categories = [
  {
    id: "1",
    name: "Electronics",
    tagline: "Upgrade your life with the latest tech essentials.",
    image: "https://example.com/images/electronics.jpg",
    subcategories: [
      {
        id: 101,
        name: "Mobile Phones",
        image: "https://i.ibb.co/7K3kD6F/mobile.png",
        punchline: "Stay connected, stay ahead",
      },
      {
        id: 102,
        name: "Laptops",
        image: "https://i.ibb.co/qmVKCJ1/laptop.png",
        punchline: "Work smarter, not harder",
      },
      {
        id: 103,
        name: "Televisions",
        image: "https://i.ibb.co/ypBkgLt/monitor.png",
        punchline: "Entertainment in every pixel",
      },
      {
        id: 104,
        name: "Cameras",
        image: "https://i.ibb.co/0sghPcr/camera.jpg",
        punchline: "Capture moments that matter",
      },
      {
        id: 105,
        name: "Kitchen Accessories",
        image: "https://i.ibb.co/tZxtckp/freeze.jpg",
        punchline: "Enhance your tech game",
      },
    ],
  },
  {
    id: "2",
    name: "Furniture",
    tagline: "Transform your space with stylish and comfy furniture.",
    image: "https://example.com/images/furniture.jpg",
    subcategories: [
      {
        id: 201,
        name: "Sofas",
        image: "https://i.ibb.co/S5W1HBf/blue-sofa-1.jpg",
        punchline: "Comfort meets elegance",
      },
      {
        id: 202,
        name: "Tables",
        image: "https://i.ibb.co/T2gPgNk/table.jpg",
        punchline: "Dining with style",
      },
      {
        id: 203,
        name: "Chairs",
        image: "https://i.ibb.co/brTJ8ZY/chair.jpg",
        punchline: "Seating for every need",
      },
      {
        id: 204,
        name: "Beds",
        image:
          "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/1.png",
        punchline: "Dream in comfort",
      },
      {
        id: 205,
        name: "Wardrobes",
        image: "https://i.ibb.co/fH7JjkT/wardrobe.png",
        punchline: "Organize with style",
      },
    ],
  },
  {
    id: "3",
    name: "Men's Ware",
    tagline: "Elevate your style with men's fashion that makes a statement.",
    image: "https://example.com/images/clothes.jpg",
    subcategories: [
      {
        id: 301,
        name: "T-Shirt",
        image: "https://i.ibb.co/GR5zJPM/Tops-Tees.png",
        punchline: "Casual, comfortable, cool",
      },
      {
        id: 302,
        name: "Shirt",
        image: "https://i.ibb.co/5MB28dW/Shirts.png",
        punchline: "Dressed for success",
      },
      {
        id: 303,
        name: "Jeans",
        image: "https://i.ibb.co/P4rkJ1R/Pants.png",
        punchline: "Durable, timeless fashion",
      },
      {
        id: 304,
        name: "Jackets",
        image: "https://i.ibb.co/Qj0KP08/Coats-Jackets.png",
        punchline: "Layer up in style",
      },
      {
        id: 305,
        name: "Sweaters",
        image: "https://i.ibb.co/hgqzWyp/Hoodies-Sweatshirts.png",
        punchline: "Warmth with a touch of trend",
      },
      {
        id: 306,
        name: "Blazer",
        image: "https://i.ibb.co/1KW2nVq/Suits-Blazer.png",
        punchline: "Make a bold statement",
      },
    ],
  },
  {
    id: "4",
    name: "Women's Ware",
    tagline: "Unleash your elegance with fashion that defines you.",
    image: "https://example.com/images/clothes.jpg",
    subcategories: [
      {
        id: 401,
        name: "Dresses",
        image: "https://i.ibb.co/CsJ7rk0/Dresses.png",
        punchline: "Elegance for every occasion",
      },
      {
        id: 402,
        name: "Tops",
        image: "https://i.ibb.co/zQ1wJsR/tops-tees.png",
        punchline: "Trendy and timeless",
      },
      {
        id: 403,
        name: "Jeans",
        image: "https://i.ibb.co/H79zfxN/Jeans.png",
        punchline: "Style that moves with you",
      },
      {
        id: 404,
        name: "Skirts",
        image: "https://i.ibb.co/DWsZSJY/Skirts.png",
        punchline: "Chic and versatile",
      },
      {
        id: 405,
        name: "Blouses",
        image: "https://i.ibb.co/NZPPDCQ/Shirts-Blouses.png",
        punchline: "Finesse in every detail",
      },
      {
        id: 406,
        name: "Bikini",
        image: "https://i.ibb.co/CzymN2L/Bikinis.png",
        punchline: "Sun, sand, and style",
      },
      {
        id: 407,
        name: "Sweaters",
        image: "https://i.ibb.co/yBCk8MQ/Women-Coats-Jackets.png",
        punchline: "Cozy and fashionable",
      },
    ],
  },
  {
    id: "5",
    name: "Shoes",
    tagline: "Step up your game with shoes that fit every occasion.",
    image: "https://example.com/images/shoes.jpg",
    subcategories: [
      {
        id: 501,
        name: "Sneakers",
        image: "https://i.ibb.co/xq9XYYF/Sneakers.png",
        punchline: "Comfort meets street style",
      },
      {
        id: 502,
        name: "Loafers",
        image: "https://i.ibb.co/rm5thdQ/loafer.jpg",
        punchline: "Classic and comfortable",
      },
      {
        id: 503,
        name: "Formal Shoes",
        image: "https://i.ibb.co/Bs5Drh0/formal.png",
        punchline: "Step into elegance",
      },
      {
        id: 504,
        name: "Boots",
        image: "https://i.ibb.co/j432nnJ/Men-Shoes.png",
        punchline: "Built for every terrain",
      },
      {
        id: 505,
        name: "Sandals",
        image: "https://i.ibb.co/mhw9m8p/sandal.webp",
        punchline: "Breezy and effortless",
      },
      {
        id: 506,
        name: "Heels",
        image: "https://i.ibb.co/yyHPqZK/heal.webp",
        punchline: "Elevate your style",
      },
      {
        id: 507,
        name: "Flats",
        image: "https://i.ibb.co/mhw9m8p/sandal.webp",
        punchline: "Fashion without compromise",
      },
    ],
  },
  {
    id: "6",
    name: "Accessories",
    tagline: "Complete your look with must-have accessories that shine.",
    image: "https://example.com/images/accessories.jpg",
    subcategories: [
      {
        id: 601,
        name: "Bags",
        image: "https://i.ibb.co/bzGycBz/bag.png",
        punchline: "Carry your world in style",
      },
      {
        id: 602,
        name: "Watches",
        image: "https://i.ibb.co/WkMzTCy/Mens-Watches.png",
        punchline: "Timeless elegance",
      },
      {
        id: 603,
        name: "Jewelry",
        image: "https://i.ibb.co/sthVYRJ/Fashion-Jewelry.png",
        punchline: "Sparkle every day",
      },
      {
        id: 604,
        name: "Sunglasses",
        image: "https://i.ibb.co/JzJR2G9/sunglass.png",
        punchline: "Shade in style",
      },
      {
        id: 605,
        name: "Belts",
        image: "https://i.ibb.co/gv35SjK/Belts.png",
        punchline: "Tie your look together",
      },
      {
        id: 606,
        name: "Hats",
        image: "https://i.ibb.co/Pj6skqG/Hats-Caps.png",
        punchline: "Tie your look together",
      },
    ],
  },
  {
    id: "7",
    name: "Beauty and Care",
    tagline: "Glow inside and out with beauty products you'll love.",
    image: "https://example.com/images/beauty_and_care.jpg",
    subcategories: [
      {
        id: 701,
        name: "Skincare",
        image: "https://i.ibb.co/wNMfBPR/Skin-Care.png",
        punchline: "Glow from within",
      },
      {
        id: 702,
        name: "Haircare",
        image: "https://i.ibb.co/LQGMcYm/Hair-Care-Styling.png",
        punchline: "Nourish your crown",
      },
      {
        id: 703,
        name: "Makeup",
        image: "https://i.ibb.co/kQQpB3s/Makeup.png",
        punchline: "Unleash your creativity",
      },
      {
        id: 704,
        name: "Fragrances",
        image: "https://i.ibb.co/Gkdzc86/Fragrances-Deodorants.png",
        punchline: "Make an unforgettable impression",
      },
      {
        id: 705,
        name: "Men's Grooming",
        image: "https://i.ibb.co/cNtG7m7/man-s-grooming.png",
        punchline: "Look sharp, feel sharper",
      },
    ],
  },
  {
    id: "8",
    name: "Gadgets",
    tagline: "Explore Innovation, Experience the Future.",
    image: "https://example.com/images/beauty_and_care.jpg",
    subcategories: [
      {
        id: 801,
        name: "Mouse",
        image: "https://i.ibb.co/Swn2JLv/mouse.webp",
        punchline: "Glow from within",
      },
      {
        id: 802,
        name: "Keyboard",
        image: "https://i.ibb.co/fDMmg5b/keyboard.webp",
        punchline: "Nourish your crown",
      },
      {
        id: 803,
        name: "Sound Box",
        image: "https://i.ibb.co/s3wc8T1/jbl.webp",
        punchline: "Unleash your creativity",
      },
      {
        id: 804,
        name: "HeadPhone",
        image: "https://i.ibb.co/ngVMcwz/headphone.jpg",
        punchline: "Make an unforgettable impression",
      },
      {
        id: 805,
        name: "Others",
        image:
          "https://www.startech.com.bd/image/cache/catalog/keyboard/eksa/et100-pro-01-228x228.webp",
        punchline: "Look sharp, feel sharper",
      },
    ],
  },
];
function CategoryMenu() {
  return (
    <div className="w-full">
      <div className="w-[90%] mx-auto pt-10 hidden md:block">
        <h2 className="uppercase md:text-xl font-semibold">Categories</h2>
        <ComputerCategoryMenu categories={categories} />
      </div>
    </div>
  );
}

export default CategoryMenu;
