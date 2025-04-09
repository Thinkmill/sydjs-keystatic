import keystaticConfig from '@/app/keystatic/keystatic.config'
import { makeRouteHandler } from '@keystatic/next/route-handler'

export const { POST, GET } = makeRouteHandler({
  config: keystaticConfig,
})
