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
    ],
  },
};

module.exports = nextConfig;
