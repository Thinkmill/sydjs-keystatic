'use client'

import { useState } from 'react'
import Link from 'next/link'

import Logo from './logo'
import { TextLink } from './text-link'
import { socialIcons } from '@/components/social-icons'

export default function Navigation() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      <nav className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between overflow-x-auto px-6 py-4 lg:px-8">
        <Link aria-label="SydJS" className="pr-8" href="/">
          <Logo />
        </Link>
        <ul className="flex items-center gap-8">
          <li className="text-lg/none font-semibold">
            <TextLink href="/events">Events</TextLink>
          </li>
          <li className="text-lg/none font-semibold ">
            <TextLink href="/about">About</TextLink>
          </li>
          {/* <li>
            <Button emphasis="high" onClick={() => setIsModalOpen(true)}>
              <span className="whitespace-nowrap">Join mailing list</span>
            </Button>
          </li> */}
          {Object.entries(socialIcons).map(([key, icon]) => (
            <li key={key} className="-ml-4 hidden md:block">
              {icon}
            </li>
          ))}
        </ul>
      </nav>
      {/* <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Join the SydJS mailing list"
      /> */}
    </>
  )
}
