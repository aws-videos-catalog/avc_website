<template>
  <div class="listing-container mx-5">
    <bread-crumb />
    <listing
      :items="category.services"
      :ads-order="adsOrder"
    />
  </div>
</template>

<script>

import Listing from '~/components/Listing.vue'
import BreadCrumb from '~/components/BreadCrumb.vue'
import categories from '~/static/database/categories/index.json'
import services from '~/static/database/categories/services/index.json'
import { arrayOfShuffledRandoms } from '~/utils/lists'
import ads from '~/static/products/index.json'

export default {
  layout: 'default',
  components: {
    Listing,
    BreadCrumb
  },
  asyncData ({ route, error }) {
    const categorySlug = route.params.category
    const category = categories[categorySlug]

    if (!category) {
      return error({
        statusCode: 404,
        message: 'Page not Found'
      })
    }

    const categoryServices = services[categorySlug]

    if (!categoryServices) {
      return error({
        statusCode: 404,
        message: 'Page not Found'
      })
    }

    return {
      category: {
        ...category,
        services: categoryServices
      }
    }
  },

  data () {
    return {
      adsOrder: arrayOfShuffledRandoms(ads.length)
    }
  },

  head () {
    return this.$generateHead.generate({
      title: this.category.name,
      description: this.category.description,
      image: `https://awsvideocatalog.com/images/aws/png/PNG Light${this.category.imgPng}`,
      route: this.$route
    })
  }
}
</script>

<style scoped>

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
