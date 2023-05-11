'use client'

import { useState } from 'react'
import { Transition } from '@headlessui/react'
import Image from 'next/image'
import clsx from 'clsx'
import { Entry } from '@keystatic/core/reader'
import { Status, getStatus } from '@/lib/get-status'
import keystaticConfig from '@/app/keystatic/keystatic.config'
import YouTubeEmbed from '@/components/youtube-embed'
import Button from '@/components/button'
import { PlayOutlineIcon } from '@/components/svg-icons'

type MediaProps = {
  media: Entry<
    (typeof keystaticConfig)['collections']['events']
  >['featuredMedia']
  status: Status
}

export function FeaturedMedia({ media, status }: MediaProps) {
  return (
    <div
      className={clsx(
        "before:l-0 relative before:absolute before:h-1/2 before:w-full before:rounded-b-[40px] before:content-['']",
        status === 'PAST' ? 'before:bg-accent' : 'before:bg-highlight'
      )}
    >
      <div className="relative px-6 lg:px-8">
        {/* Featured image */}
        {media.discriminant === 'image' && (
          <Image
            className="mx-auto aspect-video max-w-6xl rounded-2xl object-cover"
            src={media.value.asset}
            alt={media.value.alt}
            width={1200}
            height={675}
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
              {/* Thumbnail image override */}
              {media.value.image?.asset && (
                <ThumbnailOverlay
                  image={media.value.image.asset}
                  status={status}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function ThumbnailOverlay({
  image,
  status,
}: {
  image: string
  status: Status
}) {
  const [showThumbnail, setShowThumbnail] = useState<boolean>(true)

  return (
    <Transition
      show={showThumbnail}
      leave="transition duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Image src={image} fill alt="" className="object-cover" />
      <div className="absolute inset-0 grid place-items-center bg-black/40">
        <Button
          onClick={() => setShowThumbnail(false)}
          emphasis="high"
          size="large"
          tone={status === 'PAST' ? 'accent' : 'highlight'}
        >
          <PlayOutlineIcon className="-ml-1 -mr-2 h-8 w-8" />
        </Button>
      </div>
    </Transition>
  )
}
