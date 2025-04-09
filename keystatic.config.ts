import { config } from '@keystatic/core'
import type { LocalConfig, GitHubConfig } from '@keystatic/core'

// Schema
import admin from './src/app/keystatic/schema/singletons/admin'
import events from './src/app/keystatic/schema/collections/events'
import talks from './src/app/keystatic/schema/collections/talks'
import persons from './src/app/keystatic/schema/collections/persons'
import sponsors from './src/app/keystatic/schema/collections/sponsors'

// Storage strategy
const storage: LocalConfig['storage'] | GitHubConfig['storage'] =
  process.env.NODE_ENV === 'development'
    ? { kind: 'local' }
    : {
        kind: 'github',
        repo: {
          owner: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER!,
          name: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG!,
        },
      }

// Config
export default config({
  storage,
  collections: {
    events,
    talks,
    persons,
    // sponsors,
  },
  singletons: {
    admin,
  },
})
