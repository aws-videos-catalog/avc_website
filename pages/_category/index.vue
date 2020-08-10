<template>
  <div class="listing-container mx-5">
    <bread-crumb :title="category_name+' - AWS Video Catalog'"/>
    <listing 
    :items="service_data"></listing>
  </div>
</template>

<script>

import Listing from '~/components/Listing.vue'
import BreadCrumb from '~/components/BreadCrumb.vue'
import services from '~/static/services.json'

export default {
  layout: "default",
  components: {
    Listing,
    BreadCrumb
  },
  data() {
    
    let category_actual_name;
    let service_data;

    for(let key in services)
    {
        let category_link_name = key.split(' ').join('_').toLowerCase();

        if(category_link_name === this.$route.params.category)
        {
          category_actual_name = key;
          service_data = services[key].data;
        }
    }
    
    return {
      service_data: service_data,
      category_name: category_actual_name
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
