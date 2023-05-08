// TODO: Refactor this, there is too much complexity between the
// displayContext, the event status, featured media and
// container queries.

// It's a good prototype, but it needs to be simplified!

import Image from 'next/image'
import { format } from 'date-fns'
import clsx from 'clsx'
import { DocumentRenderer } from '@keystatic/core/renderer'

import type { EventWithStatusAndSlug } from '@/lib/types'
import YouTubeEmbed from './youtube-embed'
import Button from './button'
import {
  CalendarClearOutlineIcon,
  DesktopIcon,
  ClockIcon,
  LocationOutlineIcon,
  OpenOutlineIcon,
} from './svg-icons'
import { TextLink } from './text-link'

type DisplayContext = 'listing' | 'details'

export type EventCardProps = {
  displayContext?: DisplayContext
} & {
  event: EventWithStatusAndSlug
}

const eventStatusClasses: Record<EventCardProps['event']['status'], string> = {
  UPCOMING: 'bg-highlight',
  TODAY: 'bg-highlight',
  PAST: 'bg-accent',
}

export default function EventCard({
  displayContext = 'listing',
  event,
}: EventCardProps) {
  let featuredMedia = !!event.feature.length

  const eventMeta = [
    {
      icon: CalendarClearOutlineIcon,
      text: event.date
        ? format(new Date(event.date), 'EEEE, d MMMM yyy')
        : 'no  date',
    },
    {
      icon: ClockIcon,
      text: `${event.startTime} — ${event.endTime}`,
      secondary: true,
    },
    { icon: LocationOutlineIcon, text: event.location, details: event.address },
    { icon: DesktopIcon, text: 'Online event', secondary: true },
  ]
  return (
    // We're using container queries here!
    // The wrapped is flagged as a `@container`
    // and then the `@4xl` will trigger accordingly!
    <div className="h-full @container">
      {/* ---------------------------- */}
      {/* Wide layout (@4xl and wider) */}
      {/* ---------------------------- */}
      <div className="hidden @4xl:block">
        <div
          className={clsx(
            'rounded-t-[40px] p-16',
            !featuredMedia && 'rounded-b-[40px]',
            eventStatusClasses[event.status]
          )}
        >
          <div
            className={clsx(
              displayContext === 'details' && 'mx-auto max-w-6xl px-6 lg:px-8'
            )}
          >
            <span className="inline-block rounded-full border-2 border-black px-4 py-1.5 text-sm font-bold leading-none">
              {event.status === 'PAST' ? 'past' : 'upcoming'} event
            </span>

            <div className="grid gap-16 md:grid-cols-3 xl:gap-28">
              <div className="md:col-span-2">
                <h2 className="mt-8 text-4xl font-bold">{event.name}</h2>
                <div className="mt-4 space-y-4 text-lg">
                  <DocumentRenderer document={event.description} />
                </div>
                {/* Listing */}
                {displayContext === 'listing' && (
                  <div className="mt-6 flex items-center gap-4">
                    <Button href={`/events/${event.slug}`} size="large">
                      View events details
                    </Button>
                    {event?.status !== 'PAST' && (
                      <Button
                        href="#"
                        size="large"
                        emphasis="low"
                        iconPosition="after"
                        icon={OpenOutlineIcon}
                      >
                        RSVP on Lu.ma
                      </Button>
                    )}
                  </div>
                )}

                {/* Event details */}
                {displayContext === 'details' && (
                  <div className="mt-8 flex items-center gap-4">
                    {event?.status !== 'PAST' && (
                      <Button
                        href="#"
                        size="large"
                        emphasis="high"
                        iconPosition="after"
                        icon={OpenOutlineIcon}
                      >
                        RSVP on Lu.ma
                      </Button>
                    )}
                  </div>
                )}
              </div>
              <ul className="space-y-4">
                {eventMeta.map((event) => {
                  const Icon = event.icon
                  return (
                    <li
                      key={event.text}
                      className={clsx(
                        'flex gap-3',
                        event.details ? 'items-start' : 'items-center'
                      )}
                    >
                      <div className="shrink-0 rounded-xl bg-black/10 p-2.5">
                        <Icon className="h-5 w-5 fill-black" />
                      </div>
                      <div>
                        <p
                          className={clsx(
                            'text-lg font-medium',
                            event.details && 'mt-1.5'
                          )}
                        >
                          {event.text}
                        </p>
                        {event.details && (
                          <p className="text-sm">{event.details}</p>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
        {/* Featured media */}
        {displayContext === 'details' && featuredMedia && (
          <div className="before:l-0 relative  before:absolute before:h-1/2 before:w-full before:rounded-b-[40px] before:bg-highlight before:content-['']">
            <div className="relative px-4 lg:px-8">
              {event.feature[0].discriminant === 'image' && (
                <Image
                  className="mx-auto aspect-video max-w-6xl rounded-2xl object-cover"
                  src={event.feature[0].value.asset}
                  alt={event.feature[0].value.alt}
                  width={1200}
                  height={675}
                />
              )}
              {event.feature[0].discriminant === 'video' && (
                <YouTubeEmbed
                  className="mx-auto aspect-video max-w-6xl rounded-2xl object-cover"
                  videoUrl={event.feature[0].value.url}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* ---------------------------- */}
      {/* Narrow layout (up to @4xl) */}
      {/* ---------------------------- */}
      <div className="block h-full @4xl:hidden">
        <div
          className={clsx(
            'h-full rounded-[40px] p-10',
            eventStatusClasses[event.status]
          )}
        >
          {event?.status !== 'PAST' && (
            <span className="mb-4 inline-block rounded-full border-2 border-black px-4 py-1.5 text-sm font-bold leading-none">
              upcoming event
            </span>
          )}
          <TextLink href={`/events/${event.slug}`}>
            <h2 className="line-clamp-2 text-2xl font-bold">{event.name}</h2>
          </TextLink>
          <ul className="mt-6 space-y-4">
            {eventMeta
              .filter((event) => !event.secondary)
              .map((event) => {
                const Icon = event.icon
                return (
                  <li key={event.text} className="flex items-center gap-3">
                    <div className="shrink-0 rounded-xl bg-black/10 p-2.5">
                      <Icon className="h-5 w-5 stroke-black" />
                    </div>
                    <span className="text-lg/6 font-medium">{event.text}</span>
                  </li>
                )
              })}
          </ul>
          <div className="mt-8 line-clamp-[7] space-y-4 text-lg/6">
            <DocumentRenderer document={event.description} />
          </div>

          {event.status !== 'PAST' && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {displayContext === 'listing' && (
                <Button href={`/events/${event.slug}`} size="large">
                  View events details
                </Button>
              )}

              <Button
                href="#"
                emphasis="low"
                iconPosition="after"
                size="large"
                icon={OpenOutlineIcon}
              >
                RSVP on Lu.ma
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
