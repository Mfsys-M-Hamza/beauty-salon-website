import type { NextConfig } from "next";

// Set NEXT_PUBLIC_BASE_PATH="/repo-name" when hosting under a sub-path (GitHub Pages project sites).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Pin the project root (avoids lockfile detection picking a parent folder).
  turbopack: { root: process.cwd() },
  // Fully static site: works on GitHub Pages, Netlify, Vercel or any static host.
  output: "export",
  trailingSlash: true,
  basePath,
  images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts" },
};

export default nextConfig;
