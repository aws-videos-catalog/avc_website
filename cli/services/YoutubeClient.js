import { google } from 'googleapis'
import config from '../config'

const client = google.youtube({
  version: 'v3',
  auth: config.youtube.apiKey
})

class YoutubeClient {
  async getVideoDetails (videoId) {
    const res = await client.videos.list({
      part: 'snippet,contentDetails,statistics',
      id: videoId
    })

    const video = res.data.items[0]

    if (!video) {
      return null
    }

    return {
      videoId: video.id,
      title: video.snippet.title,
      tags: video.snippet.tags,
      publishedAt: video.snippet.publishedAt,
      description: video.snippet.description,
      duration: video.contentDetails.duration
    }
  }
}

export default new YoutubeClient()
