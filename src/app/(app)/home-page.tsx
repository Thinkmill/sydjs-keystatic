'use client'

import Link from 'next/link'

import Button from '@/components/button'
import EventListingCard from '@/components/event-card/listing'
import AtlassianLogo from '@/components/svg-logos/atlassian'
import ThinkmillLogo from '@/components/svg-logos/thinkmill'
import LookaheadLogo from '@/components/svg-logos/lookahead'
import { ChevronRightIcon } from '@/components/svg-icons'
import { SkewImage } from '@/components/skew-image'

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
      <div className="relative mx-auto grid max-w-6xl px-6 lg:grid-cols-2 lg:pl-8 lg:pr-0">
        <div className="py-8 lg:py-40">
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
                className="transition-opacity hover:opacity-50"
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
                className="transition-opacity hover:opacity-50"
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
                className="transition-opacity hover:opacity-50"
                rel="noopener noreferrer"
              >
                <LookaheadLogo />
              </Link>
            </li>
          </ul>
        </div>
        <div className="mb-8 flex items-center justify-center md:mb-12 lg:mb-0">
          <div className="grid w-full max-w-2xl grid-rows-[2fr,_4fr,_3fr] justify-items-center lg:max-w-3xl">
            <div className="col-start-1 row-start-2 row-end-4 w-full self-end px-[min(22vw,180px)] lg:px-[8.5rem]">
              <SkewImage
                src="/images/speaker.png"
                maskId="bottom"
                alt="A speaker presenting at a conference"
                viewBox="0 0 304 306"
                path="M254.814 191.328C295.817 95.2743 316.318 47.2472 293.68 18.6781C292.642 17.3679 291.55 16.1007 290.408 14.8798C265.51 -11.7426 214.975 1.41432 113.905 27.7281V27.7281C80.8296 36.3392 64.2921 40.6448 52.6871 51.9286C52.1103 52.4893 51.5447 53.0614 50.9905 53.6445C39.8388 65.3766 35.7209 81.9618 27.4849 115.132L21.7603 138.188C0.885905 222.26 -9.55129 264.296 11.9392 288.431C13.8586 290.587 15.928 292.604 18.1319 294.468C42.8069 315.335 84.5629 303.829 168.075 280.816V280.816C194.134 273.635 207.164 270.045 217.222 261.783C218.184 260.993 219.121 260.174 220.033 259.327C229.57 250.468 234.876 238.038 245.488 213.177L254.814 191.328Z"
              />
            </div>
            <div className="col-start-1 row-start-1 row-end-3 w-full">
              <SkewImage
                src="/images/crowd.png"
                alt="A group of people at a conference"
                maskId="top"
                viewBox="0 0 551 406"
                path="M265.413 38.1947L374.23 66.1498C410.613 75.4966 428.805 80.1701 442.953 91.5132C443.611 92.0406 444.26 92.5777 444.902 93.1246C458.703 104.888 466.713 121.876 482.734 155.853C539.022 275.229 567.166 334.916 540.175 374.66C539.017 376.364 537.797 378.026 536.518 379.641C506.684 417.297 441.307 408.324 310.552 390.377L203.935 375.743C157.935 369.43 134.936 366.273 117.33 352.879C99.7242 339.486 90.5448 318.162 72.1862 275.515L68.8789 267.833C9.85883 130.73 -19.6512 62.1787 14.452 22.3313C48.5552 -17.5162 120.841 1.05411 265.413 38.1947Z"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6">
        {nextEvent && <EventListingCard event={nextEvent} />}
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
              <EventListingCard event={event} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
