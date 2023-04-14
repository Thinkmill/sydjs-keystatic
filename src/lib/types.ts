import { EntryWithResolvedLinkedFiles } from '@keystatic/core/reader'
import keystaticConfig from '../../keystatic.config'

export type Status = 'UPCOMING' | 'TODAY' | 'PAST'

export type EventWithStatusAndSlug = EntryWithResolvedLinkedFiles<
  (typeof keystaticConfig)['collections']['events']
> & { slug: string; status: Status }
