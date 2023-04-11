import React, { ReactNode } from 'react'
import Link from 'next/link'
import { PlayIcon } from '@heroicons/react/24/outline'

function cx(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

type ButtonProps = {
  size?: 'default' | 'large'
  tone?: 'highlight' | 'accent'
  emphasis?: 'high' | 'default' | 'low'
  icon?: typeof PlayIcon
  iconPosition?: 'before' | 'after'
  href?: string
  children: ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

//  Tailwind classes lookup
const baseClasses = 'rounded-xl font-semibold text-lg/none border-2'

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  default: 'px-4 py-2.5',
  large: 'px-6 py-5',
}

const toneClasses: Record<NonNullable<ButtonProps['tone']>, string> = {
  highlight: 'bg-highlight text-white',
  accent: 'bg-accent text-white',
}

const emphasisClasses: Record<
  NonNullable<ButtonProps['tone']>,
  Record<NonNullable<ButtonProps['emphasis']>, string>
> = {
  highlight: {
    high: 'bg-black border-transparent hover:bg-gray-900 active:bg-gray-800 text-yellow-300',
    default: 'bg-transparent border-black hover:bg-gray-100 active:bg-gray-200 text-black',
    low: 'bg-transparent border-transparent hover:bg-gray-100 active:bg-gray-200 text-black',
  },
  accent: {
    high: 'bg-black border-transparent hover:bg-gray-900 active:bg-gray-800 text-indigo-300',
    default: 'bg-transparent border-black hover:bg-gray-100 active:bg-gray-200 text-black',
    low: 'bg-transparent border-transparent hover:bg-gray-100 active:bg-gray-200 text-black',
  },
}

// The component
const Button: React.FC<ButtonProps> = ({
  size = 'default',
  tone = 'highlight',
  emphasis = 'default',
  icon: Icon,
  iconPosition = 'before',
  href,
  children,
  ...restProps
}) => {
  const allClasses = cx(baseClasses, sizeClasses[size], emphasisClasses[tone][emphasis])
  const contents = Icon ? (
    <span className="flex items-center gap-2">
      {iconPosition === 'before' && <Icon className="-my-1 h-6 w-6" />}
      {children}
      {iconPosition === 'after' && <Icon className="-my-1 h-6 w-6" />}
    </span>
  ) : (
    children
  )

  return href ? (
    <Link className={allClasses} href={href}>
      {contents}
    </Link>
  ) : (
    <button className={allClasses} {...restProps}>
      {contents}
    </button>
  )
}

export default Button
