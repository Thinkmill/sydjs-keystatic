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
import keystaticConfig from '@/app/keystatic/keystatic.config'

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
      <div className="relative mx-auto grid max-w-6xl px-6 lg:grid-cols-2 lg:px-8">
        <div className="order-2 pb-24 lg:order-1 lg:py-40">
          <h1 className="text-6xl font-bold">{adminPage.homepageTitle}</h1>
          <p className="mt-6 text-2xl font-medium">
            {adminPage.homepageDescription}
          </p>
          <p className="mt-10 text-lg">Thanks to our long standing sponsors:</p>
          <ul className="mt-6 flex flex-wrap items-center gap-4 lg:justify-between">
            <li>
              <Link
                href="https://www.atlassian.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AtlassianLogo />
              </Link>
            </li>
            <li className="h-6 w-px bg-gray-200"></li>
            <li>
              <Link
                href="https://www.thinkmill.com.au/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ThinkmillLogo />
              </Link>
            </li>
            <li className="h-6 w-px bg-gray-200"></li>
            <li>
              <Link
                href="https://lookahead.com.au/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LookaheadLogo />
              </Link>
            </li>
          </ul>
        </div>
        <div className="order-1 flex flex-col items-center lg:block">
          <Image
            alt=""
            className="z-10 lg:absolute lg:-right-24 lg:-top-12 lg:w-[60%]"
            src="/images/hero-image-1.png"
            width={800}
            height={800}
          />
          <Image
            alt=""
            className="-mt-24 lg:absolute lg:-bottom-12 lg:right-12 lg:w-[30%] lg:-translate-y-12"
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
