import type { MetadataRoute } from 'next'

/**
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SydJS',
    short_name: 'SydJS',
    description:
      'We are a community of JavaScript enthusiasts based in Sydney, Australia.',
    lang: 'en-AU',
    start_url: '/',
    display: 'minimal-ui',
    background_color: '#FFF',
    theme_color: '#FFE221',
    icons: [
      {
        src: '/images/sydjs.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/images/sydjs-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
