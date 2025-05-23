import type { Person } from '@/app/keystatic/schema/collections/persons'
import {
  GitHubIcon,
  LinkIcon,
  MastodonIcon,
  BlueskyIcon,
  LinkedInIcon,
  XIcon,
  type IconComponent,
} from '@/components/svg-icons'

type PersonLink = keyof Pick<
  Person,
  'bluesky' | 'mastodon' | 'twitterHandle' | 'github' | 'linkedin' | 'website'
>
const icons: Record<PersonLink, IconComponent> = {
  bluesky: BlueskyIcon,
  mastodon: MastodonIcon,
  twitterHandle: XIcon,
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  website: LinkIcon,
}

const urls: Record<PersonLink, string> = {
  bluesky: 'https://bsky.app/profile/',
  twitterHandle: 'https://x.com/',
  github: 'https://github.com/',
  linkedin: 'https://linkedin.com/in/',
  mastodon: '',
  website: '',
}

export default function getPersonLinks(person: Partial<Person>) {
  const sortOrder: PersonLink[] = [
    'bluesky',
    'mastodon',
    'twitterHandle',
    'github',
    'linkedin',
    'website',
  ]

  const links: [PersonLink, string][] = sortOrder
    .map((key) => [key, person[key]])
    .filter(
      (pair): pair is [PersonLink, string] =>
        typeof pair[1] === 'string' && pair[1].length > 0
    )

  return links.map(([key, value]) => {
    let label

    if (key === 'website') {
      const url = new URL(value)
      label = url.host
    } else {
      label = '@' + value
    }

    if (key === 'linkedin') {
      label = label.replace(/-[a-f0-9]{8,}$/g, '')
    } else if (key === 'mastodon') {
      const url = new URL(value)
      label = url.pathname.slice(1)
    } else if (key === 'bluesky') {
      label = label.replace('.bsky.social', '')
    }

    return {
      key,
      label,
      url: urls[key as PersonLink] + value,
      icon: icons[key as PersonLink],
    }
  })
}
