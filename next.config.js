module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/cabinet',
        permanent: true,
      },
    ]
  },
}
