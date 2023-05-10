import Image from 'next/image'
import keystaticConfig from '@/app/keystatic/keystatic.config'
import { createReader } from '@keystatic/core/reader'

async function getData(slug: string) {
  const reader = createReader('', keystaticConfig)
  return reader.collections.persons.read(slug)
}

export const Organiser = async ({ slug }: { slug: string }) => {
  const data = await getData(slug)
  return (
    <div className="not-prose flex flex-col md:flex-1">
      {data?.avatar && (
        <Image
          width={160}
          height={160}
          src={data.avatar}
          alt=""
          className="aspect-square w-32 rounded-2xl object-cover"
        />
      )}
      <p className="not-prose mt-4 text-2xl font-medium text-black">
        {data?.name}
      </p>
      {data?.twitterHandle && (
        <a
          href={`https://twitter.com/${data.twitterHandle}`}
          className="not-prose font-semibold text-black underline hover:no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          @{data.twitterHandle}
        </a>
      )}
    </div>
  )
}
