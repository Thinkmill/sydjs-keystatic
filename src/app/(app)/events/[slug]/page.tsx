import EventDetails from './event-details'

import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../../../../../keystatic.config'
import { getStatus } from '@/lib/get-status'

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const reader = createReader('', keystaticConfig)
  const event = await reader.collections.events.read(slug, {})
  // TODO: add meta description, og image etc
  return { title: event?.name }
}

async function getData(slug: string) {
  const reader = createReader('', keystaticConfig)
  const event = await reader.collections.events.read(slug, {
    resolveLinkedFiles: true,
  })
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

export default async function Page(context: any) {
  const { slug } = context.params
  if (!slug) throw new Error('Slug not found')
  const event = await getData(slug)
  return <EventDetails event={event} />
}

export const dynamicParams = true

export async function generateStaticParams() {
  const reader = createReader('', keystaticConfig)
  const eventSlugs = await reader.collections.events.list()
  return eventSlugs.map((slug) => ({ slug }))
}
