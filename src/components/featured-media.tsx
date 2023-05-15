'use client'

import { useState } from 'react'
import { Transition } from '@headlessui/react'
import Image from 'next/image'
import clsx from 'clsx'

import { Entry } from '@keystatic/core/reader'
import { Status } from '@/lib/get-status'
import keystaticConfig from '@/app/keystatic/keystatic.config'
import YouTubeEmbed from '@/components/youtube-embed'
import Button from '@/components/button'
import { PlayOutlineIcon } from '@/components/svg-icons'

type Kind = 'event' | 'talk'

type MediaProps = {
  media: Entry<
    (typeof keystaticConfig)['collections']['events']
  >['featuredMedia']
  status: Status
  kind?: Kind
}

export function FeaturedMedia({ media, status, kind = 'event' }: MediaProps) {
  return (
    <div className="relative">
      {/* Featured image */}
      {media.discriminant === 'image' && (
        <Image
          className="relative mx-auto aspect-video w-full max-w-6xl rounded-2xl object-cover ring-1 ring-black/10"
          src={media.value.asset}
          alt={media.value.alt}
          width={1200}
          height={675}
          priority={kind === 'event'}
          sizes={
            kind === 'event' ? '100vw' : '(max-width: 1020px) 100vw, 240px'
          }
        />
      )}

      {/* Featured Video */}
      {media.discriminant === 'video' && (
        <>
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl">
            <YouTubeEmbed
              className="aspect-video object-cover"
              videoUrl={media.value.url}
            />
            {media.value.image?.asset !== null ?? (
              <ThumbnailOverlay
                // Don't understand why TS thinks `asset` can be null after the check above
                image={media.value.image as any}
                status={status}
                kind={kind}
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}

function ThumbnailOverlay({
  image,
  status,
  kind,
}: {
  image: {
    asset: string
    alt: string
  }
  status: Status
  kind: Kind
}) {
  const [showThumbnail, setShowThumbnail] = useState<boolean>(true)

  return (
    <Transition
      show={showThumbnail}
      leave="transition duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Image
        src={image.asset}
        alt={image.alt}
        className="relative object-cover"
        fill
        priority={kind === 'event'}
        sizes={kind === 'event' ? '100vw' : '(max-width: 1020px) 100vw, 240px'}
      />
      <div className="absolute inset-0 grid place-items-center bg-black/40">
        <Button
          onClick={() => setShowThumbnail(false)}
          emphasis="high"
          size={kind === 'event' ? 'large' : 'default'}
          tone={status === 'PAST' ? 'accent' : 'highlight'}
        >
          <PlayOutlineIcon
            className={clsx(
              '-ml-1 -mr-2',
              kind === 'event' ? 'h-8 w-8' : 'h-6 w-6'
            )}
          />
        </Button>
      </div>
    </Transition>
  )
}
