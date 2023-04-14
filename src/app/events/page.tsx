import EventsList from './events-list'

import { getAllEvents } from '@/lib/keystatic-reads'

async function getData() {
  return await getAllEvents()
}

export default async function Page() {
  const allEvents = await getData()

  return <EventsList allEvents={allEvents} />
}
