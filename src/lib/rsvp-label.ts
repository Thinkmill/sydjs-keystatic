/** Button copy for an event RSVP URL. Meetup is the usual host; this event uses Humanitix. */
export function rsvpButtonLabel(url: string | undefined): string {
  if (!url) return 'RSVP'
  try {
    const host = new URL(url).hostname.replace(/^www\./, '')
    if (host === 'meetup.com' || host.endsWith('.meetup.com')) {
      return 'RSVP on Meetup.com'
    }
    if (host === 'humanitix.com' || host.endsWith('.humanitix.com')) {
      return 'RSVP on Humanitix'
    }
  } catch {
    // Invalid URL — fall through to a generic label.
  }
  return 'RSVP'
}
