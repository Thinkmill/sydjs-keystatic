import Image from 'next/image'
import { asyncComponent } from '@/lib/async-component'
import { reader } from '@/app/keystatic/reader'
import getPersonLinks from '@/lib/get-person-links'

export const Organiser = asyncComponent(async function Organiser({
  slug,
}: {
  slug: string
}) {
  const person = await reader.collections.persons.readOrThrow(slug)
  const [primaryLink] = getPersonLinks(person)
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
      {primaryLink && (
        <a
          aria-label={`${primaryLink.label} (Opens in new tab)`}
          href={primaryLink.url}
          className="not-prose flex items-center gap-1 font-semibold text-black underline hover:no-underline"
          target="_blank"
          rel="noopener"
        >
          <primaryLink.icon width={20} height={20} />
          <span>{primaryLink.label}</span>
        </a>
      )}
    </li>
  )
})
