/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

// module.exports = nextConfig
// next.config.js
module.exports = {
  future: {
    webpack5: true,
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

