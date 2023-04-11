import Link from 'next/link'

import Logo from './logo'
import TwitterIconLink from './twitter-icon-link'

import Button from './button'

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
          <Link href="#" className="text-lg/none font-semibold ">
            About
          </Link>
        </li>
        <li>
          <Button emphasis="high" href="#">
            Join mailing list
          </Button>
        </li>
        <li>
          <TwitterIconLink />
        </li>
      </ul>
    </nav>
  )
}
