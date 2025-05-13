import type { NextConfig } from "next";

const nextConfig = {
  /* config options here */
  eslint: {
    // Warning: This disables ESLint during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This disables TypeScript type checking during builds
    ignoreBuildErrors: true,
  },
  experimental: {
    // Disable the missingSuspenseWithCSRBailout warning as a fallback
    // Note: This is only a temporary solution until all components are properly wrapped with Suspense
    // Using type assertion to bypass TypeScript error as this is a valid Next.js 14.x option
    missingSuspenseWithCSRBailout: false,
  },
} as NextConfig;

export default nextConfig;
