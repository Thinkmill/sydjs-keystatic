import { isFuture } from 'date-fns'
import { createReader, EntryWithResolvedLinkedFiles } from '@keystatic/core/reader'
import keystaticConfig from '../../keystatic.config'

import type { Status, EventEntryWithTalksAndSpeakers } from '@/components/event-card'

type EventsWithStatusAndSlug = EntryWithResolvedLinkedFiles<
  (typeof keystaticConfig)['collections']['events']
> & { status: Status; slug: string }

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
export async function getAllEvents(): Promise<EventsWithStatusAndSlug[]> {
  const allEvents = await reader.collections.events.all({ resolveLinkedFiles: true })
  const sortedEvents = allEvents
    .sort((a, b) => {
      return new Date(a.entry.date).getDate() - new Date(b.entry.date).getDate()
    })
    // Add status and slug to event flat object
    .map((event) => ({ slug: event.slug, status: getStatus(event.entry.date), ...event.entry }))
  return sortedEvents
}

export async function getAllEventSlugs(): Promise<string[]> {
  return await reader.collections.events.list()
}

export async function getFutureEvents(): Promise<EventsWithStatusAndSlug[]> {
  const events = await getAllEvents()
  if (!events) throw new Error('Events not found')
  return events.filter((event) => event.status !== 'past')
}

export async function getPastEvents(): Promise<EventsWithStatusAndSlug[]> {
  const events = await getAllEvents()
  if (!events) throw new Error('Events not found')
  return events.filter((event) => event.status === 'past')
}

// The type should be Promise<EventEntryWithTalksAndSpeakers> instead of Promise<any>, but
// I cannot get it to work 😅
export async function getEventBySlug(slug: string): Promise<any> {
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
    ...event,
    slug,
    status: getStatus(event.date),
    talks: eventTalks,
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
