import { collection, fields } from '@keystatic/core'

export default collection({
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
})
