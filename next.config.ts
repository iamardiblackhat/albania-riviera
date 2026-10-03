import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Local sources are 1400px max, so cap derivatives there.
    deviceSizes: [640, 828, 1080, 1400],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

export default nextConfig
