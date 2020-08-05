<template>
  <div class="listing-container mx-5">
    <h2>{{category_name}}</h2>
    <bread-crumb/>
    <listing 
    :items="service_data"></listing>
  </div>
</template>

<script>

import Listing from '~/components/Listing.vue'
import BreadCrumb from '~/components/BreadCrumb.vue'
import services from '~/static/services.json'

// HELPER FUNCTIONS

//
//  This function returns a percentage of similarity between two given strings using Levenshtein Distance
//  https://stackoverflow.com/questions/10473745/compare-strings-javascript-return-of-likely,
//  https://en.wikipedia.org/wiki/Levenshtein_distance
//

function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

export default {
  layout: "default",
  components: {
    Listing,
    BreadCrumb
  },
  data(){
    /*
    if(process.server){
      const fs = require('fs')
      let category_names = Object.keys(services)
      let category_actual_name;
      category_names.forEach((val,idx)=>{
        let category_link_name = val.split(' ').join('_').toLowerCase()
        if(category_link_name === this.$route.params.category){
          category_actual_name = category_names[idx]
        }
      })
      let files = fs.readdirSync('./static/aws/SVG Dark/'+category_actual_name+'/')
      let service_names = services[category_actual_name].map((service_data,idx)=>{
        return service_data.name
      })
      let image_file_names = {}
      files.forEach((file_name,idx)=>{
        let file_name_actual = file_name.substring(file_name.indexOf('-')+1,file_name.length).replace('.svg','')
        service_names.forEach((service_name,i)=>{
          let service_name_actual = service_name.replace('Amazon','').replace('AWS','').trim().split(' ').join('-')
          if(!file_name_actual.includes('dark') && similarity(file_name_actual,service_name_actual)>0.5){
            image_file_names[service_name] = file_name_actual
          }
        })
      })
    }
    */
    let category_names = Object.keys(services)
    let category_actual_name;
    category_names.forEach((val,idx)=>{
      let category_link_name = val.split(' ').join('_').toLowerCase()
      if(category_link_name === this.$route.params.category){
        category_actual_name = category_names[idx]
      }
    })
    let service_data = services[category_actual_name].map((service_data,idx)=>{
      return service_data
    })
    return{
      service_data: service_data,
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
