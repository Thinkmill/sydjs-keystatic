import { EntryWithResolvedLinkedFiles } from '@keystatic/core/reader'
import keystaticConfig from '@/app/keystatic/keystatic.config'

export type Status = 'UPCOMING' | 'TODAY' | 'PAST'

export type EventWithStatusAndSlug = EntryWithResolvedLinkedFiles<
  (typeof keystaticConfig)['collections']['events']
> & { slug: string; status: Status }
