/*
  Shoutout to ChatGPT for generating 
  this function with my guidance 
  and feedback :)
*/
export function getYouTubeEmbedUrl(url: string) {
  const videoIdMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?(?:.*&)?v=))([\w-]{11})/
  )
  const timestampMatch = url.match(/[?&]t=(\d+)/)

  if (videoIdMatch) {
    const videoId = videoIdMatch[1]
    const timestamp = timestampMatch ? parseInt(timestampMatch[1], 10) : 0
    return `https://www.youtube.com/embed/${videoId}?start=${timestamp}`
  } else {
    throw new Error('Invalid YouTube URL')
  }
}
