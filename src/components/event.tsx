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
    <div
      className={clsx(
        'rounded-[40px] p-16',
        // Adding the fallback until I fix the breaking build 😅
        eventStatusClasses[event?.status] ?? eventStatusClasses.upcoming
      )}
    >
      <span className="rounded-full border-2 border-black px-4 py-1.5 text-sm font-bold leading-none">
        upcoming event
      </span>

      <div className="grid gap-28 md:grid-cols-3">
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
  )
}
