/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", ""],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    return config;
  },
};

module.exports = withPWA(nextConfig);

// /** @type {import('next').NextConfig} */
// const runtimeCaching = require("next-pwa/cache");
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ["localhost", ""],
//   },
// };
// const withPWA = require("next-pwa")({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
//   disable: process.env.NODE_ENV === "development",
// });
// module.exports = withPWA(nextConfig);
