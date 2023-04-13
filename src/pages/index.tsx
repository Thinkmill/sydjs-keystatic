import { InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../../keystatic.config'

import FeaturedEvent from '@/components/featured-event'
import PastEvent from '@/components/past-event'
import Button from '@/components/button'
import AtlassianLogo from '@/components/svg-logos/atlassian'
import ThinkmillLogo from '@/components/svg-logos/thinkmill'
import LookaheadLogo from '@/components/svg-logos/lookahead'

export async function getStaticProps() {
  const reader = createReader('', keystaticConfig)
  const adminPage = await reader.singletons.admin.read()
  return {
    props: {
      homepageTitle: adminPage?.homepageTitle,
      homepageDescription: adminPage?.homepageDescription,
    },
  }
}

export default function Home(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      {/* Hero section */}
      <div className="relative mx-auto grid max-w-6xl px-6 md:grid-cols-2 lg:px-8">
        <div className="py-40">
          <h1 className="text-6xl font-bold">{props.homepageTitle}</h1>
          <p className="mt-6 text-2xl font-medium">{props.homepageDescription}</p>
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
        <FeaturedEvent />
      </div>
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
