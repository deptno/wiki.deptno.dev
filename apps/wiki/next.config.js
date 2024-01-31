module.exports = {
  reactStrictMode: true,
  transpilePackages: ['ui'],
  output: 'export',
  async redirects() {
    return [
      {
        source: '/wiki/:md*',
        destination: 'public-wiki/:md*',
        permanent: true,
      },
    ]
  },
}
