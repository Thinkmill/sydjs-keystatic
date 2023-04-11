import Link from 'next/link'
import { Inter } from 'next/font/google'
import FeaturedEvent from '@/components/featured-event'
import PastEvent from '@/components/past-event'

import { PlayIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'

import Button from '@/components/button'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <div className="max-w-6xlpx-6 mx-auto py-48 lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button icon={PlayIcon} iconPosition="before" emphasis="high">
              Play now
            </Button>
            <Button
              icon={ArrowTopRightOnSquareIcon}
              iconPosition="after"
              emphasis="high"
              tone="accent"
            >
              Play now
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button icon={PlayIcon} iconPosition="before">
              Play now
            </Button>
            <Button icon={ArrowTopRightOnSquareIcon} iconPosition="after" tone="accent">
              Play now
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button emphasis="high">High</Button>
            <Button emphasis="default">Default</Button>
            <Button emphasis="low">Low</Button>
          </div>
          <div className="flex items-center gap-4">
            <Button tone="accent" emphasis="high">
              High
            </Button>
            <Button tone="accent" emphasis="default">
              Default
            </Button>
            <Button tone="accent" emphasis="low">
              Low
            </Button>
          </div>
          {/* Large */}
          <div className="flex items-center gap-4">
            <Button size="large" emphasis="high">
              Large High
            </Button>
            <Button size="large" emphasis="default">
              Large Default
            </Button>
            <Button size="large" emphasis="low">
              Large Low
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button size="large" tone="accent" emphasis="high">
              Large High
            </Button>
            <Button size="large" tone="accent" emphasis="default">
              Large Default
            </Button>
            <Button size="large" tone="accent" emphasis="low">
              Large Low
            </Button>
          </div>
        </div>
      </div>
      {/* Hero section */}
      <div className="mx-auto grid max-w-6xl px-6 md:grid-cols-2 lg:px-8">
        <div className="py-40">
          <h1 className="text-6xl font-bold">Welcome to the home of SydJS</h1>
          <p className="mt-6 text-2xl font-medium">
            A meetup style event all about JavaScript. Hosted in Sydney, streamed internationally.
          </p>
          <p className="mt-10 text-lg">Thanks to our long standing sponsors:</p>
          <ul className="mt-4 flex items-center justify-between gap-4">
            <li className="flex-1 bg-yellow-300 p-4 text-center">logo</li>
            <li className="flex-1 bg-yellow-300 p-4 text-center">logo</li>
            <li className="flex-1 bg-yellow-300 p-4 text-center">logo</li>
          </ul>
        </div>
      </div>

      <FeaturedEvent />
      <div className="mx-auto mt-20 max-w-6xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Past events</h2>
        <ul className="mt-10 grid gap-20 md:grid-cols-3">
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
