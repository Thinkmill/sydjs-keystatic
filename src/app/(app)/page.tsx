import { getAdminPage, getEvents } from '@/lib/get-data'

import HomePage from './home-page'

export default async function Page() {
  const events = await getEvents()
  const adminPage = await getAdminPage()
  return (
    <HomePage
      nextEvent={events.nextEvent}
      pastEvents={events.pastEvents}
      adminPage={adminPage}
    />
  )
}
