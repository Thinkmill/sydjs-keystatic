import { config, collection, fields, singleton } from '@keystatic/core'
import type { LocalConfig, GitHubConfig } from '@keystatic/core'
import { componentBlocks } from '@/app/keystatic/blocks'

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
        description: fields.document({
          label: 'Description',
          formatting: true,
        }),
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
        address: fields.text({ label: 'Address' }),
        startTime: fields.text({ label: 'Start time' }),
        endTime: fields.text({ label: 'End time' }),
        feature: fields.blocks(
          {
            image: {
              label: 'Featured image',
              schema: fields.object({
                asset: fields.image({
                  label: 'Image',
                  directory: 'public/images/events',
                  publicPath: '/images/events/',
                  validation: { isRequired: true },
                }),
                alt: fields.text({ label: 'Alt' }),
              }),
            },
            video: {
              label: 'Featured video',
              schema: fields.object({
                url: fields.text({
                  label: 'A YouTube video URL.',
                }),
              }),
            },
          },
          { label: 'Featured Media', validation: { length: { max: 1 } } }
        ),
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
        description: fields.document({
          label: 'Description',
          formatting: true,
        }),
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
        image: fields.image({
          label: 'Featured Image',
          directory: 'public/images/talks',
          publicPath: '/images/talks/',
        }),
        video: fields.text({
          label: 'Featured Video',
          description:
            'A YouTube video URL. Can include a timestamp! If specified, the video will take precedence over the image.',
        }),
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
        twitterHandle: fields.text({ label: 'Twitter Handle' }),
        socialLinks: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            link: fields.url({
              label: 'URL',
              validation: { isRequired: true },
            }),
          }),
          {
            label: 'Social Links',
            itemLabel: (props) =>
              props.fields.label.value ?? 'Please enter a label',
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
        siteDescription: fields.text({
          label: 'Site Description',
          multiline: true,
        }),
        homepageTitle: fields.text({
          label: 'Homepage Title',
          multiline: true,
        }),
        homepageDescription: fields.text({
          label: 'Homepage Description',
          multiline: true,
        }),
        aboutPage: fields.document({
          label: 'About Page',
          componentBlocks,
          formatting: {
            headingLevels: {
              levels: [1, 2, 3, 4],
            },
            inlineMarks: {
              bold: true,
              italic: true,
            },
            listTypes: true,
            softBreaks: true,
          },
          links: true,
        }),
      },
    }),
  },
})
