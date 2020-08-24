<template>
  <div class="listing-container mx-5">
    <bread-crumb/>
    <listing 
    :items="service_data"></listing>
    <hr></hr>
  </div>
</template>

<script>

import Listing from '~/components/Listing.vue'
import BreadCrumb from '~/components/BreadCrumb.vue'
import services from '~/static/services.json'
import get_actual_details from '~/custom_modules/get_actual_details'

export default {
  head(){
    return {
      title: this.$data.category_name + ' - AWS Video Catalog',
      meta:[
          {
            'property': 'og:title',
            'content': this.category_name + ' - AWS Video Catalog'
          },
          {
            'property': 'og:description',
            'content': this.description
          },
          {
            'property':'og:image',
            'content': 'https://awsvideocatalog.com/aws/SVG Light'+this.img
          },
          {
            'property':'og:url',
            'content': 'https://awsvideocatalog.com/'+this.$route.params.category
          }
        ],
    }
  },
  layout: "default",
  components: {
    Listing,
    BreadCrumb
  },
  asyncData({route,error}){
    

    let actual_details = get_actual_details(route.params.category)
    
    if(!actual_details.category_details){
      error({statusCode:404,message:'Page not Found'})
    }

    let service_data = services[actual_details.category_details.name].data
    
    return {
      service_data: service_data,
      category_name: actual_details.category_details.name,
      description: actual_details.category_details.description,
      img: actual_details.category_details.img
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
