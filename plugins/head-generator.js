import HeadGenerator from '~/services/head-generator/HeadGenerator'

export default function headGeneratorPlugin (context, inject) {
  // Default/fallback values for meta tags
  const defaultAppMeta = {
    title: 'AWS Video Catalog',
    description: 'AWS Video Catalog is a website that collects all the official Amazon videos related each individual AWS Service, and categorizes them in a way that makes it easy to find what you are looking for. No more fighting YouTube search or relying on an algorithm to find what you are looking for. Everything is in one place.',
    keywords: '',
    image: 'https://awsvideocatalog.com/images/aws/png/PNG Dark/Compute/Compute.png',
    websiteURL: 'https://awsvideocatalog.com',
  }

  const generator = new HeadGenerator(defaultAppMeta)
  inject('generateHead', generator)
}
