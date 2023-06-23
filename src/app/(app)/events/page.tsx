import { isFuture } from 'date-fns'
import { EventListingCard } from '@/components/event-card/listing'
import { getEvents } from '@/lib/get-data'
import {
  sharedOpenGraphMetadata,
  sharedTwitterMetadata,
} from '@/lib/shared-metadata'

const metaTitleAndDescription = {
  title: 'Events',
  description: 'A list of upcoming and past SydJS events.',
}

export const metadata = {
  ...metaTitleAndDescription,
  openGraph: {
    ...metaTitleAndDescription,
    ...sharedOpenGraphMetadata,
  },
  twitter: {
    ...metaTitleAndDescription,
    ...sharedTwitterMetadata,
  },
}

export default async function AllEvents() {
  const { futureEvents, pastEvents } = await getEvents()

  const isLastEventInTheFuture = isFuture(
    new Date(futureEvents[futureEvents.length - 1].date)
  )
  return (
    <>
      <div className="mx-auto mt-24 max-w-6xl px-6">
        <h1 className="text-5xl font-bold sm:text-6xl">SydJS events</h1>
        <p className="mt-8 text-2xl font-medium">
          Here’s the <del>full</del> partial (for the moment) list of SydJS
          events over the years.
        </p>
        <h2 className="mt-20 text-4xl font-bold">
          {isLastEventInTheFuture ? 'Upcoming' : 'Most recent event'}
        </h2>
      </div>
      {futureEvents.length > 0 && (
        <div className="mx-auto mt-8 max-w-7xl space-y-6 px-6">
          {futureEvents.map((event) => (
            <EventListingCard heading="h3" key={event.slug} slug={event.slug} />
          ))}
        </div>
      )}
      <div className="mx-auto mt-8 max-w-6xl px-6">
        <h2 className="mt-20 text-4xl font-bold">Past</h2>
      </div>
      <div className="mx-auto mt-8 max-w-6xl px-6">
        <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {pastEvents.map((event) => (
            <EventListingCard heading="h3" key={event.slug} slug={event.slug} />
          ))}
        </div>
      </div>
    </>
  )
}
