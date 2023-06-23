import React from 'react'
import Link from 'next/link'

import { TwitterIcon } from './svg-icons'

function cx(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export type IconButtonProps = {
  icon: typeof TwitterIcon
  size?: 'default' | 'large'
  tone?: 'highlight' | 'accent'
  emphasis?: 'high' | 'default' | 'low'
  href?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

//  Tailwind classes lookup
const baseClasses =
  'font-semibold flex justify-center items-center text-lg/none border-2 aspect-square'

const sizeClasses: Record<NonNullable<IconButtonProps['size']>, string> = {
  default: 'w-10 rounded-xl',
  large: 'w-14 rounded-2xl',
}

const emphasisClasses: Record<
  NonNullable<IconButtonProps['tone']>,
  Record<NonNullable<IconButtonProps['emphasis']>, string>
> = {
  highlight: {
    high: 'bg-black border-transparent hover:bg-gray-900 active:bg-gray-800 text-highlight',
    default:
      'bg-transparent border-black hover:bg-black/[8%] active:bg-black/[16%] text-black',
    low: 'bg-transparent border-transparent hover:bg-black/[8%] active:bg-black/[16%] text-black',
  },
  accent: {
    high: 'bg-black border-transparent hover:bg-gray-900 active:bg-gray-800 text-accent',
    default:
      'bg-transparent border-black hover:bg-black/[8%] active:bg-black/[16%] text-black',
    low: 'bg-transparent border-transparent hover:bg-black/[8%] active:bg-black/[16%] text-black',
  },
}

// The component
export default function Button({
  size = 'default',
  tone = 'highlight',
  emphasis = 'default',
  icon: Icon,
  href,
  ...restProps
}: IconButtonProps) {
  const allClasses = cx(
    baseClasses,
    sizeClasses[size],
    emphasisClasses[tone][emphasis]
  )
  const iconRender = <Icon className="-my-1 h-6 w-6" />
  const { 'aria-label': ariaLabel, ...rest } = restProps

  return href ? (
    <Link aria-label={ariaLabel} className={allClasses} href={href}>
      {iconRender}
    </Link>
  ) : (
    <button aria-label={ariaLabel} className={allClasses} {...rest}>
      {iconRender}
    </button>
  )
}
