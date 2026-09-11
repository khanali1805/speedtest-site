
/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  swcMinify: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [32, 48, 64, 96, 128, 256, 384, 512],
    imageSizes: [16, 32, 48, 64, 96],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    optimizePackageImports: ['geist'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/logo.png',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};
module.exports = nextConfig;
