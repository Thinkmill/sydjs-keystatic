import { collection, fields } from '@keystatic/core'

export default collection({
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
        description:
          'If any other social media links than Twitter, add them here.',
        itemLabel: (props) =>
          props.fields.label.value ?? 'Please enter a label',
      }
    ),
  },
})
