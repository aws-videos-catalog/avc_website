<template>
  <div class="listing-container mx-5">
    <bread-crumb/>
    <b-row no-gutters>
      <b-col
          sm="12"
          lg="auto"
          class="placeholder"
          id="main-video"
          align-self="stretch"
      >
        <main-video
          :title="main_video.title"
          :url="main_video.url"
          :date="main_video.date"
          class="v-category-video__video"
        />

        <p>{{ description }}</p>
      </b-col>
      <b-col
          sm="12"
          lg="auto"
          class="placeholder px-3"
          align-self="stretch"
      >
        <div class="my-xs-4 my-xs-4 d-flex flex-column v-category-video__column-ad">
          <Ad :random="true"></Ad>
          <div
              class="mt-2 grey-box v-category-video__column-ad__bottom"
          />
        </div>
      </b-col>

      <b-col>
        <div style="width:100%;height:100%" class="my-xs-4 grey-box"></div>
      </b-col>
    </b-row>
    <hr/>
    <b-row v-for="data in data_by_years" :key="data.year">
      <h3 style="padding-left:15px;width:100vw;">{{data.year}}</h3>
      <div style="padding-left:15px" v-for="(video,i) in data.videos" :key="'video_'+i">
        <small-video
          :title="video.title"
          :url="video.url.split('?v=')[1]"
          :thumbnail="video.thumbnail"/>
      </div>
    </b-row>
    <hr class="height:1px"></hr>
  </div>
</template>

<script>
//
//  Importing necessary components
//
import getService from '~/static/service_server.js'
import get_actual_details from '~/custom_modules/get_actual_details'
import MainVideo from '~/components/MainVideo.vue'
import SmallVideo from '~/components/SmallVideo.vue'
import Ad from '~/components/Ad.vue'
import BreadCrumb from '~/components/BreadCrumb.vue'

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

//
//  A function to remove given element from array
//
function remove(array, element) {
  return array.filter(el => el !== element);
}

export default {
  layout: "default",
  components:{
    MainVideo,
    SmallVideo,
    Ad,
    BreadCrumb
  },
  asyncData({route,error}){

    //
    //  1.  Create an array of nested routes by splitting current path by '/'
    //

    let current_service = route.params.name
    let text = '';
    let temporary = current_service.split('_')
    let main_video;
    let actual_details = get_actual_details(route.params.category,route.params.name)

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
      text = temporary.reduce(capitalize_reducer)
    }else{
      //
      //  1.  If service name is only one word, then we just want to capitalize it
      //
      text = current_service.charAt(0).toUpperCase() + current_service.substring(1)
    }
    //
    //  3.  Instead of using asyncData, sorting data before passing it to data()
    //      so it's easy to pick the main video which would be the first in the sorted list.
    //
    let service_data = getService(route.params.name)

    if(!service_data){
      return error({statusCode:404,message:'Page not Found'})
    }

    let sorted_data = service_data.sort(function(a,b){

      //
      //  1.  Turn your strings into dates, and then subtract them
      //      to get a value that is either negative, positive, or zero.
      //
      return new Date(b.date) - new Date(a.date);

    });

    //
    //  4.  Get the main video id from URL if it's given,
    //      else return the first video from sorted dataset
    //
    if(route.params.video){
      //
      //  1.  Get video id from query params
      //
      let video_id = route.params.video

      //
      //  2.  Create an array of all video_ids so it's easier to find the index
      //
      let all_video_ids = sorted_data.map((val,idx)=>{
        return val.url.split('?v=')[1]
      })

      //
      //  3.  Find the index of current video, given its id
      //
      let index = all_video_ids.indexOf(video_id)

      //
      //  4.  Return the main_video if index is found
      //
      if(index===-1)
      {
        error({statusCode:404,message:'Page not Found'})
      }

      main_video = sorted_data[index]

    }
    return{
      name: route.params.name,
      service_data: sorted_data,
      title: text,
      main_video: main_video,
      category_name: actual_details.category_details.name,
      description: actual_details.service_details.description,
      img: actual_details.service_details.img,
      imgPng: actual_details.service_details.imgPng,
      service_name: actual_details.service_details.name
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
    const videoThumbnailUrl = this.main_video.thumbnail
      || `https://i.ytimg.com/vi/${this.main_video.url.split('?v=')[1]}/hqdefault.jpg`
    return this.$generateHead.generate({
      title: this.main_video.title + ' - ' + this.service_name + ' - ' + this.category_name,
      description: this.description,
      image: videoThumbnailUrl,
      route: this.$route
    })
  },
}
</script>

<style>

ul{
  padding:0px
}

.grey-box {
  background-color: #e9ecef;
  border-radius: 0.25rem;
}

.v-category-video__column-ad__bottom {
  height: 190px;
}

@media all and (min-width: 992px) {
  .v-category-video__column-ad {
    max-width: 270px;
    height: 100%;
  }

  .v-category-video__column-ad__bottom {
    height: 100%;
  }
}

@media all and (min-width: 1440px) {
  .v-category-video__video {
    width: 1024px;
  }
}
</style>