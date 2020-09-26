<template>
  <div class="listing-container mx-5">
    <bread-crumb/>

    <section-video-player
      :video="main_video"
      :description="description"
    />

    <hr/>
    <b-row v-for="data in data_by_years" :key="data.year">
      <h3 style="padding-left:15px;width:100vw;">{{data.year}}</h3>
      <div style="padding-left:15px" v-for="(video,i) in data.videos" :key="'video_'+i">
        <small-video
          :video="video"
        />
      </div>
    </b-row>
    <hr class="height:1px"></hr>
  </div>
</template>

<script>
import SmallVideo from '~/components/SmallVideo.vue'
import BreadCrumb from '~/components/BreadCrumb.vue'
import SectionVideoPlayer from '~/components/sections/video/SectionVideoPlayer'
import { formatVideo } from '~/utils/videos'
import categories from 'static/database/categories'
import services from 'static/database/categories/services'
import { caseTitleToSnake } from '@/utils/text'

export default {
  layout: "default",
  components:{
    SectionVideoPlayer,
    SmallVideo,
    BreadCrumb
  },
  asyncData({ route, error }){
    const categorySlug = route.params.category
    const category = categories[categorySlug]
    const categoryServices = services[route.params.category]

    if (!category || !categoryServices) {
      return error({
        statusCode: 404,
        message: 'Page not Found'
      })
    }

    const serviceSlug = route.params.name
    const service = categoryServices.find((service) => caseTitleToSnake(service.name) === serviceSlug)

    if (!service) {
      return error({
        statusCode: 404,
        message: 'Page not Found'
      })
    }

    const videos = require(`~/static/database/categories/services/videos/${route.params.name}`)

    if (!videos) {
      return error({
        statusCode: 404,
        message: 'Page not Found'
      })
    }

    const sortedVideos = videos.sort(function sortVideosByDate (a, b){
      return new Date(b.date) - new Date(a.date);
    }).map(formatVideo)

    const mainVideo = sortedVideos.find((video) => video.id === route.params.video)

    if (!mainVideo) {
      return error({
        statusCode: 404,
        message: 'Page not Found'
      })
    }

    return {
      name: route.params.name,
      service_data: sortedVideos,
      main_video: mainVideo,
      category_name: category.name,
      description: service.description,
      img: service.img,
      imgPng: service.imgPng,
      service_name: service.name
    }
  },

  computed:{
    data_by_years: function(){
      //
      //  1.  Create an empty array to hold our objects
      //
      let array = []
      //
      //  2.  Create a  separate copy of sorted service data.
      //
      let sorted_data = this.service_data.slice()

      //
      //  3.  Find year values inside videos data, store it inside dates array.
      //
      let dates = sorted_data.map((val,idx)=>{
        return new Date(val.date).getFullYear()
      })
      //
      //  4.  Make the year value array a HashSet so it's unique.
      //
      let years = [...new Set(dates)]
      //
      //  5.  For each year value
      //
      years.forEach((year,year_idx)=>{
        //
        //  1.  We create an empty array first
        //
        let temp_dct = {}
        //
        //  2.  Set the year key to corresponding year value
        //
        temp_dct['year'] = year
        //
        //  3.  Then create videos key as an empty array
        //
        temp_dct['videos'] = []
        //
        //  4. For each video data in sorted_data,
        //
        sorted_data.forEach((service,service_idx)=>{
          //
          //  1.  If current year value is equal to the current service's year value,
          //      push it to videos array of current dictionary.
          //
          if(year===new Date(service.date).getFullYear())
            temp_dct['videos'].push(service)
        })
        //
        //  6.  Push the created dictionary to array.
        //
        array.push(temp_dct)
      })
      return array
    }
  },

  head () {
    return this.$generateHead.generate({
      title: this.main_video.title + ' - ' + this.service_name + ' - ' + this.category_name,
      description: this.description,
      image: this.main_video.thumbnail,
      route: this.$route
    })
  },
}
</script>
