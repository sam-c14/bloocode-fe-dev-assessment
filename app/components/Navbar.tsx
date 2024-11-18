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
        className="uppercase text-blue-800 lg:text-2xl md:text-xl text-base"
      >
        View Favorites
      </Link>
    </div>
  );
};

export default Navbar;
