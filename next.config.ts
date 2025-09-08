import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.wikihow.com",
        // Optionally, you can specify a path or port
        // pathname: '/images/**', // Example: restrict to a specific path
        // port: '', // Specify a port if needed
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "superblog.supercdn.cloud",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "5.imimg.com",
      },
      {
        protocol: "https",
        hostname: "thumbs.dreamstime.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "badmintonhq.co.uk",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },
      {
        protocol: "https",
        hostname: "img.olympics.com",
      },
      {
        protocol: "https",
        hostname: "cdn.britannica.com",
      },
       {
        protocol: "https",
        hostname: "dynamic-media-cdn.tripadvisor.com",
      },
    ],
  },
  compiler :{
    removeConsole:process.env.NODE_ENV==="production"
  }
};

export default nextConfig;
