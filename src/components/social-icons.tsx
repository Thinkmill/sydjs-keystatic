import IconButton from '@/components/icon-button'
import {
  LinkedInIcon,
  MeetupIcon,
  XIcon,
  YouTubeIcon,
} from '@/components/svg-icons'

export const socialIcons = {
  meetup: (
    <IconButton
      key="meetup"
      aria-label="SydJS on Meetup"
      emphasis="low"
      href="https://www.meetup.com/en-AU/sydjs-classic/"
      icon={MeetupIcon}
      openInNewTab
    />
  ),
  linkedin: (
    <IconButton
      key="linkedin"
      aria-label="SydJS on LinkedIn"
      emphasis="low"
      href="https://www.linkedin.com/company/sydjs"
      icon={LinkedInIcon}
      openInNewTab
    />
  ),
  x: (
    <IconButton
      key="x"
      aria-label="SydJS on X"
      emphasis="low"
      href="https://x.com/sydjs"
      icon={XIcon}
      openInNewTab
    />
  ),
  youtube: (
    <IconButton
      key="youtube"
      aria-label="SydJS on YouTube"
      emphasis="low"
      href="https://www.youtube.com/@SydJSMeetup"
      icon={YouTubeIcon}
      openInNewTab
    />
  ),
}
