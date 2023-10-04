/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'tonomyai.netlify.app'],
  },
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
