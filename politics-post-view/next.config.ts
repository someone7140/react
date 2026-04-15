import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@heroui/react", "@heroui/theme"],
  reactStrictMode: false,
};

export default nextConfig;
