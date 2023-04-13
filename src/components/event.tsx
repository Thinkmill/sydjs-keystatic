import { DocumentRenderer } from '@keystatic/core/renderer'
import keystaticConfig from '../../keystatic.config'

import {
  CalendarIcon,
  ClockIcon,
  ComputerDesktopIcon,
  MapPinIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline'

import Button from './button'

// Props
export type EventProps = {
  // event: typeof keystaticConfig.collections.events.schema
  event: any
}
// export type EventProps = {
//   name: string
//   description: string
//   talks: {
//     name: string
//     description: string
//     video: string
//     slug: string
//   }[]
//   speakers: string[]
//   sponsors: string[]
//   date: string
//   time: string
//   image: string
// }

export default function Event(props: any) {
  const { event } = props
  return (
    <div className="rounded-[40px] bg-highlight p-16">
      <span className="rounded-full border-2 border-black px-4 py-1.5 text-sm font-bold leading-none">
        upcoming event
      </span>
      <div className="grid gap-28 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="mt-8 text-4xl/none font-bold">{event.name}</h2>
          <div className="mt-4 space-y-4 text-lg">
            <DocumentRenderer document={event.description} />
          </div>
          <div className="mt-6 flex items-center gap-4">
            <Button href="#" size="large">
              View events details
            </Button>
            <Button
              href="#"
              size="large"
              emphasis="low"
              iconPosition="after"
              icon={ArrowTopRightOnSquareIcon}
            >
              RSVP on Lu.ma
            </Button>
          </div>
        </div>
        <ul className="space-y-4">
          {[
            { icon: CalendarIcon, text: 'Monday, 17 April 2023' },
            { icon: ClockIcon, text: '6:30 - 9:30 pm' },
            { icon: MapPinIcon, text: 'Atlassian Sydney Office' },
            { icon: ComputerDesktopIcon, text: 'Online event' },
          ].map((event) => {
            const Icon = event.icon
            return (
              <li key={event.text} className="flex items-center gap-3">
                <div className="shrink-0 rounded-xl bg-black/10 p-2.5">
                  <Icon className="h-5 w-5 stroke-black" />
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
