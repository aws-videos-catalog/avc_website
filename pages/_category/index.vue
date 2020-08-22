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
    let category_actual_name;
    let service_data;
    let description;
    let img;

    for(let key in services)
    {
        let category_link_name = key.split(' ').join('_').toLowerCase();

        if(category_link_name === route.params.category)
        {
          category_actual_name = key;
          service_data = services[key].data;
          description = services[key].info.description;
          img = services[key].info.img
        }
    }

    if(!service_data){
      error({statusCode:404,message:'Page not Found'})
    }
    
    return {
      service_data: service_data,
      category_name: category_actual_name,
      description,
      img
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
