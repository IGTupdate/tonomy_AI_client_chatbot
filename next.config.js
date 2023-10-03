/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/widget/:path*',
        destination: '/widget',
      },
    ];
  },
};

module.exports = nextConfig;
