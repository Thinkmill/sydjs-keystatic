import Link from 'next/link'

import Logo from './logo'
import TwitterIconLink from './twitter-icon-link'

export default function Navigation() {
  return (
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
      <Link href="/">
        <Logo />
      </Link>
      <ul className="flex items-center gap-8">
        <li>
          <Link href="#" className="text-lg/none font-semibold ">
            Events
          </Link>
        </li>
        <li>
          <Link href="#" className="text-lg/none font-semibold">
            About
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="rounded-xl bg-black p-3 text-lg/none font-semibold text-yellow-300 transition-colors duration-100 hover:bg-yellow-300 hover:text-black"
          >
            Join mailing list
          </Link>
        </li>
        <li>
          <TwitterIconLink />
        </li>
      </ul>
    </nav>
  )
}
