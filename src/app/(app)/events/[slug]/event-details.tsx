'use client'

import Link from 'next/link'
import Image from 'next/image'

import EventCard from '@/components/event-card'
import { EventWithStatusAndSlug } from '@/lib/types'

export default function EventDetailsPage({ event }: any) {
  return (
    <>
      <div className="mx-auto mt-8 max-w-7xl space-y-6 px-6">
        <EventCard displayContext="details" event={event} />
      </div>
      {event.talks.length > 0 && (
        <div className="mx-auto mt-8 max-w-5xl px-6">
          <h2 className="mt-20 text-4xl font-bold">Talks</h2>
          <ul className="mt-12 grid gap-18">
            {event?.talks.map((talk: any) => (
              <li key={talk.slug} className="max-w-xl">
                <h2 className="text-3xl font-bold">{talk?.name}</h2>
                <ul className="mt-3 flex flex-wrap gap-x-10 gap-y-4">
                  {talk.speakers &&
                    talk.speakers.slice(0, 2).map((speaker: any) => (
                      <li
                        key={speaker.slug}
                        className="flex items-center gap-3"
                      >
                        <Image
                          src={`/images/avatars/${speaker.slug}/${speaker.avatar}`}
                          alt={`Avatar for ${speaker.name}`}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-xl object-cover"
                        />
                        <div>
                          <p className="text-sm/none font-medium">
                            By {speaker.name}
                          </p>
                          {speaker.twitterHandle && (
                            <Link
                              className="mt-1 text-sm/none font-semibold"
                              href={`https://twitter.com/${speaker.twitterHandle}`}
                            >
                              @{speaker.twitterHandle}
                            </Link>
                          )}
                        </div>
                      </li>
                    ))}
                </ul>
                <p className="mt-6 line-clamp-3 text-lg/6">
                  {talk.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
