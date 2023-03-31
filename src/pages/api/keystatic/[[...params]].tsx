import { makeAPIRouteHandler } from '@keystatic/next/api'
import keystaticConfig from '../../../../keystatic.config'

export default makeAPIRouteHandler({
  config: keystaticConfig,
})
