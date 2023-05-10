import { collection, fields } from '@keystatic/core'

export default collection({
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
})
