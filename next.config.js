const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets a local production build run beside the dev server without sharing .next
  distDir: process.env.NEXT_DIST_DIR || '.next',
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
