import EventDetails from './event-details'
import { getAllEventSlugs, getEventBySlug } from '@/lib/keystatic-reads'

async function getData(slug: string) {
  return await getEventBySlug(slug)
}

export default async function Page(context) {
  const { slug } = context.params
  if (!slug) throw new Error('Slug not found')
  const event = await getData(slug)
  return <EventDetails event={event} />
}

export const dynamicParams = true

export async function generateStaticParams() {
  const eventSlugs = await getAllEventSlugs()
  return eventSlugs.map((slug) => ({ slug }))
}
