import { NextConfig } from 'next'

import { getPagesBasePath } from './src/lib/base-path'

const isStaticExport = process.env.STATIC_EXPORT === 'true'
const basePath = getPagesBasePath()

const nextConfig: NextConfig = {
  reactStrictMode: false,
  ...(isStaticExport && {
    output: 'export',
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
    ...(basePath && { basePath }),
    env: {
      NEXT_PUBLIC_BASE_PATH: basePath,
    },
  }),
}

module.exports = nextConfig
