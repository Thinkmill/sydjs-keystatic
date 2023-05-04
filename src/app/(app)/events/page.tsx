import EventsList from './events-list'

import { getEvents } from '@/lib/get-data'

export const metadata = {
  title: 'Events',
}

export default async function Page() {
  const events = await getEvents()
  return (
    <EventsList
      futureEvents={events.futureEvents}
      pastEvents={events.pastEvents}
    />
  )
}
