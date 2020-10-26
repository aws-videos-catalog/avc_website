<template>
  <div class="video-preview__container">
    <nuxt-link
      :to="videoRoute"
      class="video-preview__inner"
    >
      <div class="video-preview__thumbnail">
        <img
          :src="video.thumbnail"
          :alt="video.title"
          :title="video.title"
          class="video-preview__thumbnail__image"
        >
      </div>

      <div class="video-preview__body">
        <p>{{ video.title }}</p>
      </div>
    </nuxt-link>
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
          video: this.video.videoId
        }
      }
    }
  }
}
</script>

<style lang="scss">
.video-preview {
  &__container {
    position: relative;
    height: 100%;
    display: block;
  }

  &__inner {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 100%;
    border: 1px solid var(--color-border);
    border-radius: 0.25rem;
    transition: box-shadow 0.3s ease-in-out;
    overflow: hidden;
    background-color: var(--color-bg-elevated-01);
    text-decoration: none !important;
  }

  &__thumbnail {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  &__thumbnail__image {
    width: 100%;
  }

  &__body {
    padding: 0.45rem 1.25rem;
    color: var(--color-font);
  }

  @media (min-width: 908px) {
    &__inner {
      &:hover {
        box-shadow: 1px 8px 25px -7px var(--color-box-shadow);
      }
    }
  }
}
</style>
