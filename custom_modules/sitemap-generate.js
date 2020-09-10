import fs from 'fs'
import { getYoutubeIdFromVideoLink } from '../utils/videos'
import getService from '../static/service_server'

function nameToSnakeCase (name) {
  return name.split(' ').join('_').toLowerCase()
}

/**
 * Read & parse services list
 * @param path
 * @returns {{}|any}
 */
function loadServicesSettings (path) {
  try {
    const servicesJson = fs.readFileSync(path)

    const services = JSON.parse(servicesJson)

    return services
  } catch (err) {
    console.error(err)
    return {}
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
    const videoId = getYoutubeIdFromVideoLink(videoData.url)

    result.push(`${servicePath}/${videoId}`)

    return result
  }, [])
}

/**
 * Get URL path for every service for provided category
 * @param servicesData
 * @param categoryPath
 * @returns {*}
 */
function generateCategoryServicesPaths (servicesData, categoryPath) {
  return servicesData.reduce(
    (result, service
    ) => {
      const serviceName = nameToSnakeCase(service.name)
      const servicePath = `${categoryPath}/${serviceName}`

      const serviceVideosData = getService(serviceName)
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
  const services = loadServicesSettings('./static/services.json')

  return Object.keys(services).reduce((result, categoryName) => {
    const categoryPath = `/${nameToSnakeCase(categoryName)}`

    const categoryServicesData = services[categoryName].data || []

    const categoryServicesPaths = generateCategoryServicesPaths(categoryServicesData, categoryPath)

    return [
      ...result,
      categoryPath,
      ...categoryServicesPaths
    ]

  }, [])
}
