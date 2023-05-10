'use client'

import Link from 'next/link'
import Image from 'next/image'
import { DocumentRenderer } from '@keystatic/core/renderer'

import YouTubeEmbed from '@/components/youtube-embed'
import EventDetailsCard from '@/components/event-card/details'

export default function EventDetailsPage({ event }: any) {
  return (
    <>
      <div className="mx-auto mt-8 max-w-[96rem] space-y-6 px-6">
        <EventDetailsCard event={event} />
      </div>
      {event.talks.length > 0 && (
        <div className="mx-auto mt-8 max-w-5xl px-6">
          <h2 className="mt-20 text-4xl font-bold">Talks</h2>
          <ul className="mt-12 grid gap-18">
            {event?.talks.map((talk: any) => (
              <li key={talk.slug} className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <h2 className="text-3xl font-bold">{talk?.name}</h2>
                  <ul className="mt-3 flex flex-wrap gap-x-10 gap-y-4">
                    {talk.speakers &&
                      talk.speakers.slice(0, 2).map((speaker: any) => (
                        <li
                          key={speaker.slug}
                          className="flex items-center gap-3"
                        >
                          <Image
                            src={speaker.avatar}
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
                                className="text-sm/none font-semibold"
                                href={`https://twitter.com/${speaker.twitterHandle}`}
                              >
                                @{speaker.twitterHandle}
                              </Link>
                            )}
                          </div>
                        </li>
                      ))}
                  </ul>
                  <div className="prose mt-6">
                    <DocumentRenderer document={talk.description} />
                  </div>
                </div>
                <div>
                  {talk.image && !talk.video && (
                    <Image
                      className="aspect-video rounded-2xl object-cover"
                      src={talk.image}
                      alt=""
                      height={720}
                      width={480}
                    />
                  )}
                  {talk.video && (
                    <YouTubeEmbed
                      videoUrl={talk.video}
                      className="rounded-2xl"
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
