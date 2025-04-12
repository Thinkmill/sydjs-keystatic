import { describe, expect, it } from 'vitest'
import getPersonLinks from './get-person-links'

describe('get-person-links', () => {
  it('supports bluesky', () => {
    expect(
      getPersonLinks({
        bluesky: 'example.bsky.social',
      })
    ).toEqual([
      expect.objectContaining({
        key: 'bluesky',
        label: '@example',
        url: 'https://bsky.app/profile/example.bsky.social',
      }),
    ])
  })

  it('supports bluesky alternate domains', () => {
    expect(
      getPersonLinks({
        bluesky: 'example.com',
      })
    ).toEqual([
      expect.objectContaining({
        key: 'bluesky',
        label: '@example.com',
        url: 'https://bsky.app/profile/example.com',
      }),
    ])
  })

  it('supports linkedIn usernames', () => {
    expect(
      getPersonLinks({
        linkedin: 'example-user-1234abcd',
      })
    ).toEqual([
      expect.objectContaining({
        key: 'linkedin',
        label: '@example-user',
        url: 'https://linkedin.com/in/example-user-1234abcd',
      }),
    ])
  })

  it('supports mastodon.social links', () => {
    expect(
      getPersonLinks({
        mastodon: 'https://mastodon.social/@example',
      })
    ).toEqual([
      expect.objectContaining({
        key: 'mastodon',
        label: '@example',
        url: 'https://mastodon.social/@example',
      }),
    ])
  })

  it('supports other mastodon servers', () => {
    expect(
      getPersonLinks({
        mastodon: 'https://aus.social/@example',
      })
    ).toEqual([
      expect.objectContaining({
        key: 'mastodon',
        label: '@example',
        url: 'https://aus.social/@example',
      }),
    ])
  })

  it('supports websites', () => {
    expect(
      getPersonLinks({
        website: 'https://example.com',
      })
    ).toEqual([
      expect.objectContaining({
        key: 'website',
        label: 'example.com',
        url: 'https://example.com',
      }),
    ])
  })

  it('ignores non-link properties', () => {
    expect(
      getPersonLinks({
        name: 'Example Person',
      })
    ).toEqual([])
  })

  it('respects sort order', () => {
    expect(
      getPersonLinks({
        website: 'https://example.com',
        bluesky: 'example.bsky.social',
      })
    ).toEqual([
      expect.objectContaining({
        key: 'bluesky',
        label: '@example',
        url: 'https://bsky.app/profile/example.bsky.social',
      }),
      expect.objectContaining({
        key: 'website',
        label: 'example.com',
        url: 'https://example.com',
      }),
    ])
  })
})
