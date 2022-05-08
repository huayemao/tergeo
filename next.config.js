/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  concurrentFeatures: true,
  images: {
    domains: ['www.hyperui.dev'],
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
}
