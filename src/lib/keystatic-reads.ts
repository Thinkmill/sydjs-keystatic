import { isFuture } from 'date-fns'
import { createReader, EntryWithResolvedLinkedFiles } from '@keystatic/core/reader'
import keystaticConfig from '../../keystatic.config'

import type { Status, EventProps } from '@/components/event'

const reader = createReader('', keystaticConfig)

function getStatus(date: string): Status {
  // Determine if the event is in the future, today or in the past
  const today = new Date()
  const eventDate = new Date(date)

  if (isFuture(eventDate)) return 'upcoming'
  if (eventDate.toDateString() === today.toDateString()) return 'today'
  return 'past'
}

// Get all events sorted by chronological order
export async function getAllEvents(): Promise<EventProps[]> {
  const allEvents = await reader.collections.events.all({ resolveLinkedFiles: true })
  return allEvents
    .sort(
      // @ts-ignore
      (a, b) => new Date(a.entry.date) - new Date(b.entry.date)
    )
    .map((event) => {
      // Determine if the event is in the future, today or in the past

      return { slug: event.slug, ...event.entry, status: getStatus(event.entry.date) }
    })
}

export async function getAllEventSlugs(): Promise<string[]> {
  return await reader.collections.events.list()
}

export async function getFutureEvents(): Promise<EventProps[]> {
  const events = await getAllEvents()
  if (!events) throw new Error('Events not found')
  return events.filter((event) => event.status !== 'past')
}

export async function getPastEvents(): Promise<EventProps[]> {
  const events = await getAllEvents()
  if (!events) throw new Error('Events not found')
  return events.filter((event) => event.status === 'past')
}

export async function getEventBySlug(slug: string): Promise<EventProps> {
  const event = await reader.collections.events.read(slug, { resolveLinkedFiles: true })
  if (!event) throw new Error('Keystatic read helper: Event not found')

  const eventTalks = await Promise.all(
    event?.talks.map(async (talkSlug) => {
      // Get talk data
      const talk = await reader.collections.talks.read(talkSlug)
      if (!talk) throw new Error('Talk not found')

      // Get Speakers for each talk
      const speakers = await Promise.all(
        talk.speakers.map(async (speakerSlug) => ({
          slug: speakerSlug,
          ...(await reader.collections.persons.read(speakerSlug)),
        }))
      )
      return {
        slug: talkSlug,
        ...talk,
        speakers,
      }
    })
  )

  return {
    slug,
    ...event,
    talks: eventTalks,
    status: getStatus(event.date),
  }
}

// Admin Singleton
export async function getAdminPage(): Promise<
  EntryWithResolvedLinkedFiles<(typeof keystaticConfig)['singletons']['admin']>
> {
  const adminPage = await reader.singletons.admin.read({ resolveLinkedFiles: true })
  if (!adminPage) throw new Error('Admin page not found')
  return adminPage
}
