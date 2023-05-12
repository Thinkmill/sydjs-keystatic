import { collection, fields } from '@keystatic/core'

export default collection({
  label: 'Events',
  path: 'src/content/events/*',
  format: {
    contentField: 'description',
  },
  slugField: 'name',
  schema: {
    name: fields.slug({
      name: {
        label: 'Name',
        description: 'The name of the event.',
      },
      slug: {
        description:
          'The slug for the event. This is auto-generated and will be used in the URL.',
      },
    }),
    description: fields.document({
      label: 'Event description',
      description: 'The copy that will show in the event card.',
      formatting: true,
    }),
    date: fields.date({ label: 'Date', validation: { isRequired: true } }),
    location: fields.text({
      label: 'Location',
      description: 'Venue name, short. Use address field for details.',
    }),
    address: fields.text({ label: 'Address' }),
    startTime: fields.text({
      label: 'Start time',
      description: 'Example: 6:30 PM',
      validation: { length: { min: 1 } },
    }),
    endTime: fields.text({
      label: 'End time',
      description: 'Example: 8:30 PM',
    }),
    rsvpLink: fields.text({
      label: 'RSVP link',
      description:
        'The Meetup.com URL to the registration page for this event.',
    }),
    zoomLink: fields.text({
      label: 'Zoom link',
      description:
        'If the event is live streamed, paste the Zoom link to allow folks to join remotely.',
    }),

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
            directory: 'public/images/events',
            publicPath: '/images/events/',
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
              directory: 'public/images/events',
              publicPath: '/images/events/',
            }),
            alt: fields.text({ label: 'Alt', description: 'Image alt text.' }),
          }),
        }),
      }
    ),

    // Relationship to Talks
    talks: fields.array(
      fields.relationship({
        label: 'Talk',
        collection: 'talks',
        validation: { isRequired: true },
      }),
      {
        label: 'Talks',
        description:
          'The talks (from the Talks collection) that will be presented at this event.',
        itemLabel: (props) => props.value ?? 'Please select a talk',
      }
    ),

    // Relationship to Sponsors (not a thing yet, but let's leave the schema as demo)
    // sponsors: fields.array(
    //   fields.relationship({
    //     label: 'Sponsor',
    //     collection: 'sponsors',
    //     validation: { isRequired: true },
    //   }),
    //   {
    //     label: 'Sponsors',
    //     itemLabel: (props) => props.value ?? 'Please select a sponsor',
    //   }
    // ),
  },
})
