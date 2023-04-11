import Link from 'next/link'

import {
  CalendarIcon,
  ClockIcon,
  ComputerDesktopIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'

export default function PastEvent() {
  return (
    <div className="rounded-[40px] bg-indigo-300 p-10">
      <h2 className="text-2xl font-bold">Thinkmill takes over SydJS</h2>
      <ul className="mt-6 space-y-4">
        {[
          { icon: CalendarIcon, text: 'Monday, 17 April 2023' },
          { icon: MapPinIcon, text: 'Atlassian Sydney Office' },
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
        We know that Open Source Software is a great way to ensure that the best minds get to work
        on the best solutions to make the best outcomes for all Developers. But what does it take to
        make a successful Open Source solution?
      </p>
    </div>
  )
}
