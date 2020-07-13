<template>
  <b-breadcrumb :items="items"></b-breadcrumb>
</template>

<script>
let capitalize_reducer = (current_val,prev_val)=>{
  // 
  //  Capitalize both current and previous value,
  //  return a string which adds them both.
  //
  let capitalized_prev_val = String(prev_val[0]).toUpperCase() + prev_val.slice(1)
  let capitalized_val = String(current_val[0]).toUpperCase() + current_val.slice(1)
  return capitalized_val + ' ' + capitalized_prev_val
}
export default {
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

</style>