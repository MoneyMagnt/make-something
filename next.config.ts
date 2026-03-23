import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "zyragh.com" }],
        destination: "https://www.zyragh.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
