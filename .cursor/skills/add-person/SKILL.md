---
name: add-person
description: Creates or updates a person profile in src/content/persons/ from a name the user provides. Looks up existing entries, researches public profiles via web search, and fills Keystatic person fields. Use when the user wants to add, create, or populate a person, speaker, or profile.
---

# Add a Person Profile

Creates or enriches a person `.yaml` file in `src/content/persons/`.

Schema source: `src/app/keystatic/schema/collections/persons.ts`

## Input

The user provides a **display name** (e.g. `Alex Reardon`, `Sharkie`). Optional context helps disambiguation: employer, talk title, GitHub handle, “SydJS speaker”, etc.

## Step 1 — Find or create the entry

1. Derive the expected slug: lowercase, hyphenated full name (e.g. `Alex Reardon` → `alex-reardon`). Mononyms stay as one segment (`Sharkie` → `sharkie`).
2. List `src/content/persons/*.yaml` and check:
   - **Filename** matches `{slug}.yaml`
   - **`name:`** field matches the user’s name (case-insensitive; allow minor spelling variants)
3. **If a match exists**: open that file and **only fill empty/missing fields** unless the user explicitly asked to overwrite, or you find strong evidence that the person's details have changed.
4. **If no match**: create `src/content/persons/{slug}.yaml`.

## Step 2 — Research (web search)

Search for the person using their name plus any context the user gave. Prefer primary sources: personal site, GitHub, conference bios, SydJS/meetup speaker pages, LinkedIn, Bluesky, X/Twitter, Mastodon.

**Goal**: populate as many schema fields as possible with **verified** public information.

### Field mapping (schema → YAML)

| Schema field      | YAML key          | Format |
| ----------------- | ----------------- | ------ |
| `name`            | `name`            | Display name as the user gave it (title case unless they used a specific stylization) |
| `avatar`          | `avatar`          | `/images/avatars/{slug}/avatar.{jpeg\|jpg\|png\|webp}` — see Avatar below |
| `twitterHandle`   | `twitterHandle`   | Handle only, **no** `@` |
| `bluesky`         | `bluesky`         | Handle only, **no** `@` (e.g. `user.bsky.social`) |
| `github`          | `github`          | Username only |
| `linkedin`        | `linkedin`        | Username or slug from profile URL, not full URL |
| `mastodon`        | `mastodon`        | **Full** profile URL (e.g. `https://mastodon.social/@handle`) |
| `website`         | `website`         | Full URL with scheme |
| `socialLinks`     | `socialLinks`     | Only for other networks; each item needs `label` + `link` (full URL) |

Omit YAML keys entirely when unknown — do not use empty strings for optional text fields.

Use `socialLinks: []` when there are no extra links (matches existing files).

### Avatar

1. Set `avatar` to the conventional path: `/images/avatars/{slug}/avatar.{ext}`.
2. If a reliable public avatar image URL is found, download it to `public/images/avatars/{slug}/avatar.{ext}` (create the directory). Use a sensible extension from the source - you can use CLI tools to determine the file type if needed.
3. If no suitable image is found, alert the user to add the file under `public/images/avatars/{slug}/`.

## Step 3 — Uncertainty rules

**Wrong person is worse than an empty field.**

- **Identity**: If search results could be multiple people with the same name, **stop** and ask the user to confirm (offer links or distinguishing details). Do not write the file until confirmed.
- **Individual fields**: If a handle or URL is not clearly this person, **omit that field** and note what was skipped.
- **Never invent** handles, URLs, or employers from guesswork.
- After writing, give a short summary: fields filled, fields skipped, and anything the user should verify or supply (especially avatar file).

## Step 4 — Write the file

Match existing repo style (see `src/content/persons/alex-reardon.yaml`, `ben-buchanan.yaml`) and the defined schema above.

**Updating**: preserve existing values; merge new research into gaps only.

## Checklist

```
- [ ] Resolved name → slug; checked for existing file
- [ ] Confirmed correct person (or asked user)
- [ ] Web search done; fields verified or omitted
- [ ] YAML written under src/content/persons/
- [ ] Avatar path set; image downloaded if possible
- [ ] User told what was filled, skipped, and needs manual follow-up
```
