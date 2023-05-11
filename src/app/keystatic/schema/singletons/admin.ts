import { singleton, fields } from '@keystatic/core'

import { componentBlocks } from '@/app/keystatic/blocks'

export default singleton({
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
      description: 'The page copy for the anbout page',
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
})
