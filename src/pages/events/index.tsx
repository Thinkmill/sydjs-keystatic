import Link from 'next/link'
import Image from 'next/image'
import { InferGetStaticPropsType } from 'next'

import { createReader } from '@keystatic/core/reader'
import { DocumentRenderer } from '@keystatic/core/renderer'
import { ChevronRightIcon } from '@/components/svg-icons'

import { isFuture } from 'date-fns'

import keystaticConfig from '../../../keystatic.config'
import Event from '@/components/event'
import Button from '@/components/button'
import FeaturedEvent from '@/components/featured-event'
import PastEvent from '@/components/past-event'

export async function getStaticProps() {
  const reader = createReader('', keystaticConfig)
  const allEvents = await reader.collections.events.all({ resolveLinkedFiles: true })

  const allEventsWithSpeakers = await Promise.all(
    allEvents.map(async (event) => {
      // Get the speakers content
      const speakersData = await Promise.all(
        event.entry.speakers.map(async (speakerSlug) => {
          return {
            slug: speakerSlug,
            ...(await reader.collections.persons.read(speakerSlug)),
          }
        })
      )

      // Determine if the event is in the future, today or in the past
      const today = new Date()
      const eventDate = new Date(event.entry.date)

      const getStatus = () => {
        if (isFuture(eventDate)) return 'upcoming'
        if (eventDate.toDateString() === today.toDateString()) return 'today'
        return 'past'
      }

      return {
        ...event,
        status: getStatus(),
        entry: {
          ...event.entry,
          speakers: speakersData,
        },
      }
    })
  )

  const sortedEvents = allEventsWithSpeakers.sort(
    // @ts-ignore
    (a, b) => new Date(a.entry.date) - new Date(b.entry.date)
  )

  return {
    props: {
      allEvents: sortedEvents,
    },
  }
}

export default function AllEvents(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const upcomingEvents = props.allEvents.filter(
    (event) => event.status === 'upcoming' || event.status === 'today'
  )
  const extraUpcomingEventsCount = upcomingEvents.length - 3
  console.log
  const pastEvents = props.allEvents.filter((event) => event.status === 'past')
  return (
    <>
      <div className="mx-auto mt-24 max-w-6xl px-6">
        <h1 className="text-6xl font-bold">SydJS events</h1>
        <p className="mt-8 text-2xl font-medium">
          Here’s the full list of upcoming and past SydJS events.
        </p>
        <h2 className="mt-20 text-4xl font-bold">Upcoming</h2>
      </div>
      <div className="mx-auto mt-8 max-w-7xl space-y-6 px-6">
        {upcomingEvents.map((event) => (
          <Event key={event.slug} event={event} />
        ))}
        {extraUpcomingEventsCount > 0 && (
          <div className="flex justify-center">
            <Button emphasis="low" href="/events">
              Show {extraUpcomingEventsCount} more upcoming event
              {extraUpcomingEventsCount > 1 && 's'}
            </Button>
          </div>
        )}
      </div>
      <div className="mx-auto mt-8 max-w-6xl px-6">
        <h2 className="mt-20 text-4xl font-bold">Past</h2>
      </div>
      <div className="mx-auto mt-8 max-w-7xl px-6">
        <div className="grid grid-cols-3 gap-x-6 gap-y-12">
          {pastEvents.map((event) => (
            <Event key={event.slug} event={event} />
          ))}
        </div>
      </div>
    </>
  )
}
