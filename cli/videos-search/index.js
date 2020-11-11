import chalk from 'chalk'
import cliOptions from './cli-options'
import { flattenServicesList } from '../helpers/content'
import { stringContainsToken } from '../helpers/text'
import categoriesServices
  from '../../static/database/categories/services/index.json'
import async from 'async'
import { caseTitleToSnake } from '../../utils/text'
import { loadStaticJson, writeStaticJson } from '../helpers/filesystem'
import excludedVideos from './excluded-videos.json'
import config from '../config'
import YoutubeClient from '../services/YoutubeClient'

const excludedVideosIds = excludedVideos.map((video) => video.videoId)

function formatServiceVideo (video, serviceSlug) {
  return {
    service: serviceSlug,
    videoId: video.id.videoId,
    title: video.snippet.title,
    tags: video.snippet.tags,
    date: video.snippet.publishedAt,
    description: video.snippet.description
  }
}

async function searchAndUpdateServiceVideos (service, callback) {
  const serviceSlug = caseTitleToSnake(service.name)
  const serviceFilePath = `./static/database/categories/services/videos/${serviceSlug}.json`
  const serviceCurrentVideos = loadStaticJson(serviceFilePath)
  const serviceCurrentVideosIds = serviceCurrentVideos.map((video) => video.videoId)

  // Service name is used if no keywords are provided
  const searchQuery = [
    ...(service.keywords ? service.keywords : [service.name])
  ].join(' ')

  const matchedVideos = await findServiceVideos({
    channels: config.youtube.channels,
    searchQuery,
    serviceName: service.name
  })

  const newVideos = matchedVideos.
    filter((video) => !serviceCurrentVideosIds.includes(video.id.videoId)).
    filter((video) => !excludedVideosIds.includes(video.id.videoId)).
    map((video) => formatServiceVideo(video, serviceSlug))

  if (newVideos.length > 0) {
    console.log(
      chalk.green(`Service: ${service.name}. ${newVideos.length} new videos`)
    )
    writeStaticJson(serviceFilePath, [
      ...newVideos,
      ...serviceCurrentVideos
    ])
  } else {
    console.log(chalk.gray(`Service: ${service.name}. No new videos`))
  }

  callback()
}

/**
 * Get all matching videos for every specified channels
 * @param searchQuery
 * @param channels
 * @param serviceName
 * @returns {Promise<unknown>}
 */
async function findServiceVideos ({ searchQuery, channels, serviceName }) {
  return async.reduce(channels, [],
    async (result, channel, callback) => {
      const videos = await findNewVideosOnChannel({
        channel,
        searchQuery,
        serviceName
      })

      callback(null, [
        ...result,
        ...videos
      ])
    })
}

/**
 * Matching condition for video to be included in service videos
 * @param video {Object} - Youtube video entity
 * @param searchQuery {String}
 * @returns {boolean}
 */
function isVideoMatchService (video, searchQuery) {
  const matchFields = [video.snippet.title, video.snippet.description]

  return matchFields.some(
    (field) => stringContainsToken(field, searchQuery)
  )
}

/**
 * Search Youtube channel for search query and collect all videos that match
 * @param channel
 * @param searchQuery
 * @returns {Promise<[]>}
 */
async function findNewVideosOnChannel ({ channel, searchQuery }) {
  const allMatchedVideos = []
  const UNMATCHED_VIDEOS_COUNT_LIMIT = cliOptions['stop-limit']

  let unmatchedVideosInARow = 0
  let nextPageToken = null
  let isLastPage = false

  let iteration = 1

  while (!isLastPage && UNMATCHED_VIDEOS_COUNT_LIMIT > unmatchedVideosInARow) {
    const results = await YoutubeClient.searchVideos({
      channelId: channel,
      query: searchQuery,
      pageToken: nextPageToken
    })

    const videos = results.items

    const { matchHit, matchMissCount } = videos.reduce((result, video) => {
      if (isVideoMatchService(video, searchQuery)) {
        result.matchHit.push(video)
        result.matchMissCount = 0
      } else {
        result.matchMissCount++
      }

      return result
    }, { matchHit: [], matchMissCount: 0 })

    allMatchedVideos.push(...matchHit)

    iteration++

    // escape conditions
    unmatchedVideosInARow = unmatchedVideosInARow + matchMissCount
    if (!results.nextPageToken) {
      isLastPage = true
    }

    nextPageToken = results.nextPageToken
  }

  return allMatchedVideos
}

(async () => {
  console.log(chalk.yellow('CLI:VideosSearch is running'))

  const availableServices = flattenServicesList(categoriesServices)

  const specificService = cliOptions.service

  const servicesToSearch = !specificService
    ? availableServices
    : availableServices.
      filter((service) => typeof specificService === 'string' &&
        `${service.name}`.toLowerCase() === specificService.toLowerCase()
      )

  if (specificService && servicesToSearch.length === 0) {
    return console.log(chalk.red(`Service "${specificService}" is not found`))
  }

  if (servicesToSearch.length === 0) {
    console.log(chalk.red('No matching services'))
    return
  }

  if (specificService) {
    console.log(chalk.yellow(
      `Service: ${servicesToSearch[0]?.name}. Searching new videos..`)
    )
  } else {
    console.log(
      chalk.yellow(`Searching videos for all ${servicesToSearch.length}:`)
    )
  }

  try {
    await async.eachLimit(
      servicesToSearch,
      cliOptions.concurrency,
      searchAndUpdateServiceVideos
    )

    console.log(chalk.green('CLI:VideosSearch is completed'))
  } catch (err) {
    console.error(err)
    console.log(chalk.red('CLI:VideosSearch failed. See error above.'))
    process.exit(1)
  }
})()
