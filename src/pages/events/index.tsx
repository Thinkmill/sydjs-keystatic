import Link from 'next/link'
import Image from 'next/image'

import { createReader } from '@keystatic/core/reader'
import { DocumentRenderer } from '@keystatic/core/renderer'
import { InferGetStaticPropsType } from 'next'

import keystaticConfig from '../../../keystatic.config'
import FeaturedEvent from '@/components/featured-event'
import PastEvent from '@/components/past-event'

export async function getStaticProps() {
  const reader = createReader('', keystaticConfig)
  const allEvents = await reader.collections.events.all({ resolveLinkedFiles: true })

  const allEventsWithSpeakers = await Promise.all(
    allEvents.map(async (event) => {
      const speakersData = await Promise.all(
        event.entry.speakers.map(async (speakerSlug) => {
          return {
            slug: speakerSlug,
            ...(await reader.collections.persons.read(speakerSlug)),
          }
        })
      )
      return {
        ...event,
        entry: {
          ...event.entry,
          speakers: speakersData,
        },
      }
    })
  )

  return {
    props: {
      allEvents: allEventsWithSpeakers,
    },
  }
}

export default function AllEvents(props: InferGetStaticPropsType<typeof getStaticProps>) {
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
        <FeaturedEvent />
        <FeaturedEvent />
      </div>
      <div className="mx-auto mt-8 max-w-6xl px-6">
        <h2 className="mt-20 text-4xl font-bold">Past</h2>
      </div>
      <div className="mx-auto mt-8 max-w-7xl px-6">
        <div className="grid grid-cols-3 gap-x-6 gap-y-12">
          <PastEvent />
          <PastEvent />
          <PastEvent />
          <PastEvent />
          <PastEvent />
          <PastEvent />
          <PastEvent />
          <PastEvent />
          <PastEvent />
        </div>
      </div>
      <div className="mx-auto mt-24 max-w-6xl px-6">
        <ul className="mt-12 grid gap-18">
          {props.allEvents.map(({ slug, entry }) => (
            <li key={slug} className="max-w-xl">
              <Link href={`/events/${slug}`} className="hover:underline">
                <h2 className="text-3xl font-bold">{entry.name}</h2>
              </Link>
              <ul className="mt-3 flex flex-wrap gap-x-10 gap-y-4">
                {entry.speakers.slice(0, 2).map((speaker) => (
                  <li key={speaker.slug} className="flex gap-3">
                    <Image
                      src={`/images/avatars/${speaker.slug}/${speaker.avatar}`}
                      alt={`Avatar for ${speaker.name}`}
                      width={40}
                      height={40}
                      className="h-8 w-8 rounded-xl object-cover"
                    />
                    <div>
                      <p className="text-sm/none font-medium">By {speaker.name}</p>
                      <p className="mt-1 text-sm/none font-semibold">@yoloooo</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 line-clamp-3 space-y-4 text-lg/6">
                <DocumentRenderer document={entry.description} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
