import Link from 'next/link'
import { Inter } from 'next/font/google'
import FeaturedEvent from '@/components/featured-event'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
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
    </main>
  )
}
