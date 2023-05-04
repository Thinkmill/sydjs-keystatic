'use client'

import { useState } from 'react'
import Link from 'next/link'
import Modal from './modal'
import { TwitterIcon } from './svg-icons'

import Logo from './logo'
import Button from './button'
import IconButton from './icon-button'
import { TextLink } from './text-link'

export default function Navigation() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      <nav className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between overflow-x-scroll px-6 py-4 lg:px-8">
        <Link className="pr-8" href="/">
          <Logo />
        </Link>
        <ul className="flex items-center gap-8">
          <li className="text-lg/none font-semibold">
            <TextLink href="/events">Events</TextLink>
          </li>
          <li className="text-lg/none font-semibold ">
            <TextLink href="/about">About</TextLink>
          </li>
          <li>
            <Button emphasis="high" onClick={() => setIsModalOpen(true)}>
              <span className="whitespace-nowrap">Join mailing list</span>
            </Button>
          </li>
          <li className="-ml-4 hidden md:block">
            <IconButton
              emphasis="low"
              href="https://twitter.com/sydjs"
              icon={TwitterIcon}
            />
          </li>
        </ul>
      </nav>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Join the SydJS mailing list"
      />
    </>
  )
}
