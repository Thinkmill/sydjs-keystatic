import keystaticConfig from '@/app/keystatic/keystatic.config'
import { createReader } from '@keystatic/core/reader'

async function getData(slug: string) {
  const reader = createReader('', keystaticConfig)
  return reader.collections.persons.read(slug)
}

export const Organiser = async ({ slug }: { slug: string }) => {
  const data = await getData(slug)
  return (
    <div className="not-prose">
      {data?.avatar && (
        <div className="relative mb-2 aspect-square overflow-hidden rounded-xl">
          <img
            src={`/images/avatars/${slug}/${data.avatar}`}
            alt=""
            className="w-fill h-full object-cover"
          />
        </div>
      )}
      <p className="not-prose text-2xl font-medium">{data?.name}</p>
      {data?.socialLinks.map((el) => (
        <a
          href={el.link}
          className="not-prose underline hover:no-underline"
          target="_blank"
          rel="noopener noreferrer"
          key={`${slug}-${el.link}`}
        >
          {el.label}
        </a>
      ))}
    </div>
  )
}
