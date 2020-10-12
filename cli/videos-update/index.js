import async from 'async'
import chalk from 'chalk'
import categoryServices
  from '../../static/database/categories/services/index.json'
import {
  loadStaticJson,
  writeStaticJson
} from '../helpers/filesystem'
import { isVideoMissingDetails, youtubeDurationToSeconds } from '../helpers/videos'
import { flattenServicesList } from '../helpers/content'
import { caseTitleToSnake } from '../../utils/text'
import YoutubeClient from '../services/YoutubeClient'

async function updateAllVideosDetails (categoryServices) {
  if (!categoryServices) {
    console.log(chalk.red('Services categories list is not found in "static/database/categories/services/index.json"'))
    return
  }

  // collect all services in a single dimension array
  const services = flattenServicesList(categoryServices)

  return async.each(services, updateServicesVideosDetails)
}

/**
 * Fetch and format details for each provided video
 * @param unfilledVideos - list of videos to fetch details for
 * @param serviceSlug
 * @returns {Promise<unknown>}
 */
async function fetchVideosDetails (unfilledVideos, serviceSlug) {
  return async.map(unfilledVideos, async (video, callback) => {
    try {
      const videoDetails = await YoutubeClient.getVideoDetails(video.videoId)

      if (!videoDetails) {
        console.log(chalk.red(`Unable to locate video details ${video.videoId}. Skipping`))

        return callback()
      }

      callback(null, {
        service: serviceSlug,
        videoId: videoDetails.videoId,
        tags: videoDetails.tags,
        title: videoDetails.title,
        description: videoDetails.description,
        date: videoDetails.publishedAt,
        duration: youtubeDurationToSeconds(videoDetails.duration)
      })
    } catch (err) {
      callback(err)
    }
  })
}

async function updateServicesVideosDetails (service, callback) {
  const serviceSlug = caseTitleToSnake(service.name)
  const serviceFilePath = `./static/database/categories/services/videos/${serviceSlug}.json`
  const serviceVideos = loadStaticJson(serviceFilePath)

  const unfilledVideos = serviceVideos.filter(
    (video) => isVideoMissingDetails(video)
  )

  // Early return service has no incomplete videos
  if (unfilledVideos.length === 0) {
    return callback()
  }

  console.log(chalk.yellow(
    `Service: "${service.name}" has ${unfilledVideos.length} incomplete videos`)
  )

  try {
    const videosDetails = await fetchVideosDetails(unfilledVideos, serviceSlug)

    const filteredDetails = videosDetails.filter((videoDetails) => videoDetails && videoDetails.videoId)

    // Create a dictionary out of updated videos details to reduce search complexity
    const updatedVideosDictionary = filteredDetails.reduce((result, video) => {
      result[video.videoId] = video

      return result
    }, {})

    // Update service videos list with new video details
    const updatedServiceVideos = serviceVideos.map((video) => {
      if (updatedVideosDictionary[video.videoId]) {
        return updatedVideosDictionary[video.videoId]
      }

      return video
    })

    // Save updated service
    writeStaticJson(serviceFilePath, updatedServiceVideos)

    console.log(chalk.green(
      `Service: "${service.name}" has ${filteredDetails.length} videos updated`)
    )

    callback(null, updatedServiceVideos)
  } catch (err) {
    callback(err)
  }
}

(async () => {
  console.log(chalk.bgYellow('CLI:VideosUpdate is running'))

  try {
    await updateAllVideosDetails(categoryServices)

    console.log(chalk.bgGreen('CLI:VideosUpdate is completed'))
  } catch (err) {
    console.error(err)
    console.log(chalk.bgRed('CLI:VideosUpdate failed. See error above.'))
    process.exit(1)
  }
})()
