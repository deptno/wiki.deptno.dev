/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ui'],
  // output: 'export',
  async rewrites() {
    return [
      {
        source: '/api/meili/:path*',
        destination: 'http://search:7700/:path*', // docker 내부 서비스명
      },
    ]
  },
}
module.exports = nextConfig
