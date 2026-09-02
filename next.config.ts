import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/free-freelance-tax-calculator',
        destination: '/',
        permanent: true, // Sends HTTP 301 to Googlebot
      },
    ];
  },
};

export default nextConfig;
