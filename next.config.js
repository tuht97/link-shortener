/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
      },
      {
        hostname: "placekitten.com",
        protocol: "http",
      },
      {
        hostname: "ui.shadcn.com",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
