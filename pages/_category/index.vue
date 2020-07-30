<template>
  <b-container class="video-container">
    <h2>{{category_name}}</h2>
    <bread-crumb/>
    <listing :items="service_names"></listing>
  </b-container>
</template>

<script>

import Listing from '~/components/Listing.vue'
import BreadCrumb from '~/components/BreadCrumb.vue'
// import services.json file from static folder
import services from '~/static/services.json'

// HELPER FUNCTIONS

let capitalize_reducer = (current_val,prev_val)=>{
  // 
  //  Capitalize both current and previous value,
  //  return a string which adds them both.
  //
  let capitalized_prev_val = String(prev_val[0]).toUpperCase() + prev_val.slice(1)
  let capitalized_val = String(current_val[0]).toUpperCase() + current_val.slice(1)
  return capitalized_val + ' ' + capitalized_prev_val
}

export default {
  layout: "default",
  components: {
    Listing,
    BreadCrumb
  },
  data(){
    let category_names = Object.keys(services)
    let category_actual_name;
    category_names.forEach((val,idx)=>{
      let category_link_name = val.split(' ').join('_').toLowerCase()
      if(category_link_name === this.$route.params.category){
        category_actual_name = category_names[idx]
      }
    })
    let service_names = services[category_actual_name].map((service_data,idx)=>{
      return service_data.name
    })
    console.log(category_actual_name)
    console.log(service_names)
    return{
      service_names: service_names,
      category_name: category_actual_name
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
