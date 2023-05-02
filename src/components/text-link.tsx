import Link from 'next/link'

export const TextLink: React.FC<{
  href: string
  children: React.ReactNode
}> = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="decoration-2 underline-offset-2 hover:underline"
    >
      {children}
    </Link>
  )
}
