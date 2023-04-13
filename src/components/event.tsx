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

// Props
export type Status = 'upcoming' | 'today' | 'past'
export type EventProps = {
  slug: string
  status: Status
} & Omit<
  EntryWithResolvedLinkedFiles<(typeof keystaticConfig)['collections']['events']>,
  'talks' | 'speakers'
> & {
    talks: any
    // | readonly string[]
    // | EntryWithResolvedLinkedFiles<(typeof keystaticConfig)['collections']['talks']>[]
  } & {
    speakers: any
    // | readonly string[]
    // | EntryWithResolvedLinkedFiles<(typeof keystaticConfig)['collections']['persons']>[]
  }

type Props = {
  event: EventProps
}

const eventStatusClasses: Record<EventProps['status'], string> = {
  upcoming: 'bg-highlight',
  today: 'bg-highlight',
  past: 'bg-accent',
}

export default function Event({ event }: Props) {
  return (
    // We're using container queries here!
    // The wrapped is flagged as a `@container`
    // and then the `@3xl` will trigger accordingly!
    <div className="@container">
      {/* ---------------------------- */}
      {/* Wide layout (@3xl and wider) */}
      {/* ---------------------------- */}
      <div className="hidden @3xl:block">
        <div
          className={clsx(
            'rounded-[40px] p-16',
            // Adding the fallback until I fix the breaking build 😅
            eventStatusClasses[event?.status] ?? eventStatusClasses.upcoming
          )}
        >
          <span className="inline-block rounded-full border-2 border-black px-4 py-1.5 text-sm font-bold leading-none">
            {event.status === 'past' ? 'past' : 'upcoming'} event
          </span>

          <div className="grid gap-16 md:grid-cols-3 xl:gap-28">
            <div className="md:col-span-2">
              <h2 className="mt-8 text-4xl font-bold">{event?.name}</h2>
              <div className="mt-4 space-y-4 text-lg">
                {event?.description && <DocumentRenderer document={event?.description} />}
              </div>
              <div className="mt-6 flex items-center gap-4">
                <Button href={`/events/${event?.slug}`} size="large">
                  View events details
                </Button>
                <Button
                  href="#"
                  size="large"
                  emphasis="low"
                  iconPosition="after"
                  icon={OpenOutlineIcon}
                >
                  RSVP on Lu.ma
                </Button>
              </div>
            </div>
            <ul className="space-y-4">
              {[
                {
                  icon: CalendarClearOutlineIcon,
                  text: event?.date ? format(new Date(event.date), 'EEEE, d MMMM yyy') : 'no  date',
                },
                { icon: ClockIcon, text: '6:30 - 9:30 pm' },
                { icon: LocationOutlineIcon, text: event?.location },
                { icon: DesktopIcon, text: 'Online event' },
              ].map((event) => {
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
      {/* Narrow layout (up to @3xl) */}
      {/* ---------------------------- */}
      <div className="block @3xl:hidden">
        <div
          className={clsx(
            'rounded-[40px] p-10',
            // Adding the fallback until I fix the breaking build 😅
            eventStatusClasses[event?.status] ?? eventStatusClasses.upcoming
          )}
        >
          {event.status !== 'past' && (
            <span className="mb-4 inline-block rounded-full border-2 border-black px-4 py-1.5 text-sm font-bold leading-none">
              upcoming event
            </span>
          )}
          <h2 className="text-2xl font-bold">Thinkmill takes over SydJS</h2>
          <ul className="mt-6 space-y-4">
            {[
              { icon: CalendarClearOutlineIcon, text: 'Monday, 17 April 2023' },
              { icon: LocationOutlineIcon, text: 'Atlassian Sydney Office' },
            ].map((event) => {
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
          <p className="mt-8 line-clamp-[7] text-lg/6">
            We know that Open Source Software is a great way to ensure that the best minds get to
            work on the best solutions to make the best outcomes for all Developers. But what does
            it take to make a successful Open Source solution?
          </p>

          {event.status !== 'past' && (
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button href={`/events/${event?.slug}`} size="large">
                View events details
              </Button>
              <Button
                href="#"
                size="large"
                emphasis="low"
                iconPosition="after"
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
