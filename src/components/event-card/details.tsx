import { format } from 'date-fns'
import classnames from 'classnames'
import { DocumentRenderer } from '@keystatic/core/renderer'
import { reader } from '@/app/keystatic/reader'

import Button from '@/components/button'
import { FeaturedMedia } from '@/components/featured-media'
import {
  CalendarClearOutlineIcon,
  DesktopIcon,
  ClockIcon,
  LocationOutlineIcon,
  OpenOutlineIcon,
  ExitOutlineIcon,
} from '@/components/svg-icons'
import { TextLink } from '@/components/text-link'
import { getStatus } from '@/lib/get-status'
import { asyncComponent } from '@/lib/async-component'

const eventStatusClasses = {
  UPCOMING: 'bg-highlight',
  TODAY: 'bg-highlight',
  PAST: 'bg-accent',
}

export const EventDetailsCard = asyncComponent(async function EventCard({
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

  const featuredMedia = event.featuredMedia.discriminant !== 'none' && (
    <div
      className={classnames(
        "before:l-0 relative before:absolute before:h-1/2 before:w-full before:rounded-b-[40px] before:content-['']",
        status === 'PAST' ? 'before:bg-accent' : 'before:bg-highlight'
      )}
    >
      <div className="px-2 sm:px-4 lg:px-8">
        <FeaturedMedia media={event.featuredMedia} status={status} />
      </div>
    </div>
  )

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
            'rounded-t-[40px] p-16',
            !featuredMedia && 'rounded-b-[40px]',
            eventStatusClasses[status]
          )}
        >
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <span className="inline-block rounded-full border-2 border-black px-4 py-1.5 text-sm font-bold leading-none">
              {status === 'PAST' ? 'past' : 'upcoming'} event
            </span>

            <div className="grid gap-16 md:grid-cols-3 xl:gap-28">
              <div className="md:col-span-2">
                <Heading className="mt-8 text-4xl font-bold">
                  {event.name}
                </Heading>
                <div className="mt-4 space-y-4 text-lg [&_a]:underline hover:[&_a]:no-underline">
                  <DocumentRenderer document={event.description} />
                </div>

                <div className="mt-8 flex items-center gap-4">
                  {status !== 'PAST' && event.rsvpLink && (
                    <Button
                      href={event.rsvpLink}
                      size="large"
                      emphasis="high"
                      iconPosition="after"
                      icon={OpenOutlineIcon}
                    >
                      RSVP on Meetup.com
                    </Button>
                  )}
                </div>
              </div>
              <EventInfo slug={slug} />
            </div>
          </div>
        </div>
        {featuredMedia}
      </div>

      {/* ---------------------------- */}
      {/* Narrow layout (up to @4xl) */}
      {/* ---------------------------- */}
      <div className="block h-full @4xl:hidden">
        <div
          className={classnames(
            'rounded-t-[40px] p-8 sm:p-10',
            !featuredMedia && 'rounded-b-[40px]',
            eventStatusClasses[status]
          )}
        >
          {status !== 'PAST' && (
            <span className="mb-4 inline-block rounded-full border-2 border-black px-4 py-1.5 text-sm font-bold leading-none">
              upcoming event
            </span>
          )}
          <TextLink href={`/events/${slug}`}>
            <Heading className="text-2xl font-bold">{event.name}</Heading>
          </TextLink>
          <div className="mt-6">
            <EventInfo slug={slug} />
          </div>
          <div className="mt-8 space-y-4 text-lg/6 [&_a]:underline hover:[&_a]:no-underline">
            <DocumentRenderer document={event.description} />
          </div>

          {status !== 'PAST' && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {event.rsvpLink && (
                <Button
                  href={event.rsvpLink}
                  emphasis="high"
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
        {featuredMedia}
      </div>
    </div>
  )
})

const EventInfo = asyncComponent(async function Component(props: {
  slug: string
}) {
  const event = await reader.collections.events.readOrThrow(props.slug, {
    resolveLinkedFiles: true,
  })

  const formatted = {
    date: event.date
      ? format(new Date(event.date), 'EEEE, d MMMM yyy')
      : 'no  date',
    time: event.startTime + (event?.endTime && ` — ${event.endTime}`),
  }

  return (
    <ul className="space-y-4">
      {/* Date */}
      <li className="flex items-center gap-3">
        <div
          aria-label="Date"
          className="shrink-0 rounded-xl bg-black/10 p-2.5"
          role="text"
        >
          <CalendarClearOutlineIcon className="h-5 w-5 fill-black" />
        </div>
        <div>
          <p className="text-lg font-medium">{formatted.date}</p>
        </div>
      </li>

      {/* Time */}
      <li className="flex items-center gap-3">
        <div
          aria-label="Time"
          className="shrink-0 rounded-xl bg-black/10 p-2.5"
          role="text"
        >
          <ClockIcon className="h-5 w-5 fill-black" />
        </div>
        <div>
          <p className="text-lg font-medium">{formatted.time}</p>
        </div>
      </li>

      {/* Location */}
      <li
        className={classnames(
          'flex gap-3',
          event.address ? 'items-start' : 'items-center'
        )}
      >
        <div
          aria-label="Location"
          className="shrink-0 rounded-xl bg-black/10 p-2.5"
          role="text"
        >
          <LocationOutlineIcon className="h-5 w-5 fill-black" />
        </div>
        <div>
          <p className="text-lg font-medium">{event.location}</p>
          {event.address && <p className="text-sm/none">{event.address}</p>}
        </div>
      </li>
      {/* Online event */}
      {event.zoomLink && (
        <li className="flex items-start gap-3">
          <div
            aria-label="Location"
            className="shrink-0 rounded-xl bg-black/10 p-2.5"
            role="text"
          >
            <DesktopIcon className="h-5 w-5 fill-black" />
          </div>
          <div>
            <p className="text-lg font-medium">Online event</p>

            <p className="text-sm/none">
              <a href={event.zoomLink} className="flex items-center gap-2">
                <span className="border-b border-black/40 font-semibold">
                  Join Zoom
                </span>
                <ExitOutlineIcon className="h-5 w-5" />
              </a>
            </p>
          </div>
        </li>
      )}
    </ul>
  )
})
