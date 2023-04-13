import Image from 'next/image'
import Link from 'next/link'

import { createReader } from '@keystatic/core/reader'
import { DocumentRenderer } from '@keystatic/core/renderer'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import keystaticConfig from '../../../keystatic.config'

import Event from '@/components/event'

const reader = createReader('', keystaticConfig)

export async function getStaticProps(context: GetStaticPropsContext) {
  const slug = context.params?.slug
  if (!slug) throw new Error('Slug not found')

  const event = await reader.collections.events.read(slug as string, {
    resolveLinkedFiles: true,
  })
  if (!event) throw new Error('Event not found')

  const eventTalks = await Promise.all(
    event.talks.map(async (talkSlug) => {
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
    props: {
      event: {
        slug,
        ...event,
        talks: eventTalks,
      },
    },
  }
}

export async function getStaticPaths() {
  const eventSlugs = await reader.collections.events.list()

  return {
    paths: eventSlugs.map((slug) => ({
      params: { slug },
    })),
    fallback: true,
  }
}

export default function EventDetailsPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <div className="mx-auto mt-8 max-w-7xl space-y-6 px-6">
        <Event event={props.event} />
      </div>
      <div className="mx-auto mt-8 max-w-5xl px-6">
        <h2 className="mt-20 text-4xl font-bold">Talks</h2>
        <ul className="mt-12 grid gap-18">
          {props.event.talks.map((talk) => (
            <li key={talk.slug} className="max-w-xl">
              <h2 className="text-3xl font-bold">{talk.name}</h2>
              <ul className="mt-3 flex flex-wrap gap-x-10 gap-y-4">
                {talk.speakers &&
                  talk.speakers.slice(0, 2).map((speaker) => (
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
              <p className="mt-6 line-clamp-3 text-lg/6">{talk.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
