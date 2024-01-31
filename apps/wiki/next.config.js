module.exports = {
  reactStrictMode: true,
  transpilePackages: ['ui'],
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
