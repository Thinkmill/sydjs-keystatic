import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../../keystatic.config'
import { getStatus } from '@/lib/get-status'

import HomePage from './home-page'

async function getData() {
  const reader = createReader('', keystaticConfig)
  const adminPage = await reader.singletons.admin.read({
    resolveLinkedFiles: true,
  })
  if (!adminPage) throw new Error('Admin page not found')

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
    adminPage,
    nextEvent: futureEvents[0],
    pastEvents,
  }
}

export default async function Page() {
  const data = await getData()
  return <HomePage {...data} />
}
