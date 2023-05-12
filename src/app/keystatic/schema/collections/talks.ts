import { collection, fields } from '@keystatic/core'

export default collection({
  label: 'Talks',
  path: 'src/content/talks/*',
  format: {
    contentField: 'description',
  },
  slugField: 'name',
  schema: {
    name: fields.slug({
      name: {
        label: 'Name',
      },
      slug: {
        description: `Once created, do not change! If you do, you'll need to update the relationship field from the "Event" entry that links to this talk.`,
      },
    }),
    description: fields.document({
      label: 'Description',
      description: 'A short description of the talk.',
      formatting: true,
      links: true,
    }),
    speakers: fields.array(
      fields.relationship({
        label: 'Speaker',
        collection: 'persons',
        validation: { isRequired: true },
      }),
      {
        label: 'Speakers',
        description: 'A list of one or multiple speakers presenting the talk.',
        itemLabel: (props) => props.value ?? 'Please select a speaker',
      }
    ),
    // Featured media
    featuredMedia: fields.conditional(
      fields.select({
        label: 'Featured media',
        description: 'Optional image/video options for an optional hero media.',
        options: [
          { label: 'No media', value: 'none' },
          { label: 'Image', value: 'image' },
          { label: 'Video', value: 'video' },
        ],
        defaultValue: 'none',
      }),
      {
        none: fields.empty(),
        image: fields.object({
          asset: fields.image({
            label: 'Image',
            directory: 'public/images/talks',
            publicPath: '/images/talks/',
            validation: { isRequired: true },
          }),
          alt: fields.text({ label: 'Alt', description: 'Image alt text.' }),
        }),
        video: fields.object({
          url: fields.text({
            label: 'A YouTube video URL.',
            validation: { length: { min: 1 } },
          }),
          image: fields.object({
            asset: fields.image({
              label: 'Image',
              description: 'Thumbnail image override for the video.',
              directory: 'public/images/talks',
              publicPath: '/images/talks/',
            }),
            alt: fields.text({ label: 'Alt', description: 'Image alt text.' }),
          }),
        }),
      }
    ),
  },
})
