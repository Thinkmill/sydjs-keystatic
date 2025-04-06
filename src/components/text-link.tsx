import Link from 'next/link'
import { ReactNode } from 'react'

export function TextLink({
  href,
  children,
  openInNewTab = false,
}: {
  href: string
  children: ReactNode
  openInNewTab?: boolean
}) {
  return (
    <Link
      href={href}
      className="decoration-2 underline-offset-2 hover:underline"
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
    >
      {children}
    </Link>
  )
}
