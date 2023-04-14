import { isFuture } from 'date-fns'

import type { Status } from './types'

export function getStatus(date: string): Status {
  const today = new Date()
  const eventDate = new Date(date)

  if (isFuture(eventDate)) return 'UPCOMING'
  if (eventDate.toDateString() === today.toDateString()) return 'TODAY'
  return 'PAST'
}
