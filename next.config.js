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
  trailingSlash: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/doc/:path*',
        destination: 'https://www.yuque.com/r/notes/share/:path*',
      },
    ]
  },
})
