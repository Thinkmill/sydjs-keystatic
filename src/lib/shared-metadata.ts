import { Metadata } from 'next'

const seoImagePath = '/images/seo-image.png'

export const sharedOpenGraphMetadata: Metadata['openGraph'] = {
  locale: 'en_AU',
  url: 'https://sydjs.com',
  images: [{ url: seoImagePath, width: 1200, height: 630, alt: 'SydJS' }],
}

export const sharedTwitterMetadata: Metadata['twitter'] = {
  site: '@sydjs',
  creator: '@sydjs',
  card: 'summary_large_image',
  images: [
    {
      url: seoImagePath,
      width: 1200,
      height: 630,
      alt: 'SydJS',
    },
  ],
}
