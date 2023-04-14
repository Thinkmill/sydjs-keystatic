import Link from 'next/link'
import clsx from 'clsx'
import { format } from 'date-fns'

import { DocumentRenderer } from '@keystatic/core/renderer'
import { EntryWithResolvedLinkedFiles } from '@keystatic/core/reader'
import keystaticConfig from '../../keystatic.config'

import Button from './button'
import {
  CalendarClearOutlineIcon,
  DesktopIcon,
  ClockIcon,
  LocationOutlineIcon,
  OpenOutlineIcon,
} from './svg-icons'

type DisplayContext = 'listing' | 'details'
export type Status = 'upcoming' | 'today' | 'past'
type EventMeta = {
  status: Status
  slug: string
}

export type EventEntryWithTalksAndSpeakers = EventMeta &
  Omit<
    EntryWithResolvedLinkedFiles<(typeof keystaticConfig)['collections']['events']>,
    'talks' | 'speakers'
  > & {
    talks: EntryWithResolvedLinkedFiles<(typeof keystaticConfig)['collections']['talks']> &
      { slug: string }[]
    speakers: EntryWithResolvedLinkedFiles<(typeof keystaticConfig)['collections']['persons']> &
      { slug: string }[]
  }

export type EventCardProps = {
  displayContext?: DisplayContext
} & {
  event: EventEntryWithTalksAndSpeakers
}

const eventStatusClasses: Record<EventCardProps['event']['status'], string> = {
  upcoming: 'bg-highlight',
  today: 'bg-highlight',
  past: 'bg-accent',
}

export default function EventCard({ displayContext = 'listing', event }: EventCardProps) {
  const eventMeta = [
    {
      icon: CalendarClearOutlineIcon,
      text: event.date ? format(new Date(event.date), 'EEEE, d MMMM yyy') : 'no  date',
    },
    { icon: ClockIcon, text: '6:30 - 9:30 pm', secondary: true },
    { icon: LocationOutlineIcon, text: event.location },
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
            'rounded-[40px] p-16',
            // Adding the fallback until I fix the breaking build 😅
            eventStatusClasses[event.status] ?? eventStatusClasses.upcoming
          )}
        >
          <span className="inline-block rounded-full border-2 border-black px-4 py-1.5 text-sm font-bold leading-none">
            {event.status === 'past' ? 'past' : 'upcoming'} event
          </span>

          <div className="grid gap-16 md:grid-cols-3 xl:gap-28">
            <div className="md:col-span-2">
              <h2 className="mt-8 text-4xl font-bold">{event.name}</h2>
              <div className="mt-4 space-y-4 text-lg">
                <DocumentRenderer document={event.description} />
              </div>
              {displayContext === 'listing' && (
                <div className="mt-6 flex items-center gap-4">
                  <Button href={`/events/${event.slug}`} size="large">
                    View events details
                  </Button>
                  {event?.status !== 'past' && (
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
            </div>
            <ul className="space-y-4">
              {eventMeta.map((event) => {
                const Icon = event.icon
                return (
                  <li key={event.text} className="flex items-center gap-3">
                    <div className="shrink-0 rounded-xl bg-black/10 p-2.5">
                      <Icon className="h-5 w-5 fill-black" />
                    </div>
                    <span className="text-lg font-medium">{event.text}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* ---------------------------- */}
      {/* Narrow layout (up to @4xl) */}
      {/* ---------------------------- */}
      <div className="block h-full @4xl:hidden">
        <div className={clsx('h-full rounded-[40px] p-10', eventStatusClasses[event.status])}>
          {event?.status !== 'past' && (
            <span className="mb-4 inline-block rounded-full border-2 border-black px-4 py-1.5 text-sm font-bold leading-none">
              upcoming event
            </span>
          )}
          <Link href={`/events/${event?.slug}`} className="hover:underline">
            <h2 className="text-2xl font-bold">{event.name}</h2>
          </Link>
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

          {event.status !== 'past' && (
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
