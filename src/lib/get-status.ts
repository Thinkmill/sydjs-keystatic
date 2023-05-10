import { isFuture } from 'date-fns'

export type Status = 'UPCOMING' | 'TODAY' | 'PAST'

export function getStatus(date: string): Status {
  const today = new Date()
  const eventDate = new Date(date)

  if (isFuture(eventDate)) return 'UPCOMING'
  if (eventDate.toDateString() === today.toDateString()) return 'TODAY'
  return 'PAST'
}
