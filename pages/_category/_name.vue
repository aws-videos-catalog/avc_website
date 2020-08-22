<template>
  <div class="listing-container mx-5">
    <bread-crumb/>
    <b-row>
      <b-col sm="12" md="7" class="placeholder" id="main-video" align-self="stretch">
        <main-video
          :title="main_video.title"
          :url="main_video.url"
          :date="main_video.date">
        </main-video>
        <p>{{description}}</p>
      </b-col>
      <b-col sm="12" md="2" class="placeholder pl-0" align-self="stretch">
        <div class="my-xs-4" style="display:flex;flex-direction:column">
          <Ad :random="true"></Ad>
          <div style="height:190px" class="mt-2 grey-box"></div>
        </div>
      </b-col>
      <b-col md="3">
        <div style="width:100%;height:100%" class="my-xs-4 grey-box"></div>
      </b-col>
    </b-row>
    <hr/>
    <b-row v-for="data in data_by_years" :key="data.year">
      <h3 style="padding-left:15px;width:100vw;">{{data.year}}</h3>
      <div style="padding-left:15px" v-for="(video,i) in data.videos" :key="'video_'+i">
        <small-video
          :title="video.title"
          :url="'?video_id='+video.url.split('?v=')[1]"
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
import services from '~/static/services.json'
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
  head(){
    return{
      title: this.service_name + ' - ' + this.category_name + ' - AWS Video Catalog',
      meta:[
          {
            'property': 'og:title',
            'content': this.title + ' - ' + this.category_name + ' - AWS Video Catalog'
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
            'content': 'https://awsvideocatalog.com/'+this.$route.params.category+'/'+this.$route.params.name
          }
        ],
    }
  },
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
    let description;
    let img;
    let service_name;

    let category_actual_name;

    for(let key in services)
    {
        let category_link_name = key.split(' ').join('_').toLowerCase();

        if(category_link_name === route.params.category)
        {
          category_actual_name = key;
          for(let service_key in services[key].data){
            let service_link_name = services[key].data[service_key].name.split(' ').join('_').toLowerCase();
            if(service_link_name === route.params.name)
            {
              service_name = services[key].data[service_key].name
              img = services[key].data[service_key].img
              description = services[key].data[service_key].description
            }
          }
        }
    }

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
    if(route.query.video_id){
      //
      //  1.  Get video id from query params
      //
      let video_id = route.query.video_id

      //
      //  2.  Split the query with '='
      //
      let separated = video_id.split('=')

      //
      //  3.  Last element of splitted array will be the order of video
      //
      let id = separated[separated.length-1]

      //
      //  4.  Create an array of all video_ids so it's easier to find the index
      //
      let all_video_ids = sorted_data.map((val,idx)=>{
        return val.url.split('?v=')[1]
      })

      //
      //  5.  Find the index of current video, given its id
      //
      let index = all_video_ids.indexOf(video_id)
      
      //
      //  6.  Return the main_video if index is found
      //
      if(index===-1)
      {
        //
        //  TODO: Return 404 here.
        //
        main_video = null
      }

      main_video = sorted_data[index]

    }
    else
    {
      //
      //  1.  If there isn't a video id given in query params, return the first
      //      video from sorted dataset.
      //
      main_video = sorted_data[0]
    }
    return{
      name: route.params.name,
      service_data: sorted_data,
      title: text,
      main_video: main_video,
      category_name:category_actual_name,
      img,
      description,
      service_name
    }
  },
  computed:{
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
  }

}
</script>

<style>

ul{
  padding:0px
}

.grey-box{
  background-color:#e9ecef;
  border-radius:0.25rem;
}
</style>