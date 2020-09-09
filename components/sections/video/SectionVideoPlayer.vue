<template>
  <b-row no-gutters>
    <b-col
      sm="12"
      lg="auto"
      class="placeholder"
      id="main-video"
      align-self="stretch"
    >
      <main-video
        :video="video"
        class="video-player__video"
      />

      <p>{{ description }}</p>
    </b-col>
    <b-col
      sm="12"
      lg="auto"
      class="placeholder px-3"
      align-self="stretch"
    >
      <div class="my-xs-4 my-xs-4 d-flex flex-column video-player__column-ad">
        <Ad :random="true"></Ad>
        <div
          class="mt-2 grey-box video-player__column-ad__bottom"
        />
      </div>
    </b-col>

    <b-col>
      <div style="width:100%;height:100%" class="my-xs-4 grey-box"></div>
    </b-col>
  </b-row>
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
    }
  }
}
</script>

<style>
.grey-box {
  background-color: #e9ecef;
  border-radius: 0.25rem;
}

.video-player__column-ad__bottom {
  height: 190px;
}

@media all and (min-width: 992px) {
  .video-player__column-ad {
    max-width: 270px;
    height: 100%;
  }

  .video-player__column-ad__bottom {
    height: 100%;
  }
}

@media all and (min-width: 1440px) {
  .video-player__column-ad {
    flex-flow: column;
  }

  .video-player__video {
    width: 1024px;
  }
}
</style>
