<template>
  <div class="s-video-player__container">
    <div class="s-video-player__inner">
      <div class="s-video-player__video">
        <main-video
          :video="video"
        />

        <p>
          {{ description }}
        </p>
      </div>

      <div class="s-video-player__ad-fixed">
        <ad :ad-order="adOrder" />

        <div class="s-video-player__ad-fixed__box"/>
      </div>

      <div class="s-video-player__ad-fluid" />
    </div>
  </div>
</template>

<script>
import MainVideo from './MainVideoPlayer'
import Ad from '~/components/Ad.vue'

export default {
  name: 'SectionVideoPlayer',

  components: {
    MainVideo,
    Ad
  },

  props: {
    video: {
      type: Object,
      default: () => ({}),
      required: true
    },

    description: {
      type: String,
      default: ''
    },

    adOrder: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss">
.s-video-player {
  &__container {
  }

  &__inner {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
  }

  &__ad-fixed {
    display: flex;
    flex-flow: column;
  }

  &__ad-fixed__box {
    display: none;
  }

  &__ad-fluid {
    min-height: 5rem;
    padding: 1rem;
    background-color: var(--color-bg-elevated-02);
    border-radius: 0.25rem;
  }

  @media (min-width: 576px) {
    &__inner {
      grid-template-columns: 270px 1fr;
    }

    &__video {
      grid-column: span 2;
    }
  }

  @media (min-width: 768px) {
    &__inner {
      grid-template-columns: 1fr 200px;
    }

    &__video {
      grid-column: span 1;
    }

    &__ad-fluid {
      grid-column: span 2;
    }

    &__ad-fixed__box {
      display: block;
      height: 100%;
      width: 100%;
      margin-top: 1rem;
      background-color: var(--color-bg-elevated-02);
      border-radius: 0.25rem;
    }
  }

  @media (min-width: 768px) {
    &__inner {
      grid-template-columns: 1fr 200px;
    }

    &__video {
      grid-column: span 1;
    }

    &__ad-fluid {
      grid-column: span 2;
    }
  }

  @media (min-width: 1024px) {
    &__inner {
      grid-template-columns: 1fr 270px;
    }

    &__video {
      grid-column: span 1;
    }

    &__ad-fluid {
      grid-column: span 2;
    }
  }

  @media (min-width: 1440px) {
    &__inner {
      grid-template-columns: 1024px 270px 1fr;
    }

    &__ad-fluid {
      grid-column: span 1;
    }
  }
}
</style>
