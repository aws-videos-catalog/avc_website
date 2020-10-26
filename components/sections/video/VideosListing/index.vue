<template>
  <div class="videos-listing__container">
    <h3 class="videos-listing__title">
      {{ videosData.year }}
    </h3>

    <div class="videos-listing__videos">
      <video-preview
        v-for="(videoPreview, index) in videosData.videos"
        :key="`${videoPreview.videoId}${index}`"
        :video="videoPreview"
      />
    </div>
  </div>
</template>

<script>
import VideoPreview from './VideoPreview'

export default {
  name: 'VideosListing',

  components: {
    VideoPreview
  },

  props: {
    videosData: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss">
.videos-listing {
  &__container {
    margin-bottom: 0.5rem;
  }

  &__title {}

  &__videos {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
  }

  @media (min-width: 480px) {
    &__videos {
      grid-template-columns: 1fr 1fr;
      justify-content: center;
    }
  }

  @media (min-width: 680px) {
    &__videos {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  @media (min-width: 908px) {
    &__videos {
      grid-template-columns: repeat(auto-fill, 260px);
      justify-content: start;
    }
  }
}

</style>
