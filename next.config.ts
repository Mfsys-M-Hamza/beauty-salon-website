import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the project root (avoids lockfile detection picking a parent folder).
  turbopack: { root: process.cwd() },
};

export default nextConfig;
