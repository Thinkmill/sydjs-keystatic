import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const mediaImage = z.object({
  asset: z.string().optional(),
  alt: z.string().optional(),
})

const featuredMedia = z.discriminatedUnion('discriminant', [
  z.object({
    discriminant: z.literal('none'),
  }),
  z.object({
    discriminant: z.literal('image'),
    value: z.object({
      asset: z.string(),
      alt: z.string().optional(),
    }),
  }),
  z.object({
    discriminant: z.literal('video'),
    value: z.object({
      url: z.string().min(1),
      image: mediaImage,
    }),
  }),
])

const events = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/events' }),
  schema: z.object({
    name: z.string(),
    seoDescription: z.string().optional(),
    date: z
      .union([z.string(), z.date()])
      .transform((value) =>
        value instanceof Date ? value.toISOString().slice(0, 10) : value
      ),
    location: z.string().optional(),
    address: z.string().optional(),
    startTime: z.string().min(1),
    endTime: z.string().optional(),
    rsvpLink: z.string().optional(),
    zoomLink: z.string().optional(),
    featuredMedia,
    talks: z.array(z.string()).default([]),
  }),
})

const talks = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/talks' }),
  schema: z.object({
    name: z.string(),
    featuredMedia,
    speakers: z.array(z.string()).default([]),
  }),
})

const persons = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/persons' }),
  schema: z.object({
    name: z.string(),
    avatar: z.string().optional(),
    twitterHandle: z.string().optional(),
    bluesky: z.string().optional(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
    mastodon: z.string().optional(),
    website: z.string().optional(),
    socialLinks: z
      .array(
        z.object({
          label: z.string(),
          link: z.string().url(),
        })
      )
      .default([]),
  }),
})

const admin = defineCollection({
  loader: glob({ pattern: 'index.yaml', base: './src/content/admin' }),
  schema: z.object({
    siteTitle: z.string().optional(),
    siteDescription: z.string().optional(),
    homepageTitle: z.string().optional(),
    homepageDescription: z.string().optional(),
  }),
})

const about = defineCollection({
  loader: glob({ pattern: 'aboutPage.mdoc', base: './src/content/admin' }),
  schema: z.object({}),
})

export const collections = { events, talks, persons, admin, about }

export type EventData = import('astro:content').CollectionEntry<'events'>['data']
export type TalkData = import('astro:content').CollectionEntry<'talks'>['data']
export type Person = import('astro:content').CollectionEntry<'persons'>['data']
export type FeaturedMedia = EventData['featuredMedia']
