<template>
  <div class="my-2 small-video">
    <a :href="videoLink">
      <img
        :src="video.thumbnail"
        :alt="video.title"
        :title="video.title"
      >
    </a>
    <p>{{truncateTitle}}</p>
  </div>
</template>

<script>
export default {
  props:{
    video: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  computed:{
    videoLink () {
      return this.$router.resolve({
        name: 'category-name-video',
        params: {
          ...this.$route.params,
          video: this.video.videoId
        }
      }).href
    },
    //
    //  1.  Truncate the title if length is higher than 65 characters.
    //
    truncateTitle: function(){
      if (this.video.title.length <= 65) {
        return this.video.title
      }
      return this.video.title.slice(0, 65) + '...'
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
