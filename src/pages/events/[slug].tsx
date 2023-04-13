import Image from 'next/image'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import Event from '@/components/event'

import { getAllEventSlugs, getEventBySlug, getAllEvents } from '@/lib/keystatic-reads'

export async function getStaticProps(context: GetStaticPropsContext) {
  const slug = context.params?.slug
  if (!slug) throw new Error('Slug not found')

  const event = await getEventBySlug(slug as string)

  return {
    props: { event },
  }
}

export async function getStaticPaths() {
  const eventSlugs = await getAllEventSlugs()

  return {
    paths: eventSlugs.map((slug) => ({
      params: { slug },
    })),
    fallback: true,
  }
}

export default function EventDetailsPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <div className="mx-auto mt-8 max-w-7xl space-y-6 px-6">
        <Event event={props.event} />
      </div>
      {props.event?.talks.length > 0 && (
        <div className="mx-auto mt-8 max-w-5xl px-6">
          <h2 className="mt-20 text-4xl font-bold">Talks</h2>
          <ul className="mt-12 grid gap-18">
            {props.event?.talks.map((talk: any) => (
              <li key={talk.slug} className="max-w-xl">
                <h2 className="text-3xl font-bold">{talk?.name}</h2>
                <ul className="mt-3 flex flex-wrap gap-x-10 gap-y-4">
                  {talk.speakers &&
                    talk.speakers.slice(0, 2).map((speaker: any) => (
                      <li key={speaker.slug} className="flex gap-3">
                        <Image
                          src={`/images/avatars/${speaker.slug}/${speaker.avatar}`}
                          alt={`Avatar for ${speaker.name}`}
                          width={40}
                          height={40}
                          className="h-8 w-8 rounded-xl object-cover"
                        />
                        <div>
                          <p className="text-sm/none font-medium">By {speaker.name}</p>
                          <p className="mt-1 text-sm/none font-semibold">@yoloooo</p>
                        </div>
                      </li>
                    ))}
                </ul>
                <p className="mt-6 line-clamp-3 text-lg/6">{talk.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
