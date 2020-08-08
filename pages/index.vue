<template>
<div>
  <b-jumbotron class="text-center listing-container" style="background-color:white">
    <b-container>
      <h1>AVC Website</h1>
      <p>Labore aute est minim tempor ea ipsum et enim nisi in pariatur. Do culpa consectetur eu ut esse esse minim exercitation cillum Lorem laborum reprehenderit occaecat. Dolore est aliquip irure officia nulla dolor et ea laborum veniam.</p>
    </b-container>
  </b-jumbotron>
  <div class="mx-5">
    <listing :items="categories"></listing>
  </div>
</div>
</template>

<script>

import Listing from '~/components/Listing.vue'
// import services.json file from static folder
import services from '~/static/services.json'

export default {
  layout: "default",
  components: {
    Listing
  },
  data(){
    let category_data = Object.entries(services).map(([category, category_data])=>{
      console.log(category_data.info.name)
      return {
        name: category_data.info.name,
        description: category_data.info.description,
        img: category_data.info.img
      }
    })
    return{
      categories:category_data
    }
  },
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
