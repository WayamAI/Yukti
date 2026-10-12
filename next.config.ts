import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },

  // Hides the dev-only badge and its "Compiling…" toast. Compile and runtime
  // errors are still surfaced — this only removes the on-screen indicator.
  devIndicators: false,
};

export default nextConfig;
