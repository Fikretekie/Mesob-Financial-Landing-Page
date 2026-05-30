const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: 'export', // Enables static site export in Next.js 13+
  images: {
    unoptimized: true, // Disables Next.js image optimization (useful for static hosting)
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      i18next: path.resolve(__dirname, "node_modules/i18next"),
      "react-i18next": path.resolve(__dirname, "node_modules/react-i18next"),
    };
    return config;
  },
};

module.exports = nextConfig;
