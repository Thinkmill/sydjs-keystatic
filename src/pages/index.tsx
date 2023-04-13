import { InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import Button from '@/components/button'
import Event from '@/components/event'

import AtlassianLogo from '@/components/svg-logos/atlassian'
import ThinkmillLogo from '@/components/svg-logos/thinkmill'
import LookaheadLogo from '@/components/svg-logos/lookahead'
import { ChevronRightIcon } from '@/components/svg-icons'

import { getAdminPage, getFutureEvents, getPastEvents } from '@/lib/keystatic-reads'

export async function getStaticProps() {
  const adminPage = await getAdminPage()
  const futureEvents = await getFutureEvents()
  const pastEvents = await getPastEvents()

  return {
    props: {
      adminPage,
      nextEvent: futureEvents[0],
      pastEvents: pastEvents.slice(0, 3),
    },
  }
}

export default function Home({
  adminPage,
  nextEvent,
  pastEvents,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main className="w-full overflow-x-hidden">
      {/* Hero section */}
      <div className="relative mx-auto grid max-w-6xl px-6 md:grid-cols-2 lg:px-8">
        <div className="py-40">
          <h1 className="text-6xl font-bold">{adminPage.homepageTitle}</h1>
          <p className="mt-6 text-2xl font-medium">{adminPage.homepageDescription}</p>
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
        <Event event={nextEvent} />
      </div>
      <div className="mx-auto mt-20 max-w-6xl px-6 lg:px-8">
        <div className="-mr-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Past events</h2>
          <Button href="/events" emphasis="low" icon={ChevronRightIcon} iconPosition="after">
            View all events
          </Button>
        </div>
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {pastEvents.map((event) => (
            <li key={event.slug}>
              <Event event={event} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
