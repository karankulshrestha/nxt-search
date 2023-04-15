/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: false,
  },
  images: {
    domains: ["i.ytimg.com", "ipfs.io", "cdn.sanity.io"],
  }
}

module.exports = nextConfig
