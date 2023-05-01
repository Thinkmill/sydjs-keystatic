import EventsList from './events-list'

import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../../../../keystatic.config'

import { getStatus } from '@/lib/get-status'

async function getData() {
  const reader = createReader('', keystaticConfig)
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
  const pastEvents = formattedEvents.filter((event) => event.status === 'PAST')

  return {
    futureEvents,
    pastEvents,
  }
}

export default async function Page() {
  const data = await getData()
  return <EventsList {...data} />
}
