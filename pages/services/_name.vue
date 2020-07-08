<template>
  <div>
  <b-container class="video-container">
    <b-row>
      <b-col md="8" class="placeholder" id="main-video" align-self="stretch">
        <main-video
          :title="service_data[0].title"
          :url="service_data[0].url"
          :date="service_data[0].date"></main-video>
      </b-col>
      <b-col class="placeholder" align-self="stretch">
        <Ad style="margin-top:40px" :random="true"></Ad>
      </b-col>
    </b-row>
    <hr/>
    <ul v-for="data in data_by_years" :key="data.year">
      <h3>{{data.year}}</h3>
      <b-row>
        <b-col v-for="(video,i) in data.videos" :key="'video_'+i" md="2">
          <small-video></small-video>
        </b-col>
      </b-row>
    </ul>
  </b-container>
  </div>
</template>

<script>
//
//  Importing necessary components
//
import getService from '~/static/service_server.js'
import MainVideo from '~/components/MainVideo.vue'
import SmallVideo from '~/components/SmallVideo.vue'
import Ad from '~/components/Ad.vue'

export default {
  layout: "default",
  components:{
    MainVideo,
    SmallVideo,
    Ad,
  },
  data(){
    //
    //  1.  Instead of using asyncData, sorting data before passing it to data()
    //      so it's easy to pick the main video which would be the first in the sorted list.
    //
    let service_data = getService(this.$route.params.name)
    let sorted_data = service_data.sort(function(a,b){
        //
        //  1.  Turn your strings into dates, and then subtract them
        //      to get a value that is either negative, positive, or zero.
        //
        return new Date(b.date) - new Date(a.date);
      });
    
    return{
      name: this.$route.params.name,
      service_data: sorted_data
    }
  },
  computed:{
    //
    //  This function will return a dictionary of video data objects,
    //  packaged by years.
    //
    data_by_years: function(){
      //
      //  1.  Create an empty array to hold our objects
      //
      let array = []
      //
      //  2.  Create a separate copy of sorted service data.
      //
      let sorted_data = this.service_data.slice()
      //
      //  3.  We want the first video of the sorted dataset to be the main video
      //      so we remove it from this array.
      //
      delete sorted_data[0];
      //
      //  4.  Find year values inside videos data, store it inside dates array.
      //
      let dates = sorted_data.map((val,idx)=>{
        return new Date(val.date).getFullYear()
      })
      //
      //  5.  Make the year value array a HashSet so it's unique.
      //
      let years = [...new Set(dates)]
      //
      //  6.  For each year value
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
        //  5.  Push the created dictionary to array. 
        //
        array.push(temp_dct)
      })
      return array
    }
  }

}
</script>

<style scoped>
.video-container{
margin-top: 50px;
}

ul{
  padding:0px
}
</style>