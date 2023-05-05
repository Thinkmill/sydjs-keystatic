import EventDetails from './event-details'
import { reader } from '@/app/keystatic/reader'
import { getStatus } from '@/lib/get-status'

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const event = await reader.collections.events.readOrThrow(slug, {
    resolveLinkedFiles: true,
  })
  // TODO: add meta description, og image etc
  return { title: event?.name }
}

async function getData(slug: string) {
  const event = await reader.collections.events.readOrThrow(slug, {
    resolveLinkedFiles: true,
  })

  const eventTalks = await Promise.all(
    event?.talks.map(async (talkSlug) => {
      // Get talk data
      const talk = await reader.collections.talks.readOrThrow(talkSlug, {
        resolveLinkedFiles: true,
      })

      // Get Speakers for each talk
      const speakers = await Promise.all(
        talk.speakers.map(async (speakerSlug) => ({
          slug: speakerSlug,
          ...(await reader.collections.persons.readOrThrow(speakerSlug)),
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

export default async function Page({ params }: any) {
  const { slug } = params
  if (!slug) throw new Error('Slug not found')
  const event = await getData(slug)
  return <EventDetails event={event} />
}

export const dynamicParams = true

export async function generateStaticParams() {
  const eventSlugs = await reader.collections.events.list()
  return eventSlugs.map((slug) => ({ slug }))
}
