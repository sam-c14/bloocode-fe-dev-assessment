"use client";
import React from "react";
import Link from "next/link";
import Mill from "../icons/Mill";

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
        <Mill />
        <span> View Favorites</span>
      </Link>
    </div>
  );
};

export default Navbar;
