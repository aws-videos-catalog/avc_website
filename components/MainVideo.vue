<template>
<div style="height:100%">
  <h3>{{title}}</h3>
  <p> Posted at, {{posted_date}} </p>
  <iframe width="100%" height="400px" style="display:block;position:relative" :src="embedded_url" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
</template>

<script>
//
//  Component for main video object in service pages.
//
export default {
  props:{
    title:{
      type:String,
      required:false
    },
    url:{
      type:String,
      required:true
    },
    date:{
      type:String,
      required:false
    }
  },
  computed:{
    //
    //  Function to return embedded iframe src for a youtube video
    //
    embedded_url:function(){
      //
      //  Video ID is stored after "?v=" in a youtube video url, we take that part
      //  and add it in embedded url.
      //
      return 'https://www.youtube.com/embed/'+this.$props.url.split('?v=')[1]
    },
    posted_date:function(){
      //
      //  Simple function for parsing date prop to a Date Object instead of String.
      //
      return new Date(this.$props.date).toDateString()
    }
  }
}
</script>

<style>

</style>