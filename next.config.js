/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public'
  },
  reactStrictMode: false,
  concurrentFeatures: true,
  images: {
    domains: ['www.hyperui.dev'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/doc/:path*',
        destination: 'https://www.yuque.com/r/notes/share/:path*',
      },
    ]
  },
})
