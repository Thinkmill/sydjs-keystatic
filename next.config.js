/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/events/syd-js-returns-in-2023',
        destination: '/events/thinkmill-takes-over-syd-js',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
