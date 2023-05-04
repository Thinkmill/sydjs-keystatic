import { makeAPIRouteHandler } from '@keystatic/next/api'
import keystaticConfig from '@/app/keystatic/keystatic.config'

export default makeAPIRouteHandler({
  config: keystaticConfig,
})
