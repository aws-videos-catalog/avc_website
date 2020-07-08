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
  components: {
    Listing
  },
  data(){
    return{
      services:services
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
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
