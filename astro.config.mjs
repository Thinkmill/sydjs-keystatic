import { defineConfig } from 'astro/config'
import markdoc from '@astrojs/markdoc'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

const base = process.env.BASE_PATH?.trim().replace(/\/$/, '') || '/'

export default defineConfig({
  site: 'https://sydjs.com',
  base,
  trailingSlash: 'always',
  output: 'static',
  outDir: './out',
  integrations: [markdoc(), react(), tailwind()],
})
