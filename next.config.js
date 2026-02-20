/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: 'export', // Enables static site export in Next.js 13+
  images: {
    unoptimized: true, // Disables Next.js image optimization (useful for static hosting)
  },
};

module.exports = nextConfig;
