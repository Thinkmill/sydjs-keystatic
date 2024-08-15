import { format } from 'date-fns'
import classnames from 'classnames'
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

export const EventListingCard = asyncComponent(async function EventListingCard({
  heading: Heading = 'h2',
  slug,
}: {
  heading?: 'h1' | 'h2' | 'h3'
  slug: string
}) {
  const event = await reader.collections.events.readOrThrow(slug, {
    resolveLinkedFiles: true,
  })
  const status = getStatus(event.date)
  let eventMeta = [
    {
      icon: CalendarClearOutlineIcon,
      definition: 'Date',
      text: event.date
        ? format(new Date(event.date), 'EEEE, d MMMM yyy')
        : 'no  date',
    },
    {
      icon: ClockIcon,
      definition: 'Time',
      text: `${event.startTime} — ${event.endTime}`,
      secondary: true,
    },
    {
      definition: 'Location',
      icon: LocationOutlineIcon,
      text: event.location,
      details: event.address,
    },
  ]

  if (event.zoomLink) {
    eventMeta.push({
      definition: 'Location',
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
          className={classnames(
            'rounded-[40px] p-16',
            eventStatusClasses[status]
          )}
        >
          <div>
            <span className="inline-block rounded-full border-2 border-black px-4 py-1.5 text-sm font-bold leading-none">
              {status === 'PAST' ? 'past' : 'upcoming'} event
            </span>

            <div className="grid gap-16 md:grid-cols-3 xl:gap-28">
              <div className="md:col-span-2">
                <Heading className="mt-8 text-4xl font-bold">
                  {event.name}
                </Heading>
                <div className="mt-4 line-clamp-[8] space-y-4 text-lg safari:line-clamp-none [&_a]:underline hover:[&_a]:no-underline">
                  <DocumentRenderer document={event.description} />
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <Button href={`/events/${slug}`} size="large">
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
                      className={classnames(
                        'flex gap-3',
                        event.details ? 'items-start' : 'items-center'
                      )}
                    >
                      <div
                        aria-label={event.definition}
                        className="shrink-0 rounded-xl bg-black/10 p-2.5"
                        role="text"
                      >
                        <Icon aria-hidden className="h-5 w-5 fill-black" />
                      </div>
                      <div>
                        <p
                          className={classnames(
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
          className={classnames(
            'h-full rounded-[40px] p-8 sm:p-10',
            eventStatusClasses[status]
          )}
        >
          {status !== 'PAST' && (
            <span className="mb-4 inline-block rounded-full border-2 border-black px-4 py-1.5 text-sm font-bold leading-none">
              upcoming event
            </span>
          )}
          <TextLink href={`/events/${slug}`}>
            <Heading className="line-clamp-2 text-2xl font-bold safari:line-clamp-none">
              {event.name}
            </Heading>
          </TextLink>
          <ul className="mt-6 space-y-4">
            {eventMeta
              .filter((event) => !event.secondary)
              .map((event) => {
                const Icon = event.icon
                return (
                  <li key={event.text} className="flex items-center gap-3">
                    <div
                      aria-label={event.definition}
                      className="shrink-0 rounded-xl bg-black/10 p-2.5"
                      role="text"
                    >
                      <Icon aria-hidden className="h-5 w-5 stroke-black" />
                    </div>
                    <span className="text-lg/6 font-medium">{event.text}</span>
                  </li>
                )
              })}
          </ul>
          <div
            className="mt-8 line-clamp-[7]
            space-y-4 text-lg/6 [&_a]:underline hover:[&_a]:no-underline"
          >
            {/** In Safari line-clamp is applied to each child independently rather than as a whole like other browser,
             *   so each paragraph will be rendered with clamping, but it also looks broken. This quick fix only renders
             *   the first node, hopefully a paragraph.
             */}
            <DocumentRenderer document={[event.description[0]]} />
          </div>

          {status !== 'PAST' && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href={`/events/${slug}`} size="large">
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
})
