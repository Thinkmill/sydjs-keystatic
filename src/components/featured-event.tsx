import Link from 'next/link'
import Button from './button'

import {
  CalendarIcon,
  ClockIcon,
  ComputerDesktopIcon,
  MapPinIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline'

export default function FeaturedEvent() {
  return (
    <div className="mx-auto max-w-7xl px-6 md:px-8">
      <div className="rounded-[40px] bg-yellow-300 p-16">
        <span className="rounded-full border-2 border-black px-4 py-1.5 text-sm font-bold leading-none">
          upcoming event
        </span>
        <div className="grid gap-28 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="mt-8 text-4xl/none font-bold">Thinkmill takes over SydJS</h2>
            <p className="mt-4 text-lg">
              We know that Open Source Software is a great way to ensure that the best minds get to
              work on the best solutions to make the best outcomes for all Developers. But what does
              it take to make a successful Open Source solution?
            </p>
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
    </div>
  )
}
