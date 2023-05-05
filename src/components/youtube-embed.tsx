import clsx from 'clsx'
import { getYouTubeEmbedUrl } from '@/lib/get-youtube-embed-url'

type YouTubeEmbedProps = {
  videoUrl: string
} & React.ComponentProps<'iframe'>

export default function YouTubeEmbed({
  videoUrl,
  className,
}: YouTubeEmbedProps) {
  const embedUrl = getYouTubeEmbedUrl(videoUrl)

  return (
    <iframe
      className={clsx('aspect-video w-full', className)}
      src={embedUrl}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  )
}
