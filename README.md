![SydJS logo](public/images/sydjs.svg)

# SydJS

The website for [SydJS](https://sydjs.com/), the premier meetup for web developers discussing JavaScript in Sydney, Australia.

Content lives in this repository as Markdoc and YAML. The site is a static [Astro](https://astro.build/) build, published to [GitHub Pages](https://pages.github.com/).

## Tech stack

| Piece                                      | Role                                                                                 |
| ------------------------------------------ | ------------------------------------------------------------------------------------ |
| [Astro](https://astro.build/)              | Static site, pages, and content collections                                          |
| [Markdoc](https://markdoc.dev/)            | Event, talk, and about page content (`.mdoc`)                                        |
| [Zod](https://zod.dev/)                    | Content schemas in `src/content.config.ts`                                           |
| [Tailwind CSS](https://tailwindcss.com/) 3 | Layout and styling                                                                   |
| TypeScript                                 | Types for content, pages, and shared code                                            |
| [GitHub Pages](https://pages.github.com/)  | Hosting at [sydjs.com](https://sydjs.com/)                                           |
| pnpm                                       | Package manager. The pinned version is the `packageManager` field in `package.json`. |

Continuous integration uses Node.js 26.

## Develop locally

You need [Node.js 26](https://nodejs.org/). Enable Corepack once so the `pnpm` command uses the version pinned in `package.json`:

```sh
corepack enable
```

1. Clone the repository and open it in a terminal.
2. Install dependencies:

```sh
pnpm install
```

3. Start the dev server:

```sh
pnpm dev
```

4. Open [http://127.0.0.1:4321/](http://127.0.0.1:4321/).

Page URLs use a trailing slash, such as `/events/` and `/about/`.

Other scripts:

| Command          | What it does                                  |
| ---------------- | --------------------------------------------- |
| `pnpm build`     | Builds the static site into `out/`            |
| `pnpm start`     | Serves the production build locally           |
| `pnpm typecheck` | Runs the TypeScript check                     |
| `pnpm test`      | Runs Vitest                                   |
| `pnpm lint`      | Runs ESLint                                   |
| `pnpm depcheck`  | Reports dependencies the code does not import |

## Add an event

Create one Markdoc file per meetup under `src/content/events/`. The public URL is `/events/YYYY-MM/`, taken from the `date` field. Renaming the file does not change that URL.

Name the file `YYYY-MM-DD-kebab-event-title.mdoc`. For a meetup on May 21, 2026 titled "The future is now", use:

`src/content/events/2026-05-21-the-future-is-now.mdoc`

Copy this frontmatter and replace the placeholders. Put the event description after the closing `---`.

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
Event description.
```

Use these defaults unless the meetup details say otherwise:

| Field           | Default                                                                                                  |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| `location`      | `Atlassian Headquarters`                                                                                 |
| `address`       | `Level 29, 363 George St · Sydney`. Use `Level 6, 341 George St · Sydney` for the other Atlassian floor. |
| `startTime`     | `06:00 PM`                                                                                               |
| `endTime`       | `08:00 PM`                                                                                               |
| `featuredMedia` | `discriminant: none`                                                                                     |
| `talks`         | An empty list until talks are added                                                                      |
| `rsvpLink`      | The canonical Meetup URL for the event                                                                   |

Quote `date` as `YYYY-MM-DD`. Leave `featuredMedia` as `none` when you create the file. You can switch it to an image or a video later. Field types are defined on the `events` collection in `src/content.config.ts`.

### Link talks and speakers

Each item in `talks` is the filename of a talk in `src/content/talks/`, without `.mdoc`.

```yaml
talks:
  - 2026-05-21-1-talk-title
```

A talk file uses the same Markdoc shape. `speakers` lists person slugs from `src/content/persons/`, without `.yaml`.

```mdoc
---
name: Talk title
featuredMedia:
  discriminant: none
speakers:
  - alex-reardon
---
Talk description.
```

A person file is YAML, for example `src/content/persons/alex-reardon.yaml`:

```yaml
name: Alex Reardon
avatar: /images/avatars/alex-reardon/avatar.png
github: alexreardon
socialLinks: []
```

Put avatar images in `public/images/avatars/<slug>/`. Paths in content start with `/images/` and are public URLs. Omit a field when you do not know the value. Do not invent social handles.

## Publish a change

1. Open a pull request.
2. Wait for the preview workflow. It publishes the branch at `https://sydjs.com/pr-preview/pr-N/`, where `N` is the pull request number.
3. Check the preview. Merging to `main` publishes that version to [sydjs.com](https://sydjs.com/).
