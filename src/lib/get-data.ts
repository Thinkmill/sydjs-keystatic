import { reader } from '@/app/keystatic/reader'
import { getStatus } from '@/lib/get-status'

// ------------------------------
// Events
// ------------------------------
export async function getEvents() {
  const allEvents = await reader.collections.events.all({
    resolveLinkedFiles: true,
  })
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

  return {
    futureEvents,
    nextEvent: futureEvents[0],
    pastEvents,
  }
}

// ------------------------------
// Admin Page
// ------------------------------
export async function getAdminPage() {
  const adminPage = await reader.singletons.admin.readOrThrow({
    resolveLinkedFiles: true,
  })
  return adminPage
}
