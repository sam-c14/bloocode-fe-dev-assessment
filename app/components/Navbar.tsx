"use client";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="py-8 px-7 w-full fixed top-0 bg-black font-extrabold z-50 flex justify-between items-center">
      <Link
        href="/"
        className="uppercase text-blue-800 lg:text-2xl md:text-xl text-base"
      >
        BlooMovies
      </Link>
      <Link
        href="/favorites"
        className="inline-flex items-center uppercase text-blue-800 py-2 px-4 rounded-lg text-base lg:text-2xl md:text-xl transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5.25 3.75L12 10.5l6.75-6.75M12 10.5v11.25"
          />
        </svg>
        View Favorites
      </Link>
    </div>
  );
};

export default Navbar;
