import { format } from 'date-fns'
import clsx from 'clsx'
import { DocumentRenderer } from '@keystatic/core/renderer'

import Button from '../button'
import {
  CalendarClearOutlineIcon,
  DesktopIcon,
  ClockIcon,
  LocationOutlineIcon,
  OpenOutlineIcon,
} from '../svg-icons'
import { TextLink } from '../text-link'
import { asyncComponent } from '@/lib/async-component'
import { reader } from '@/app/keystatic/reader'
import { Status, getStatus } from '@/lib/get-status'
import events from '@/app/keystatic/schema/collections/events'

const eventStatusClasses: Record<Status, string> = {
  UPCOMING: 'bg-highlight',
  TODAY: 'bg-highlight',
  PAST: 'bg-accent',
}

export const EventListingCard = asyncComponent(
  async function EventListingCard(props: { slug: string }) {
    const event = await reader.collections.events.readOrThrow(props.slug, {
      resolveLinkedFiles: true,
    })
    const status = getStatus(event.date)
    let eventMeta = [
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
      {
        icon: LocationOutlineIcon,
        text: event.location,
        details: event.address,
      },
    ]

    if (event.zoomLink) {
      eventMeta.push({
        icon: DesktopIcon,
        text: 'Online event',
        secondary: true,
      })
    }
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
            className={clsx('rounded-[40px] p-16', eventStatusClasses[status])}
          >
            <div>
              <span className="inline-block rounded-full border-2 border-black px-4 py-1.5 text-sm font-bold leading-none">
                {status === 'PAST' ? 'past' : 'upcoming'} event
              </span>

              <div className="grid gap-16 md:grid-cols-3 xl:gap-28">
                <div className="md:col-span-2">
                  <h2 className="mt-8 text-4xl font-bold">{event.name}</h2>
                  <div className="mt-4 line-clamp-[8] space-y-4 text-lg safari:line-clamp-none">
                    <DocumentRenderer document={event.description} />
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <Button href={`/events/${props.slug}`} size="large">
                      View events details
                    </Button>
                    {status !== 'PAST' && event.rsvpLink && (
                      <Button
                        href={event.rsvpLink}
                        size="large"
                        emphasis="low"
                        iconPosition="after"
                        icon={OpenOutlineIcon}
                      >
                        RSVP on Meetup.com
                      </Button>
                    )}
                  </div>
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
        </div>

        {/* ---------------------------- */}
        {/* Narrow layout (up to @4xl) */}
        {/* ---------------------------- */}
        <div className="block h-full @4xl:hidden">
          <div
            className={clsx(
              'h-full rounded-[40px] p-8 sm:p-10',
              eventStatusClasses[status]
            )}
          >
            {status !== 'PAST' && (
              <span className="mb-4 inline-block rounded-full border-2 border-black px-4 py-1.5 text-sm font-bold leading-none">
                upcoming event
              </span>
            )}
            <TextLink href={`/events/${props.slug}`}>
              <h2 className="line-clamp-2 text-2xl font-bold safari:line-clamp-none">
                {event.name}
              </h2>
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
                      <span className="text-lg/6 font-medium">
                        {event.text}
                      </span>
                    </li>
                  )
                })}
            </ul>
            <div
              className="mt-8 line-clamp-[7]
            space-y-4 text-lg/6 safari:line-clamp-none"
            >
              <DocumentRenderer document={event.description} />
            </div>

            {status !== 'PAST' && (
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href={`/events/${props.slug}`} size="large">
                  View events details
                </Button>

                {event.rsvpLink && (
                  <Button
                    href={event.rsvpLink}
                    emphasis="low"
                    iconPosition="after"
                    size="large"
                    icon={OpenOutlineIcon}
                  >
                    RSVP on Meetup.com
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
)
