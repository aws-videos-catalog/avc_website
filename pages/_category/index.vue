<template>
  <div class="listing-container mx-5">
    <bread-crumb/>
    <listing
    :items="service_data"
    />
    <hr></hr>
  </div>
</template>

<script>

import Listing from '~/components/Listing.vue'
import BreadCrumb from '~/components/BreadCrumb.vue'
import services from '~/static/services.json'
import get_actual_details from '~/custom_modules/get_actual_details'

export default {
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
    let imgPng;

    for(let key in services)
    {
        let category_link_name = key.split(' ').join('_').toLowerCase();

        if(category_link_name === route.params.category)
        {
          category_actual_name = key;
          service_data = services[key].data;
          description = services[key].info.description;
          img = services[key].info.img
          imgPng = services[key].info.imgPng
        }
    }

    if(!service_data){
      error({statusCode:404,message:'Page not Found'})
    }

    return {
      service_data: service_data,
      category_name: category_actual_name,
      description,
      img,
      imgPng,
    }
  },

  head () {
    return this.$generateHead.generate({
      title: this.category_name,
      description: this.description,
      image: `https://awsvideocatalog.com/aws/png/PNG Light${this.imgPng}`,
      route: this.$route
    })
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
