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
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.tonykipkemboi.com' }],
        destination: 'https://tonykipkemboi.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
