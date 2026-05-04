/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  trailingSlash: true,
  // Disable font optimization
  optimizeFonts: false,
}

module.exports = nextConfig