"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaHeart,
} from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { IoSearchOutline, IoCamera } from "react-icons/io5";
import Hamburger from "hamburger-react";
import Image from "next/image";
import Link from "next/link";
import MobileCategoryMenu from "./CategoryMenu/MobileCategoryMenu";

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);

  // Avatar dropdown state
  const [openMenu, setOpenMenu] = useState(false);

  // Hamburger menu state
  const [isOpen, setOpen] = useState(false);

  // Refs for outside-click
  const avatarMenuRef = useRef(null);
  const hamburgerMenuRef = useRef(null);

  // Close both menus on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (avatarMenuRef.current && !avatarMenuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }

      if (
        hamburgerMenuRef.current &&
        !hamburgerMenuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load categories + user
  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesRes, userRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
            cache: "no-store",
          }),
          fetch("/api/me", { cache: "no-store" }),
        ]);

        if (categoriesRes.ok) {
          const data = await categoriesRes.json();
          setCategories(data);
        }

        if (userRes.ok) {
          const data = await userRes.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error("Header Load Error:", err);
      }
    };

    loadData();
  }, []);

  // Logout
  const handleLogout = async () => {
    const res = await fetch("/api/logout", { method: "POST" });
    if (res.ok) window.location.reload();
  };

  return (
    <div className="relative">
      {/* TOP STRIP */}
      <div className="w-full bg-[#F2F2F2]">
        <div className="w-[90%] mx-auto flex justify-between items-center h-10 text-[#4A4A4A] uppercase">
          <div className="icons flex gap-2">
            <FaFacebookF className="cursor-pointer text-[#007BFF]" />
            <FaInstagram className="cursor-pointer text-[#007BFF]" />
            <FaLinkedinIn className="cursor-pointer text-[#007BFF]" />
            <FaTwitter className="cursor-pointer text-[#007BFF]" />
          </div>

          <h3 className="hidden md:inline">
            free shipping this week order over - 5500 BDT
          </h3>

          <div className="flex gap-2 items-center">
            <select className="bg-transparent text-xs p-1 rounded-md">
              <option>English</option>
            </select>
            <select className="bg-transparent text-xs p-1 rounded-md">
              <option>USD $</option>
            </select>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="w-full bg-[#FFFFFF]">
        <div className="w-[90%] mx-auto flex h-20 gap-5 items-center justify-between text-[#1E90FF]">
          {/* Logo */}
          <Link href="/">
            <Image
              width={200}
              height={200}
              src="https://i.ibb.co.com/MnBCZ5L/epicdeals.png"
              alt="logo"
              className="cursor-pointer w-20 md:w-32"
            />
          </Link>

          {/* Desktop Search */}
          <div className="search md:flex relative w-full mx-10 hidden">
            <input
              type="text"
              placeholder="Search by keyword/product name/brands..."
              className="border border-black py-1 px-2 rounded-md outline-none w-full text-md"
            />
            <div className="searchIcon flex gap-2 absolute right-3 top-1/2 -translate-y-1/2">
              <IoCamera className="cursor-pointer text-xl hidden" />
              <IoSearchOutline className="cursor-pointer text-xl" />
            </div>
          </div>

          {/* Icons */}
          <div className="flex gap-5 items-center">
            <Link href="/wishlists">
              <FaHeart className="text-2xl cursor-pointer text-red-400" />
            </Link>

            <Link href="/cart">
              <CiShoppingCart className="text-3xl cursor-pointer hover:text-blue-500" />
            </Link>

            {/* Avatar */}
            <div className="relative" ref={avatarMenuRef}>
              <div
                onClick={() => setOpenMenu((prev) => !prev)}
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden"
              >
                {user?.photo ? (
                  <Image
                    src={user?.photo}
                    alt={user?.name}
                    width={200}
                    height={200}
                  />
                ) : (
                  <div>👤</div>
                )}
              </div>

              {openMenu && (
                <div className="absolute right-0 top-12 bg-white shadow-lg rounded-md w-44 p-2 z-[70]">
                  {!user ? (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setOpenMenu(false)}
                        className="block px-3 py-2 hover:bg-gray-100"
                      >
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setOpenMenu(false)}
                        className="block px-3 py-2 hover:bg-gray-100"
                      >
                        Signup
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/user/profile"
                        onClick={() => setOpenMenu(false)}
                        className="block px-3 py-2 hover:bg-gray-100"
                      >
                        Profile
                      </Link>

                      <Link
                        href="/user/track-order"
                        onClick={() => setOpenMenu(false)}
                        className="block px-3 py-2 hover:bg-gray-100"
                      >
                        Track Order
                      </Link>

                      <button
                        onClick={() => {
                          handleLogout();
                          setOpenMenu(false);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 text-red-500"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Category Menu */}
      <div className="hidden md:flex justify-center items-center gap-10 text-lg font-semibold py-4">
        <Link href={"/"}>Home</Link>
        {categories?.map((category) => (
          <Link key={category._id} href={`/${category.slug}`}>
            {category.name}
          </Link>
        ))}
      </div>

      {/* MOBILE SEARCH + HAMBURGER */}
      <div className="md:hidden bg-white shadow-t border-t p-2 flex gap-2 items-center relative">
        <div>
          <MobileCategoryMenu categories={categories}/>
        </div>
        {/* Search */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded-md py-1 px-3 text-sm outline-none"
          />
          <IoSearchOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-500" />
        </div>

        {/* Hamburger */}
        <div ref={hamburgerMenuRef}>
          <Hamburger toggled={isOpen} toggle={setOpen} size={20} />

          <div
            className={`absolute w-full top-0 ${
              isOpen ? "right-0" : "-right-[110%]"
            } transition-all duration-300 bg-white shadow-lg z-[60] pt-5 mt-12 p-7 overflow-y-auto`}
          >
            <Link
              href={"/"}
              className="block py-2 border-b"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            {categories?.map((category) => (
              <Link
                key={category._id}
                href={`/${category.slug}`}
                className="block py-2 border-b"
                onClick={() => setOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
