import { getAdminPage, getFutureEvents, getPastEvents } from '@/lib/keystatic-reads'

import HomePage from './home-page'

async function getData() {
  const adminPage = await getAdminPage()
  const futureEvents = await getFutureEvents()
  const pastEvents = await getPastEvents()

  return {
    adminPage,
    nextEvent: futureEvents[0],
    pastEvents: pastEvents.slice(0, 3),
  }
}

export default async function Page() {
  const data = await getData()
  return <HomePage {...data} />
}
