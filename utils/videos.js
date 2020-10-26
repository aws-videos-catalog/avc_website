/**
 * Format seconds to human readable format without leading zeros
 * Formatting example:
 * 124 -> '2:04'
 * 1000 -> '16:40'
 * 7123 -> '1:58:43'
 *
 * @param seconds {Number}
 * @returns {string}
 */
function formatDuration (seconds) {
  return new Date(seconds * 1000).toISOString().
    substr(11, 8).
    replace(/^[0:]+/, '')
}

function getYoutubeThumbnailUrlById (videoId) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}

export function formatVideo (video) {
  const videoId = video.videoId
  return {
    ...video,
    thumbnail: video.thumbnail || getYoutubeThumbnailUrlById(videoId),
    formattedDuration: video.duration ? formatDuration(video.duration) : ''
  }
}
