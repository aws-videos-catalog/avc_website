<template>
  <div class="nav">
    <h2>{{title}}</h2>
    <b-breadcrumb style="flex-grow:1;margin-left:1rem" :items="items"></b-breadcrumb>
  </div>
</template>

<script>
import services from '~/static/services.json'

//
//  HELPER FUNCTIONS
//  

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

//
//  END HELPER FUNCTIONS
//

export default {
  props:{
    title:{
      required:false,
      type:String
    }
  },
  computed:{
    items: function(){
      //
      //  1.  Create an array of nested routes by splitting current path by '/'
      //
      let current_path = this.$route.path.split('/')
      return current_path.map((val,idx)=>{
        //
        //  1.  Capitalize the first word of the text that will be shown in breadcrumb.
        //
        let text = String(val[0]).toUpperCase() + val.slice(1)

        //
        //  2.  If value can be splitted via '_' that means it has spaces
        //      so we revert that value back to it's original string.
        //      e.g. tolga_oguz --> Tolga Oğuz
        //  
        if(val.split('_').length>1)
        {
          //
          //  1.  Create a temporary value to hold an array of words
          //  
          let temporary = val.split('_')
          
          //
          //  2.  Create a string by capitalizing each word in the temporary array
          //      which would give us the original string
          //
          text = temporary.reduce(capitalize_reducer)

        }
        if(val==='')
        {
          text = 'Home'
          return {
            href:'/',
            text:text,
            active: val===current_path[current_path.length-1]
          }
        }
        if(this.$data.category)
        {
          return {
            href:current_path.slice(0,idx+1).join('/'),
            text:this.$data.category + ' - ' + text,
            active: val===current_path[current_path.length-1]
          }
        }
        
        return {
          href:current_path.slice(0,idx+1).join('/'),
          text:text,
          active: val===current_path[current_path.length-1]
        }
      })
      
    }
  }
}
</script>

<style>

.nav{
  display:flex;
  flex-direction: row;
}

</style>