import type { NextConfig } from "next";

const nextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Remove or comment this line:
  // output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
} as NextConfig;

export default nextConfig;
