import type { MetadataRoute } from 'next'

/**
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SydJS',
    short_name: 'SydJS',
    description:
      'Join the vibrant and inclusive community of web developers discussing the latest in JavaScript from Sydney, Australia.',
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
    screenshots: [
      {
        src: '/images/pwa-desktop.webp',
        sizes: '1440x1094',
        type: 'image/webp',
        // @ts-expect-error https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/screenshots#form_factor
        form_factor: 'wide',
      },
      {
        src: '/images/pwa-mobile.webp',
        sizes: '860x1820',
        type: 'image/webp',
        // @ts-expect-error
        form_factor: 'narrow',
      },
    ],
  }
}
