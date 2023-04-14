'use client'

import { useState } from 'react'
import Link from 'next/link'
import Modal from './modal'
import { TwitterIcon } from './svg-icons'

import Logo from './logo'
import Button from './button'
import IconButton from './icon-button'

export default function Navigation() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      <nav className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/">
          <Logo />
        </Link>
        <ul className="flex items-center gap-8">
          <li>
            <Link href="/events" className="text-lg/none font-semibold ">
              Events
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-lg/none font-semibold ">
              About
            </Link>
          </li>
          <li>
            <Button emphasis="high" onClick={() => setIsModalOpen(true)}>
              Join mailing list
            </Button>
          </li>
          <li className="-ml-4">
            <IconButton emphasis="low" href="https://twitter.com/sydjs" icon={TwitterIcon} />
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
