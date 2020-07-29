<template>
  <div class="container">
    <listing :items="services"></listing>
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
    let category = this.$route.params.category
    let service_names = services[category].map((service_data,index)=>{
      return service_data.name
    })
    return{
      services: service_names
    }
  },
}
</script>

<style scoped>
.container {
  margin:2rem;
}

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
