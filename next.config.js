/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const cacheConfig = require('./lib/cache')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    importScripts: ['/worker.js'],
    runtimeCaching: cacheConfig
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
      {
        source: '/detail',
        destination: '/',
      },
    ]
  },
})
