function getYoutubeThumbnailUrlById (videoId) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}

export function formatVideo (video) {
  const videoId = video.videoId
  return {
    ...video,
    thumbnail: video.thumbnail || getYoutubeThumbnailUrlById(videoId)
  }
}
