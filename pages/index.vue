<template>
  <div class="container">
    <listing :items="services"></listing>
  </div>
</template>

<script>

import Listing from '~/components/Listing.vue'
import Ad from '~/components/Ad.vue'
// import services.json file from static folder
import services from '~/static/services.json'
import ads from '~/static/ads.json'

export default {
  components: {
    Listing,
    Ad
  },
  data(){
    return{
      services:services
    }
  },
  computed:{
    //
    //  1.  A function to randomize the ad order.
    //
    random_ad_order: function(){
      //
      //  1.  Create an array with the same length of ads
      //      starting from 0.
      //
      const arr = [...Array(ads.length).keys()];
      return arr.shuffle()
    }
  }
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
