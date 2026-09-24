/** Stable public id for an event. One meetup per month, so the URL ignores the filename. */
export function eventMonthSlug(date: unknown): string {
  const iso =
    date instanceof Date
      ? date.toISOString().slice(0, 10)
      : String(date).slice(0, 10)
  const month = iso.slice(0, 7)
  if (!/^\d{4}-\d{2}$/.test(month)) {
    throw new Error(
      `Event date must be YYYY-MM-DD to build a stable URL, received ${String(date)}`,
    )
  }
  return month
}
