import { reader } from '@/app/keystatic/reader'
import { getStatus } from '@/lib/get-status'

// ------------------------------
// Events
// ------------------------------
export async function getEvents() {
  const allEvents = await reader.collections.events.all()
  const formattedEvents = allEvents
    .map((event) => ({
      slug: event.slug,
      ...event.entry,
      status: getStatus(event.entry.date),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const futureEvents = formattedEvents.filter(
    (event) => event.status === 'UPCOMING' || event.status === 'TODAY'
  )
  const pastEvents = formattedEvents
    .filter((event) => event.status === 'PAST')
    .reverse()

  // If no events in the future, move the most recent past event to the future list
  if (futureEvents.length === 0) {
    const mostRecentEvent = pastEvents.shift()
    futureEvents.push(mostRecentEvent as any)
  }

  return {
    futureEvents: futureEvents,
    nextEvent: futureEvents[0],
    pastEvents: pastEvents,
  }
}
