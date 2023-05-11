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

    // select: fields.select({
    //   label: 'Event type',
    //   description: 'The type of event.',
    //   options: [
    //     { label: 'Meetup', value: 'meetup' },
    //     { label: 'Workshop', value: 'workshop' },
    //     { label: 'Hackathon', value: 'hackathon' },
    //     { label: 'Conference', value: 'conference' },
    //     { label: 'Other', value: 'other' },
    //   ],
    //   defaultValue: 'meetup',
    // }),

    // // WIP Featured media
    // featuredMedia: fields.conditional(
    //   fields.select({
    //     label: 'Featured media',
    //     description:
    //       'Toggle between image/video options for an optional hero media.',
    //     options: [
    //       { label: 'None', value: 'none' },
    //       { label: 'Image', value: 'image' },
    //       { label: 'Video', value: 'video' },
    //     ],
    //     defaultValue: 'image',
    //   }),
    //   {
    //     image: fields.object({
    //       none: fields.empty(),
    //       asset: fields.image({
    //         label: 'Image',
    //         directory: 'public/images/events',
    //         publicPath: '/images/events/',
    //         validation: { isRequired: true },
    //       }),
    //       alt: fields.text({ label: 'Alt' }),
    //     }),
    //     video: fields.object({
    //       url: fields.text({
    //         label: 'A YouTube video URL.',
    //       }),
    //     }),
    //   }
    // ),

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

    // Featured media (image or video)
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
      {
        label: 'Featured Media',
        description:
          'Optional image or video to display as a "hero" featured media on the event details page.',
        validation: { length: { max: 1 } },
      }
    ),

    // Relationship to Sponsors
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
  },
})
