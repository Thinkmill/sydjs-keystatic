---
name: add-event
description: Scaffolds a new SydJS event file in src/content/events/. Use when the user wants to add, create, or scaffold a new meetup event.
---

# Add a New SydJS Event

Creates a single event `.mdoc` file in `src/content/events/`.

## Before creating

If the user hasn't provided a meetup.com event URL, ask for it. Fetch the URL to extract:

- Event name
- Date
- Location/venue name
- RSVP link (use the canonical URL as-is from the page)
- Description (use verbatim as the `.mdoc` body)

If the meetup.com URL can't be fetched, ask the user to provide the event name, date, location, and description directly.

## File naming

`src/content/events/YYYY-MM-DD-kebab-event-title.mdoc`

Example: `2026-05-21-the-future-is-now.mdoc`

## Defaults

| Field           | Default                            | Override when…                                                                                      |
| --------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------- |
| `location`      | fetched from meetup.com            | Falls back to `Atlassian Headquarters` if not found                                                 |
| `address`       | `Level 29, 363 George St · Sydney` | Use `Level 6, 341 George St · Sydney` for the other Atlassian floor; override entirely if a non-Atlassian venue is fetched |
| `startTime`     | `06:00 PM`                         | User specifies otherwise                                                                            |
| `endTime`       | `08:00 PM`                         | User specifies otherwise                                                                            |
| `featuredMedia` | `discriminant: none`               | Never change this at creation time                                                                  |
| `talks`         | _(empty list)_                     | Leave empty — talks are added separately                                                            |

## Template

```mdoc
---
name: 'EVENT NAME'
date: 'YYYY-MM-DD'
location: Atlassian Headquarters
address: Level 29, 363 George St · Sydney
startTime: 06:00 PM
endTime: 08:00 PM
rsvpLink: MEETUP_URL
featuredMedia:
  discriminant: none
talks: []
---
EVENT DESCRIPTION (verbatim from meetup.com)
```
