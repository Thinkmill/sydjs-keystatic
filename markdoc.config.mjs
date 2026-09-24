import { defineMarkdocConfig, component } from '@astrojs/markdoc/config'

export default defineMarkdocConfig({
  tags: {
    organiserList: {
      render: component('./src/components/OrganiserList.astro'),
      attributes: {
        content: { type: Array },
      },
    },
  },
})
