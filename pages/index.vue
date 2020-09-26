<template>
<div>
  <b-jumbotron class="text-center listing-container" style="background-color:white">
    <b-container>
      <h1>AVC Website</h1>
      <p>AWS Video Catalog is a website that collects all the official Amazon videos related to each individual AWS Service and categorizes them in a way that makes it easy to find what you are looking for. No more fighting YouTube search or relying on an algorithm to find what you are looking for. Everything is in one place. – This means that AWS Video Catalog will allow you to discover older videos that are still invaluable.</p>
    </b-container>
  </b-jumbotron>
  <div class="mx-5">
    <listing :items="categories"></listing>
    <hr></hr>
  </div>
</div>
</template>

<script>

import Listing from '~/components/Listing.vue'
import services from '~/static/database/categories/index.json'

export default {
  layout: "default",
  components: {
    Listing
  },

  asyncData (){
    return {
      categories: Object.values(services)
    }
  },

  head () {
    return this.$generateHead.generate({
      title: 'Home',
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
