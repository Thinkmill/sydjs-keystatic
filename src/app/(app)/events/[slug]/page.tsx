import { reader } from '@/app/keystatic/reader'
import { EventDetailsCard } from '@/components/event-card/details'
import YouTubeEmbed from '@/components/youtube-embed'
import { asyncComponent } from '@/lib/async-component'
import { DocumentRenderer } from '@keystatic/core/renderer'
import Image from 'next/image'
import Link from 'next/link'
import { getStatus, Status } from '@/lib/get-status'
import {
  sharedOpenGraphMetadata,
  sharedTwitterMetadata,
} from '@/lib/shared-metadata'

import { FeaturedMedia } from '@/components/featured-media'

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const event = await reader.collections.events.readOrThrow(slug, {
    resolveLinkedFiles: true,
  })

  const metaTitleAndMaybeDescription: {
    title: string
    description?: string
  } = {
    title: event.name,
  }

  if (event?.seoDescription) {
    metaTitleAndMaybeDescription['description'] = event.seoDescription
  }

  return {
    ...metaTitleAndMaybeDescription,
    openGraph: {
      ...metaTitleAndMaybeDescription,
      ...sharedOpenGraphMetadata,
    },
    twitter: {
      ...metaTitleAndMaybeDescription,
      ...sharedTwitterMetadata,
    },
  }
}

export async function generateStaticParams() {
  const eventSlugs = await reader.collections.events.list()
  return eventSlugs.map((slug) => ({ slug }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <div className="mx-auto mt-8 max-w-[96rem] space-y-6 px-6">
        <EventDetailsCard heading="h1" slug={params.slug} />
      </div>
      <EventTalks slug={params.slug} />
    </>
  )
}

const EventTalks = asyncComponent(async function EventTalks(props: {
  slug: string
}) {
  const event = await reader.collections.events.readOrThrow(props.slug)

  return (
    <div className="mx-auto mt-8 max-w-5xl px-6">
      <h2 className="mt-20 text-4xl font-bold">Talks</h2>
      {event.talks.length > 0 ? (
        <ul className="mt-12 grid gap-18">
          {event.talks.map((talk) => (
            <EventTalk key={talk} talk={talk} status={getStatus(event.date)} />
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-lg">
          No information about talks available for this event.
        </p>
      )}
    </div>
  )
})

const EventTalk = asyncComponent(async function EventTalk(props: {
  talk: string
  status: Status
}) {
  const talk = await reader.collections.talks.readOrThrow(props.talk, {
    resolveLinkedFiles: true,
  })
  return (
    <li className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <h3 className="text-3xl font-bold">{talk.name}</h3>
        <ul className="mt-3 flex flex-wrap gap-x-10 gap-y-4">
          {talk.speakers &&
            talk.speakers
              .slice(0, 2)
              .map((speaker) => (
                <TalkSpeaker key={speaker} speaker={speaker} />
              ))}
        </ul>
        <div className="prose mt-6">
          <DocumentRenderer document={talk.description} />
        </div>
      </div>
      <div>
        {talk.featuredMedia.discriminant !== 'none' && (
          <FeaturedMedia
            media={talk.featuredMedia}
            status={props.status}
            kind="talk"
          />
        )}
      </div>
    </li>
  )
})

const TalkSpeaker = asyncComponent(async function TalkSpeaker(props: {
  speaker: string
}) {
  const speaker = await reader.collections.persons.readOrThrow(props.speaker)
  return (
    <li className="flex items-center gap-3">
      {speaker.avatar && (
        <Image
          src={speaker.avatar}
          alt={`Avatar for ${speaker.name}`}
          width={40}
          height={40}
          className="h-10 w-10 rounded-xl object-cover"
        />
      )}
      <div>
        <p className="text-sm/none font-medium">By {speaker.name}</p>
        {speaker.twitterHandle && (
          <Link
            className="text-sm/none font-semibold"
            href={`https://twitter.com/${speaker.twitterHandle}`}
          >
            @{speaker.twitterHandle}
          </Link>
        )}
      </div>
    </li>
  )
})
