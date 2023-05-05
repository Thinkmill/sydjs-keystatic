import { makeAPIRouteHandler } from '@keystatic/next/api'
import keystaticConfig from '@/app/keystatic/keystatic.config'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
    responseLimit: '20mb',
  },
}

export default makeAPIRouteHandler({
  config: keystaticConfig,
})
