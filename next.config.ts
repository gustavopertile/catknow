import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn2.thecatapi.com",
      },

      {
        protocol: "https",
        hostname: "cdn1.thecatapi.com",
      },

      {
        protocol: "https",
        hostname: "**.media.tumblr.com",
      },
    ],
  },
};

export default nextConfig;
