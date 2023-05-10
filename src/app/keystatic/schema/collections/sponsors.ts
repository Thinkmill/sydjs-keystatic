import { collection, fields } from '@keystatic/core'

export default collection({
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
})
