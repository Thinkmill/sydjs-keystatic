import Link from 'next/link'
import { Inter } from 'next/font/google'
import FeaturedEvent from '@/components/featured-event'
import PastEvent from '@/components/past-event'

import { ChevronRightIcon } from '@heroicons/react/24/outline'

import Button from '@/components/button'
import Image from 'next/image'
import AtlassianLogo from '@/components/svg-logos/atlassian'
import ThinkmillLogo from '@/components/svg-logos/thinkmill'
import LookaheadLogo from '@/components/svg-logos/lookahead'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      {/* Hero section */}
      <div className="mx-auto grid max-w-6xl px-6 md:grid-cols-2 lg:px-8">
        <div className="py-40">
          <h1 className="text-6xl font-bold">Welcome to the home of SydJS</h1>
          <p className="mt-6 text-2xl font-medium">
            Join the vibrant and inclusive community of web developers discussing the latest in
            Javascript from Sydney, Australia.
          </p>
          <p className="mt-10 text-lg">Thanks to our long standing sponsors:</p>
          <nav>
            <ul className="mt-6 flex items-center justify-between gap-4">
              <li>
                <Link href="#">
                  <AtlassianLogo />
                </Link>
              </li>
              <li className="h-6 w-px bg-gray-200"></li>
              <li>
                <Link href="#">
                  <ThinkmillLogo />
                </Link>
              </li>
              <li className="h-6 w-px bg-gray-200"></li>
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
            className="relative z-10 translate-x-8 scale-[1.25]"
            src="/images/hero-image-1.png"
            width={600}
            height={600}
          />
          <Image
            className="ml-auto -translate-y-12"
            src="/images/hero-image-2.png"
            width={400}
            height={400}
          />
        </div>
      </div>

      <FeaturedEvent />
      <div className="mx-auto mt-20 max-w-6xl px-6 lg:px-8">
        <div className="-mr-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Past events</h2>
          <Button href="#" emphasis="low" icon={ChevronRightIcon} iconPosition="after">
            View all events
          </Button>
        </div>
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          <li>
            <PastEvent />
          </li>
          <li>
            <PastEvent />
          </li>
          <li>
            <PastEvent />
          </li>
        </ul>
      </div>
    </main>
  )
}
