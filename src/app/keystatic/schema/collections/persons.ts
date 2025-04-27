import { collection, fields } from '@keystatic/core'
import { Reader } from '@keystatic/core/reader'

const persons = collection({
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
      publicPath: '/images/avatars/',
    }),
    twitterHandle: fields.text({
      label: 'Twitter Handle',
      description: 'The twitter handle, without the `@` symbol.',
    }),
    bluesky: fields.text({
      label: 'Bluesky Handle',
      description: 'The bluesky handle, without the `@` symbol.',
    }),
    github: fields.text({
      label: 'GitHub',
      description: 'The GitHub username.',
    }),
    linkedin: fields.text({
      label: 'LinkedIn',
      description: 'The LinkedIn username.',
    }),
    // We can't make these URLs, otherwise they become required
    mastodon: fields.text({
      label: 'Mastodon',
      description: 'The Mastodon profile URL.',
    }),
    website: fields.text({
      label: 'Website',
      description: 'The personal website URL.',
    }),
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
        description: 'If any other social media links, add them here.',
        itemLabel: (props) =>
          props.fields.label.value ?? 'Please enter a label',
      }
    ),
  },
})
export default persons

export type Person = Exclude<
  Awaited<
    ReturnType<
      Reader<{ persons: typeof persons }, {}>['collections']['persons']['read']
    >
  >,
  null | undefined
>
