'use client'

import Image from 'next/image'
import Link from 'next/link'

import Button from '@/components/button'
import EventCard from '@/components/event-card'

import AtlassianLogo from '@/components/svg-logos/atlassian'
import ThinkmillLogo from '@/components/svg-logos/thinkmill'
import LookaheadLogo from '@/components/svg-logos/lookahead'
import { ChevronRightIcon } from '@/components/svg-icons'
import { EntryWithResolvedLinkedFiles } from '@keystatic/core/reader'
import keystaticConfig from '../../keystatic.config'

import type { EventWithStatusAndSlug } from '@/lib/types'

export default function Home({
  adminPage,
  nextEvent,
  pastEvents,
}: {
  adminPage: EntryWithResolvedLinkedFiles<
    (typeof keystaticConfig)['singletons']['admin']
  >
  nextEvent: EventWithStatusAndSlug
  pastEvents: EventWithStatusAndSlug[]
}) {
  return (
    <main className="w-full overflow-x-hidden">
      {/* Hero section */}
      <div className="relative mx-auto grid max-w-6xl px-6 md:grid-cols-2 lg:px-8">
        <div className="py-40">
          <h1 className="text-6xl font-bold">{adminPage.homepageTitle}</h1>
          <p className="mt-6 text-2xl font-medium">
            {adminPage.homepageDescription}
          </p>
          <p className="mt-10 text-lg">Thanks to our long standing sponsors:</p>
          <nav>
            <ul className="mt-6 flex items-center justify-between gap-4">
              <li>
                <Link href="#">
                  <AtlassianLogo />
                </Link>
              </li>
              <li className="bg-gray-200 h-6 w-px"></li>
              <li>
                <Link href="#">
                  <ThinkmillLogo />
                </Link>
              </li>
              <li className="bg-gray-200 h-6 w-px"></li>
              <li>
                <Link href="#">
                  <LookaheadLogo />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <Image
            alt=""
            className="absolute -right-24 -top-12 z-10 w-[60%]"
            src="/images/hero-image-1.png"
            width={800}
            height={800}
          />
          <Image
            alt=""
            className="absolute -bottom-12 right-12 w-[30%] -translate-y-12"
            src="/images/hero-image-2.png"
            width={400}
            height={400}
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <EventCard event={nextEvent} />
      </div>
      <div className="mx-auto mt-20 max-w-6xl px-6 lg:px-8">
        <div className="-mr-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Past events</h2>
          <Button
            href="/events"
            emphasis="low"
            icon={ChevronRightIcon}
            iconPosition="after"
          >
            View all events
          </Button>
        </div>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {pastEvents.map((event) => (
            <li key={event.slug}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}