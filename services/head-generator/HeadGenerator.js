class HeadGenerator {
  constructor ({ title, description, keywords, image, websiteURL }) {
    this.defaults = {
      title,
      description,
      keywords,
      image,
      websiteURL,
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      ogLocale: '',
      twitterTitle: '',
      twitterDescription: '',
      twitterImage: '',
      twitterImageAlt: ''
    }
  }

  getDataWithFallback (pageData = {}) {
    return {
      ...this.defaults,
      ...pageData,
      pageURL: `${this.defaults.websiteURL}${pageData?.route?.path || ''}`
    }
  }

  /**
   * Generate page meta data with fallback values
   * @param pageData
   * @param pageData.title {String}
   * @param pageData.description {String}
   * @param pageData.keywords {String}
   * @param pageData.image {String}
   * @param pageData.route {Object}
   * @param pageData.ogTitle {String}
   * @param pageData.ogDescription {String}
   * @param pageData.ogImage {String}
   * @param pageData.ogLocale {String}
   * @param pageData.twitterTitle {String}
   * @param pageData.twitterDescription {String}
   * @param pageData.twitterImage {String}
   * @param pageData.twitterImageAlt {String}
   * @returns {{meta: *, title: *}}
   */
  generate (pageData = {}) {
    const data = this.getDataWithFallback(pageData)

    const metaTags = [
      {
        hid: 'description',
        name: 'description',
        content: data.description
      },
      ...(data.keywords ? [
        {
          hid: 'keywords',
          name: 'keywords',
          content: data.keywords
        }] : []),
      {
        hid: 'apple-mobile-web-app-title',
        name: 'apple-mobile-web-app-title',
        content: data.title
      },
      {
        hid: 'og-title',
        property: 'og:title',
        content: data.ogTitle || data.title
      },
      {
        hid: 'og-description',
        property: 'og:description',
        content: data.ogDescription || data.description
      },
      {
        hid: 'og-type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og-url',
        property: 'og:url',
        content: data.pageURL
      },
      {
        hid: 'og-image',
        property: 'og:image',
        content: data.ogImage || data.image
      },
      {
        hid: 'og-locale',
        property: 'og:locale',
        content: data.ogLocale || 'en_US'
      },
      {
        hid: 'og-site-name',
        property: 'og:site_name',
        content: this.defaults.title
      },
      {
        hid: 'twitter-card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'twitter-title',
        name: 'twitter:title',
        content: data.twitterTitle || data.title
      },
      {
        hid: 'twitter-description',
        name: 'twitter:description',
        content: data.twitterDescription || data.description
      },
      {
        hid: 'twitter-image',
        name: 'twitter:image',
        content: data.twitterImage || data.image
      },
      {
        hid: 'twitter-image-alt',
        name: 'twitter:image:alt',
        content: data.twitterImageAlt || data.twitterTitle || data.title
      }
    ]

    return {
      title: data.title,
      meta: metaTags.filter(tag => tag?.content)
    }
  }
}

export default HeadGenerator
