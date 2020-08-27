<template>
  <div class="my-2 small-video">
    <a :href="url">
      <img :alt="title" :src="thumbnail">
    </a>
    <p>{{truncateTitle}}</p>
  </div>
</template>

<script>
export default {
  props:{
    title: {
      type:String
    },
    url: {
      type:String
    }
  },
  computed:{
    //
    //  1.  Truncate the title if length is higher than 65 characters.
    //
    truncateTitle: function(){
      if (this.$props.title.length <= 65) {
        return this.$props.title
      }
      return this.$props.title.slice(0, 65) + '...'
    },
    thumbnail: function(){

      //
      //  1. Example URL string passed in the props is like this:
      //     '?video_id=-rv78DsrpNY' and the id here is the youtube
      //      video id itself.
      //
      let video_id = this.$props.url

      //
      //  2.  Construct the thumbnail url
      //
      let thumb_url = 'https://i.ytimg.com/vi/' + video_id + '/hqdefault.jpg'

      //
      //  3.  Return it
      //
      return thumb_url
    }
  }

}
</script>

<style scoped>

.small-video{
  min-width:100%;
  max-width: 200px;
}

.small-video img{
  width:200px;
  height:120px;
  border-radius: 0.25rem;
}

@media (max-width : 462px) {
.small-video img{
  display:inline-block;
}

.small-video p{
  display:inline;
}

}
</style>
