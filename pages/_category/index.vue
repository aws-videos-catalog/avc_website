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
    //
    //  1.  Firstly, we must return the actual name of category.
    //      Thus, split the category name by '_'.
    //
    let category = this.$route.params.category
    let temporary = category.split('_')
    let category_actual_name;

    //
    //  2.  If value can be splitted via '_' that means it has spaces
    //      so we revert that value back to it's original string.
    //      e.g. tolga_oguz --> Tolga Oğuz
    //  
    if(temporary.length>1)
    {
      //
      //  1.  Create a string by capitalizing each word in the temporary array
      //      which would give us the original string
      //
      category_actual_name = temporary.reduce(capitalize_reducer)
    }else{
      //
      //  1.  If service name is only one word, then we just want to capitalize it
      //
      category_actual_name = category.charAt(0).toUpperCase() + category.substring(1)
    }
    let service_names = services[category_actual_name].map((service_data,index)=>{
      return service_data.name
    })
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
