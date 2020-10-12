export function isVideoMissingDetails (video) {
  return [
    'service',
    'videoId',
    'tags',
    'title',
    'description',
    'date',
    'duration'
  ].some((property) => !Object.hasOwnProperty.call(video, property))
}

/**
 * Converts Youtube duration format to seconds
 * Examples of Youtube format: PT45S, PT23M45S, PT1H23M45S
 * @param duration {String}
 * @returns {Number}
 */
export function youtubeDurationToSeconds (duration) {
  let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)

  match = match.slice(1).map(function (x) {
    if (x != null) {
      return x.replace(/\D/, '')
    }
  })

  const hours = (parseInt(match[0]) || 0)
  const minutes = (parseInt(match[1]) || 0)
  const seconds = (parseInt(match[2]) || 0)

  return hours * 3600 + minutes * 60 + seconds
}
