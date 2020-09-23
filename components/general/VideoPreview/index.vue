<template>
  <div class="video-preview__container">
    <router-link
      :to="videoRoute"
      class="video-preview__preview"
    >
      <img
        :src="video.thumbnail"
        :alt="video.title"
        :title="video.title"
        class="video-preview__image"
      >
    </router-link>

    <p>{{ titleTruncated }}</p>
  </div>
</template>

<script>
export default {
  name: 'VideoPreview',

  props: {
    video: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },

  computed: {
    videoRoute () {
      return {
        name: 'category-name-video',
        params: {
          ...this.$route.params,
          video: this.video.id
        }
      }
    },

    titleTruncated () {
      if (this.video.title.length <= 65) {
        return this.video.title
      }
      return this.video.title.slice(0, 65) + '...'
    }
  }
}
</script>

<style lang="scss">
.video-preview {
  &__container {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  &__preview {
    display: block;
    margin-bottom: 0.5rem;
  }

  &__image {
    width: 100%;
  }
}
</style>
