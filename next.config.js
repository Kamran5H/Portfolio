/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  experimental: { cpus: 2 },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
