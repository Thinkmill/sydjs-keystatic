import Image from 'next/image'
import { asyncComponent } from '@/lib/async-component'
import { reader } from '@/app/keystatic/reader'

export const Organiser = asyncComponent(async function Organiser({
  slug,
}: {
  slug: string
}) {
  const person = await reader.collections.persons.read(slug)
  return (
    <li className="not-prose flex flex-col md:flex-1">
      {person?.avatar && (
        <Image
          width={160}
          height={160}
          src={person.avatar}
          alt=""
          className="aspect-square w-32 rounded-2xl object-cover"
        />
      )}
      <p className="not-prose mt-4 text-2xl font-medium text-black">
        {person?.name}
      </p>
      {person?.twitterHandle && (
        <a
          aria-label={`@{person.twitterHandle} (Opens in new tab)`}
          href={`https://twitter.com/${person.twitterHandle}`}
          className="not-prose font-semibold text-black underline hover:no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          @{person.twitterHandle}
        </a>
      )}
    </li>
  )
})
