import { useMouse } from 'ahooks'
import { useRef } from 'react'

import { usePrefersReducedMotion } from '@/lib/prefers-reduced-motion'

export const SkewImage: React.FC<{
  src: string
  alt: string
  maskId: string
  path: string
  viewBox: string
}> = ({ src, alt, maskId, path, viewBox }) => {
  const ref = useRef(null)
  const mouse = useMouse(ref.current)
  const prefersReducedMotion = usePrefersReducedMotion()
  console.log(prefersReducedMotion)
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
                    transform: `skew(${mouse.elementX / 100}deg, ${
                      mouse.elementY / 100
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
