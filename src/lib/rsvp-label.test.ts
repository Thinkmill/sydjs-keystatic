import { describe, expect, it } from 'vitest'

import { rsvpButtonLabel } from './rsvp-label'

describe('rsvpButtonLabel', () => {
  it('labels Meetup RSVP URLs', () => {
    expect(
      rsvpButtonLabel(
        'https://www.meetup.com/en-au/sydjs-classic/events/312469947/',
      ),
    ).toBe('RSVP on Meetup.com')
  })

  it('labels Humanitix RSVP URLs', () => {
    expect(
      rsvpButtonLabel('https://events.humanitix.com/open-source-social'),
    ).toBe('RSVP on Humanitix')
  })

  it('falls back to RSVP for other hosts', () => {
    expect(rsvpButtonLabel('https://example.com/tickets')).toBe('RSVP')
  })

  it('falls back to RSVP when the URL is missing', () => {
    expect(rsvpButtonLabel(undefined)).toBe('RSVP')
  })
})
