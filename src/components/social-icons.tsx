import IconButton from '@/components/icon-button'
import {
  LinkedInIcon,
  MeetupIcon,
  TwitterIcon,
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
  twitter: (
    <IconButton
      key="twitter"
      aria-label="SydJS on Twitter"
      emphasis="low"
      href="https://twitter.com/sydjs"
      icon={TwitterIcon}
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
