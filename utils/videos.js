/**
 * RegEx to extract ID from any Youtube video URL format
 */
const youtubeVideoIdRegEx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/

export function getYoutubeIdFromVideoLink (videoLink) {
  const matched = videoLink.match(youtubeVideoIdRegEx)

  return matched && matched[1]
}

function getYoutubeThumbnailUrlById (videoId) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}

export function formatVideo (video) {
  const videoId = getYoutubeIdFromVideoLink(video.url)
  return {
    ...video,
    id: videoId,
    thumbnail: video.thumbnail || getYoutubeThumbnailUrlById(videoId)
  }
}
