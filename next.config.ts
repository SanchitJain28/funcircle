import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.wikihow.com',
        // Optionally, you can specify a path or port
        // pathname: '/images/**', // Example: restrict to a specific path
        // port: '', // Specify a port if needed
      },
      // Add more patterns if needed
    ],
  }
};

export default nextConfig;
