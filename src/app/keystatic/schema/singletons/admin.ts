import { singleton, fields } from '@keystatic/core'

import { componentBlocks } from '@/app/keystatic/blocks'

export default singleton({
  label: 'Admin',
  path: 'src/content/admin/',
  schema: {
    siteTitle: fields.text({
      label: 'Site Title',
      description: 'This will be used as the homepage SEO title.',
    }),
    siteDescription: fields.text({
      label: 'Site Description',
      multiline: true,
      description: 'This will be used as the homepage SEO description.',
    }),
    homepageTitle: fields.text({
      label: 'Homepage Title',
      multiline: true,
      description: 'The homepage hero headline title.',
    }),
    homepageDescription: fields.text({
      label: 'Homepage Description',
      multiline: true,
      description: 'The homepage hero headline description.',
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
