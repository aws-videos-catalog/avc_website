<template>
  <div class="listing-container mx-5">
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
