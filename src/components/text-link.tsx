import Link from 'next/link'
import { ReactNode } from 'react'

export function TextLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <Link
      href={href}
      className="decoration-2 underline-offset-2 hover:underline"
    >
      {children}
    </Link>
  )
}
