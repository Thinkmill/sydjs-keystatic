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
})
