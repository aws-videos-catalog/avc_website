import fs from 'fs'
import { getYoutubeIdFromVideoLink } from '../utils/videos'
import services from '../static/database/categories/services/index.json'
import { caseTitleToSnake } from '../utils/text'

/**
 * Read & parse services list
 * @param path
 * @returns {{}|any}
 */
function loadStaticJson (path) {
  try {
    const jsonFile = fs.readFileSync(path)

    const parsed = JSON.parse(jsonFile)

    return parsed
  } catch (err) {
    console.error(err)
    return null
  }
}

/**
 * Get URL path of every video for provided service
 * @param videosData
 * @param servicePath
 * @returns {*}
 */
function generateServiceVideosPaths (videosData, servicePath) {
  return videosData.reduce((result, videoData) => {
    if (videoData.url) {
      const videoId = getYoutubeIdFromVideoLink(videoData.url)

      if (videoId) {
        result.push(`${servicePath}/${videoId}`)
      }
    }

    return result
  }, [])
}

/**
 * Get URL path for every service for provided category
 * @param servicesData
 * @param categoryName
 * @returns {*}
 */
function generateCategoryServicesPaths (servicesData, categoryName) {
  return servicesData.reduce(
    (result, service
    ) => {
      const serviceSlug = caseTitleToSnake(service.name)
      const servicePath = `/${categoryName}/${serviceSlug}`
      const serviceVideosData = loadStaticJson(`./static/database/categories/services/videos/${serviceSlug}.json`)

      const serviceVideosPaths = serviceVideosData ? generateServiceVideosPaths(serviceVideosData, servicePath) : []

      return [
        ...result,
        servicePath,
        ...serviceVideosPaths
      ]
    }, [])
}

/**
 * Generate all page urls for categories, services, videos
 * @returns {*[]}
 */
export function routesGenerate () {
  const categories = loadStaticJson('./static/database/categories/index.json')

  return Object.keys(categories).reduce((result, categorySlug) => {
    const categoryPath = `/${categorySlug}`

    const categoryServices = services[categorySlug]
    const categoryServicesPaths = generateCategoryServicesPaths(categoryServices, categorySlug)

    return [
      ...result,
      categoryPath,
      ...categoryServicesPaths
    ]

  }, [])
}
