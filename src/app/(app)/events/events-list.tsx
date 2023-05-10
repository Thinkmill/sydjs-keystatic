'use client'
import { isFuture } from 'date-fns'

import EventListingCard from '@/components/event-card/listing'

import type { EventWithStatusAndSlug } from '@/lib/types'

export default function AllEvents({
  futureEvents,
  pastEvents,
}: {
  futureEvents: EventWithStatusAndSlug[]
  pastEvents: EventWithStatusAndSlug[]
}) {
  const isLastEventInTheFuture = isFuture(
    new Date(futureEvents[futureEvents.length - 1].date)
  )
  return (
    <>
      <div className="mx-auto mt-24 max-w-6xl px-6">
        <h1 className="text-6xl font-bold">SydJS events</h1>
        <p className="mt-8 text-2xl font-medium">
          Here’s the full list of upcoming and past SydJS events.
        </p>
        <h2 className="mt-20 text-4xl font-bold">
          {isLastEventInTheFuture ? 'Upcoming' : 'Most recent event'}
        </h2>
      </div>
      {futureEvents.length > 0 && (
        <div className="mx-auto mt-8 max-w-7xl space-y-6 px-6">
          {futureEvents.map((event) => (
            <EventListingCard key={event.slug} event={event} />
          ))}
        </div>
      )}
      <div className="mx-auto mt-8 max-w-6xl px-6">
        <h2 className="mt-20 text-4xl font-bold">Past</h2>
      </div>
      <div className="mx-auto mt-8 max-w-6xl px-6">
        <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {pastEvents.map((event) => (
            <EventListingCard key={event.slug} event={event} />
          ))}
        </div>
      </div>
    </>
  )
}
