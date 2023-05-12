'use client'

import { useMouse } from 'ahooks'
import { useRef } from 'react'

import { usePrefersReducedMotion } from '@/lib/prefers-reduced-motion'

export function SkewImage({
  src,
  alt,
  maskId,
  path,
  viewBox,
}: {
  src: string
  alt: string
  maskId: string
  path: string
  viewBox: string
}) {
  const ref = useRef(null)
  const mouse = useMouse(ref.current)
  const prefersReducedMotion = usePrefersReducedMotion()
  return (
    <>
      <svg viewBox={viewBox} ref={ref}>
        <mask id={maskId}>
          <path
            d={path}
            style={
              prefersReducedMotion
                ? { transform: `scale(0.9)`, transformOrigin: 'center' }
                : {
                    transform: `skew(${mouse.elementX / 180}deg, ${
                      mouse.elementY / 180
                    }deg) scale(0.9)`,
                    transformOrigin: 'center',
                  }
            }
            fill="white"
          />
        </mask>
        <image
          href={src}
          // @ts-ignore
          alt={alt}
          className="w-full"
          mask={`url(#${maskId})`}
        />
      </svg>
    </>
  )
}
