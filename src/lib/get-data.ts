import { getCollection } from 'astro:content'
import { getStatus } from '@/lib/get-status'
import type { CollectionEntry } from 'astro:content'

export type Event = CollectionEntry<'events'>['data'] & {
  slug: string
  status: ReturnType<typeof getStatus>
}

// ------------------------------
// Events
// ------------------------------
export async function getEvents() {
  const allEvents: CollectionEntry<'events'>[] = await getCollection('events')
  const formattedEvents = allEvents
    .map((event): Event => ({
      slug: event.id,
      ...event.data,
      status: getStatus(event.data.date),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const futureEvents = formattedEvents.filter(
    (event) => event.status === 'UPCOMING' || event.status === 'TODAY'
  )
  const pastEvents = formattedEvents
    .filter((event) => event.status === 'PAST')
    .reverse()

  // If no events in the future, move the most recent past event to the future list
  if (futureEvents.length === 0 && pastEvents.length > 0) {
    const mostRecentEvent = pastEvents.shift()
    if (mostRecentEvent) futureEvents.push(mostRecentEvent)
  }

  return {
    futureEvents: futureEvents,
    nextEvent: futureEvents[0],
    pastEvents: pastEvents,
  }
}
