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
// import services.json file from static folder
import services from '~/static/services.json'

export default {
  head(){
    return{
      title: 'AWS Video Catalog',
      meta:[
          {
            'property': 'og:title',
            'content': 'Home'
          },
          {
            'property': 'og:description',
            'content': 'AWS Video Catalog is a website that collects all the official Amazon videos related each individual AWS Service, and categorizes them in a way that makes it easy to find what you are looking for. No more fighting YouTube search or relying on an algorithm to find what you are looking for. Everything is in one place.'
          },
          {
            'property':'og:image',
            'content': 'https://awsvideocatalog.com/aws/png/PNG Dark/Compute/Compute.png'
          },
          {
            'property':'og:url',
            'content': 'https://awsvideocatalog.com/'
          }
        ]
    }
  },
  layout: "default",
  components: {
    Listing
  },
  asyncData(){
    let category_data = Object.entries(services).map(([category, category_data])=>{
      return {
        name: category_data.info.name,
        description: category_data.info.description,
        img: category_data.info.img,
        imgPng: category_data.info.imgPng
      }
    })
    return{
      categories:category_data
    }
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
