/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://bonafresco79.pythonanywhere.com/:path*',
      },
    ]
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
