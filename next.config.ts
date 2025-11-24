import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Avoid trying to read git commit info
  generateBuildId: async () => {
    // Return a fixed build ID to bypass git detection
    return "static-build-id";
  },
  distDir: "build",
};

export default nextConfig;
