import { describe, expect, it } from 'vitest'

import { getPagesBasePath, withBasePath } from './base-path'

describe('getPagesBasePath', () => {
  it('returns empty for production (no BASE_PATH)', () => {
    expect(getPagesBasePath({})).toBe('')
    expect(getPagesBasePath({ BASE_PATH: '' })).toBe('')
    expect(getPagesBasePath({ BASE_PATH: '/' })).toBe('')
  })

  it('normalises a PR preview subdirectory', () => {
    expect(getPagesBasePath({ BASE_PATH: '/pr-preview/pr-12' })).toBe(
      '/pr-preview/pr-12',
    )
    expect(getPagesBasePath({ BASE_PATH: '/pr-preview/pr-12/' })).toBe(
      '/pr-preview/pr-12',
    )
    expect(getPagesBasePath({ BASE_PATH: '  /pr-preview/pr-12/  ' })).toBe(
      '/pr-preview/pr-12',
    )
  })
})

describe('withBasePath', () => {
  it('leaves paths unchanged when there is no base path', () => {
    expect(withBasePath('/images/speaker.png', '')).toBe('/images/speaker.png')
  })

  it('prefixes root-relative assets for preview builds', () => {
    expect(withBasePath('/images/speaker.png', '/pr-preview/pr-12')).toBe(
      '/pr-preview/pr-12/images/speaker.png',
    )
  })

  it('does not double-prefix or rewrite external URLs', () => {
    expect(
      withBasePath('/pr-preview/pr-12/images/speaker.png', '/pr-preview/pr-12'),
    ).toBe('/pr-preview/pr-12/images/speaker.png')
    expect(withBasePath('https://sydjs.com/images/speaker.png', '/pr-preview/pr-12')).toBe(
      'https://sydjs.com/images/speaker.png',
    )
  })
})
