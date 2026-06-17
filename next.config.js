/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
    ],
  },
  allowedDevOrigins: ['10.0.0.249'],
  turbopack: {
    root: __dirname,
  },
}

module.exports = nextConfig
