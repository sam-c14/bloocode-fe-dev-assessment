import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["image.tmdb.org"], // Add the hostname you want to allow
  },
};

export default nextConfig;
