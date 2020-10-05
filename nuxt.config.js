import os from 'os'
import { routesGenerate } from './custom_modules/sitemap-generate'

const cpusCount = os.cpus().length
const appPagesUrls = routesGenerate()

export default {
  mode: 'universal',

  generate: {
    workers: cpusCount,
    workerConcurrency: 500,
    concurrency: 500,

    routes () {
      return appPagesUrls
    }
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'Home',
    titleTemplate: '%s - AWS Video Catalog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      {
        'propery':'og:site_name',
        'content':'AVC Website'
      },
      {
        'propery':'og:locale',
        'content':'en_US'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/styles/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/bootstrap-vue',
    '@/plugins/head-generator',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    ['@nuxtjs/component-cache', { maxAge: 1000 * 60 * 5 }],
    'bootstrap-vue/nuxt',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxtjs/pwa'
  ],
  robots: {
    UserAgent: '*',
    Allow: '/',
    Sitemap: 'https://awsvideocatalog.com/sitemap.xml'
  },
  sitemap:{
    path: 'sitemap.xml',
    hostname: 'https://awsvideocatalog.com',
    trailingSlash: true,
    routes (){
      return appPagesUrls
    }
  },

  pwa: {
    icon: {
      source: './assets/images/logo.jpg',
    },

    manifest: {
      name: 'AWS Video Catalog',
      short_name: 'AVC Website',
      lang: 'en',
      background_color: '#fff',
      theme_color: '#fff'
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },

  telemetry: false
}
