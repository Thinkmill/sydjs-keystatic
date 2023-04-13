import { config, component, collection, fields, singleton } from '@keystatic/core'
import type { LocalConfig, GitHubConfig } from '@keystatic/core'

const storage: LocalConfig['storage'] | GitHubConfig['storage'] =
  process.env.NODE_ENV === 'development'
    ? { kind: 'local' }
    : {
        kind: 'github',
        repo: {
          owner: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER!,
          name: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG!,
        },
      }

export default config({
  storage,
  collections: {
    // Events
    events: collection({
      label: 'Events',
      path: 'src/content/events/*/',
      slugField: 'name',
      schema: {
        name: fields.slug({
          name: {
            label: 'Name',
          },
        }),
        description: fields.document({ label: 'Description', formatting: true }),
        speakers: fields.array(
          fields.relationship({
            label: 'Speaker',
            collection: 'persons',
            validation: { isRequired: true },
          }),
          {
            label: 'Speakers',
            itemLabel: (props) => props.value ?? 'Please select a speaker',
          }
        ),
        talks: fields.array(
          fields.relationship({
            label: 'Talk',
            collection: 'talks',
            validation: { isRequired: true },
          }),
          {
            label: 'Talks',
            itemLabel: (props) => props.value ?? 'Please select a talk',
          }
        ),
        sponsors: fields.array(
          fields.relationship({
            label: 'Sponsor',
            collection: 'sponsors',
            validation: { isRequired: true },
          }),
          {
            label: 'Sponsors',
            itemLabel: (props) => props.value ?? 'Please select a sponsor',
          }
        ),
        date: fields.date({ label: 'Date', validation: { isRequired: true } }),
        location: fields.text({ label: 'Location' }),
        video: fields.text({ label: 'Video URL' }),
        startTime: fields.text({ label: 'Start time' }),
        endTime: fields.text({ label: 'End time' }),
        image: fields.image({ label: 'Image' }),
      },
    }),

    // Talks
    talks: collection({
      label: 'Talks',
      path: 'src/content/talks/*',
      slugField: 'name',
      schema: {
        name: fields.slug({
          name: {
            label: 'Name',
          },
        }),
        description: fields.text({ label: 'Description', multiline: true }),
        speakers: fields.array(
          fields.relationship({
            label: 'Speaker',
            collection: 'persons',
            validation: { isRequired: true },
          }),
          {
            label: 'Speakers',
            itemLabel: (props) => props.value ?? 'Please select a speaker',
          }
        ),
        video: fields.text({ label: 'Video URL' }),
      },
    }),

    // Persons
    persons: collection({
      label: 'Persons',
      path: 'src/content/persons/*',
      slugField: 'name',
      schema: {
        name: fields.slug({
          name: {
            label: 'Name',
          },
        }),
        avatar: fields.image({
          label: 'Avatar',
          directory: 'public/images/avatars',
        }),
        socialLinks: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            link: fields.url({ label: 'URL', validation: { isRequired: true } }),
          }),
          {
            label: 'Social Links',
            itemLabel: (props) => props.fields.label.value ?? 'Please enter a label',
          }
        ),
      },
    }),

    // Sponsors
    sponsors: collection({
      label: 'Sponsors',
      path: 'src/content/events/*',
      slugField: 'name',
      schema: {
        name: fields.slug({
          name: {
            label: 'Name',
          },
        }),
        logo: fields.image({
          label: 'Logo',
        }),
        website: fields.url({ label: 'Website' }),
      },
    }),
  },
  singletons: {
    admin: singleton({
      label: 'Admin',
      path: 'src/content/admin/',
      schema: {
        siteTitle: fields.text({ label: 'Site Title' }),
        siteDescription: fields.text({ label: 'Site Description', multiline: true }),
        homepageTitle: fields.text({ label: 'Homepage Title', multiline: true }),
        homepageDescription: fields.text({ label: 'Homepage Description', multiline: true }),
      },
    }),
  },
})
