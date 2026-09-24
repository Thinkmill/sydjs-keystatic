export const prerender = true

export function GET() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  const asset = (path: string) => `${base}${path}`
  const manifest = {
    name: 'SydJS',
    short_name: 'SydJS',
    description:
      'Join the vibrant and inclusive community of web developers discussing the latest in JavaScript from Sydney, Australia.',
    lang: 'en-AU',
    start_url: `${base}/`,
    display: 'minimal-ui',
    background_color: '#FFF',
    theme_color: '#FFE221',
    icons: [
      {
        src: asset('/images/sydjs.svg'),
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: asset('/images/sydjs-512.png'),
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    screenshots: [
      {
        src: asset('/images/pwa-desktop.webp'),
        sizes: '1440x1094',
        type: 'image/webp',
        form_factor: 'wide',
        label: 'SydJS homepage',
      },
      {
        src: asset('/images/pwa-desktop-2.webp'),
        sizes: '1440x1094',
        type: 'image/webp',
        form_factor: 'wide',
        label: 'SydJS talks',
      },
      {
        src: asset('/images/pwa-mobile.webp'),
        sizes: '860x1820',
        type: 'image/webp',
        form_factor: 'narrow',
        label: 'SydJS homepage',
      },
      {
        src: asset('/images/pwa-mobile-2.webp'),
        sizes: '860x1820',
        type: 'image/webp',
        form_factor: 'narrow',
        label: 'SydJS events',
      },
      {
        src: asset('/images/pwa-mobile-3.webp'),
        sizes: '860x1820',
        type: 'image/webp',
        form_factor: 'narrow',
        label: 'SydJS talks',
      },
    ],
  }

  return new Response(JSON.stringify(manifest), {
    headers: { 'Content-Type': 'application/manifest+json' },
  })
}
